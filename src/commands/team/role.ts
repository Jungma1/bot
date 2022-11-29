import { CommandInteractionOptionResolver, GuildMember, Role } from 'discord.js';
import config from '../../config';
import { CommandRun } from '../../interface/CommandRun';
import { sendEmbed } from '../../lib/utils/sendEmbed';

export const role: CommandRun = {
  run: async interaction => {
    const { ROLE_MEMBER_ID, ROLE_CANDIDATE_ID, ROLE_USER_ID } = config;
    const sender = interaction.member as GuildMember;
    const options = interaction.options as CommandInteractionOptionResolver;
    const selected = options.getSubcommand();
    const user = options.getMember('user') as GuildMember;
    const role = options.getRole('role', true) as Role;

    if (!sender.roles.cache.some(role => role.id === config.ROLE_MASTER_ID)) {
      return sendEmbed.error('동아리 회장만 사용이 가능해요!', interaction, { ephemeral: true });
    }

    if (sender === user) {
      return sendEmbed.error('본인에게는 사용할 수 없어요!', interaction, { ephemeral: true });
    }

    const senderMaxPosition = Math.max(...sender.roles.cache.map(role => role.position));
    const userMaxPosition = Math.max(...user.roles.cache.map(role => role.position));

    if (senderMaxPosition < userMaxPosition) {
      return sendEmbed.error(
        '자신보다 높은 권한이 있는 유저한테는 사용할 수 없어요!',
        interaction,
        { ephemeral: true }
      );
    }

    if (role.id !== ROLE_MEMBER_ID && role.id !== ROLE_CANDIDATE_ID) {
      return sendEmbed.error(`${role} - 지정할 수 없는 역할이에요!`, interaction, {
        ephemeral: true,
      });
    }

    if (!user.roles.cache.some(role => role.id === ROLE_USER_ID)) {
      return sendEmbed.error('인증이 필요한 유저에요!', interaction, { ephemeral: true });
    }

    const memberRole = await interaction.guild?.roles.cache.find(
      role => role.id === ROLE_MEMBER_ID
    );
    const candidateRole = await interaction.guild?.roles.cache.find(
      role => role.id === ROLE_CANDIDATE_ID
    );

    if (!memberRole || !candidateRole) {
      return sendEmbed.error('예기치 못한 오류가 발생했어요!', interaction, { ephemeral: true });
    }

    switch (selected) {
      case '역할부여':
        await user.roles.remove(candidateRole);
        await user.roles.remove(memberRole);
        await user.roles.add(role);
        return sendEmbed.success(`${user}님에게 ${role} 역할을 부여했어요!`, interaction);
      case '역할제외':
        await user.roles.remove(role);
        return sendEmbed.success(`${user}님을 ${role} 역할에서 제외했어요!`, interaction);
    }
  },
};
