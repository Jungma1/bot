import { Command } from '../interfaces/Command';
import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbedOptions } from 'discord.js';

export const info: Command = {
  name: '정보',
  data: new SlashCommandBuilder()
    .setName('정보')
    .setDescription('NARE 봇의 정보를 표시합니다.'),
  run: async (interaction) => {
    const infoEmbedOptions: MessageEmbedOptions = {
      color: 'AQUA',
      author: {
        name: interaction.client.user?.username,
        iconURL: interaction.client.user?.displayAvatarURL(),
      },
      description: `'중마' 님이 개발한 서버 관리 봇 입니다.`,
    };

    await interaction.reply({ embeds: [infoEmbedOptions] });
  },
};
