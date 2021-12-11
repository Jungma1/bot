import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, GuildMember, TextChannel } from 'discord.js';
import config from '../../config';
import { embedMessage } from '../../utils/messages/embedMessage';

export const data = new SlashCommandBuilder()
  .setName('clear')
  .setDescription('채팅 청소')
  .addIntegerOption(option =>
    option.setName('amount').setDescription('input amount').setRequired(true)
  );

export async function execute(interaction: CommandInteraction) {
  const { ROLE_ADMIN_ID } = config;
  const channel = interaction.channel as TextChannel;
  const sender = interaction.member as GuildMember;
  const amount = interaction.options.getInteger('amount')!;

  if (!sender.roles.cache.has(ROLE_ADMIN_ID)) {
    return await embedMessage(
      interaction,
      'RED',
      '🚫 │ 관리자 권한이 없습니다.'
    );
  }

  if (amount < 1 || amount > 99) {
    return await embedMessage(
      interaction,
      'RED',
      '🚫 │ 1 ~ 99 숫자만 입력하세요.'
    );
  }

  await channel.bulkDelete(amount, true);

  await embedMessage(
    interaction,
    'GREEN',
    `🌱 │ ${amount} 개의 메시지를 삭제했습니다.`
  );

  return setTimeout(async () => {
    await channel.bulkDelete(1, true);
  }, 3000);
}
