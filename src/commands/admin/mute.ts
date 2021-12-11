import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, GuildMember } from 'discord.js';
import config from '../../config';
import { embedMessage } from '../../utils/messages/embedMessage';

export const data = new SlashCommandBuilder()
  .setName('mute')
  .setDescription('뮤트 명령어')
  .addSubcommand(option =>
    option
      .setName('add')
      .setDescription('뮤트 시작')
      .addUserOption(option =>
        option
          .setName('target')
          .setDescription('select target')
          .setRequired(true)
      )
  )
  .addSubcommand(option =>
    option
      .setName('remove')
      .setDescription('뮤트 해제')
      .addUserOption(option =>
        option
          .setName('target')
          .setDescription('select target')
          .setRequired(true)
      )
  );

export async function execute(interaction: CommandInteraction) {
  const { ROLE_ADMIN_ID, ROLE_MUTE_ID } = config;
  const args = interaction.options.getSubcommand();
  const sender = interaction.member as GuildMember;
  const target = interaction.options.getMember('target') as GuildMember;

  if (!sender.roles.cache.has(ROLE_ADMIN_ID)) {
    return await embedMessage(
      interaction,
      'RED',
      '🚫 │ 관리자 권한이 없습니다.'
    );
  }

  if (!interaction.guild?.roles.cache.get(ROLE_MUTE_ID)) {
    return await embedMessage(
      interaction,
      'RED',
      '🚫 │ 서버의 지정된 뮤트 역할이 존재하지 않습니다.'
    );
  }

  switch (args) {
    case 'add': // mute add @target
      if (target.roles.cache.has(ROLE_MUTE_ID)) {
        return await embedMessage(
          interaction,
          'RED',
          `🚫 │ ${target} 님은 이미 뮤트 상태입니다.`
        );
      }

      await target.roles.add(ROLE_MUTE_ID);

      return await embedMessage(
        interaction,
        'GREEN',
        `🔇 │ ${target} 님을 뮤트 하였습니다.`
      );

    case 'remove': // mute remove @target
      await target.roles.remove(ROLE_MUTE_ID);

      return await embedMessage(
        interaction,
        'GREEN',
        `🔊 │ ${target} 님을 뮤트 해제 하였습니다.`
      );
  }
}
