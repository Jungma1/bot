import { Command } from '../interfaces/Command';
import { SlashCommandBuilder, hyperlink } from '@discordjs/builders';
import { MessageEmbedOptions } from 'discord.js';

export const info: Command = {
  name: '정보',
  permission: false,
  data: new SlashCommandBuilder()
    .setName('정보')
    .setDescription('NARE 봇의 정보를 표시합니다.'),
  run: async (interaction) => {
    const githubLink = hyperlink(
      'NARE_BOT_GITHUB',
      'https://github.com/jungma1/nare-bot'
    );
    const infoEmbedOptions: MessageEmbedOptions = {
      color: 'AQUA',
      author: {
        name: interaction.client.user?.username,
        iconURL: interaction.client.user?.displayAvatarURL(),
      },
      description: `SpaceTime 전용 서버 관리 봇 입니다.`,
      fields: [
        { name: '\u200B', value: '\u200B' },
        {
          name: '🌐│ 핑',
          value: `ㄴ ${interaction.client.ws.ping.toString()} \t`,
        },
        { name: '🅿️│ 개발 언어', value: 'ㄴ Typescript' },
        { name: '🛠│ 사용된 라이브러리', value: 'ㄴ discord.js' },
        {
          name: `<:github:945216252723490816>│ 깃허브 링크`,
          value: `ㄴ ${githubLink}`,
        },
        { name: '\u200B', value: '\u200B' },
      ],
      timestamp: new Date(),
      footer: {
        text: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL(),
      },
    };

    await interaction.reply({ embeds: [infoEmbedOptions] });
  },
};
