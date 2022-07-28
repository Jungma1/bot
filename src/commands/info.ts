import { Command } from '../interfaces/Command';
import { SlashCommandBuilder } from '@discordjs/builders';
import { EmbedBuilder, hyperlink } from 'discord.js';
import { emojiPalette } from '../lib/emojiPalette';

export const info: Command = {
  name: '정보',
  permission: false,
  data: new SlashCommandBuilder()
    .setName('정보')
    .setDescription('나래봇에 대한 정보를 볼 수 있는 명령어에요!'),
  run: async (interaction) => {
    const githubHyperLink = hyperlink(
      'Team Nare',
      'https://github.com/nare-team'
    );

    const infoEmbed = new EmbedBuilder()
      .setColor('Aqua')
      .setDescription('나래에요!')
      .addFields(
        { name: '\u200B', value: '\u200B' },
        {
          name: '🌐│ 핑',
          value: `ㄴ ${interaction.client.ws.ping.toString()}`,
        },
        { name: '🅿️│ 개발 언어', value: 'ㄴ Typescript' },
        {
          name: '🛠│ 사용된 라이브러리',
          value: 'ㄴ discord.js',
        },
        {
          name: '\u200B',
          value: `${emojiPalette.github}│ ${githubHyperLink}`,
        },
        { name: '\u200B', value: '\u200B' }
      )
      .setTimestamp(new Date())
      .setFooter({
        text: `작성자 • ${interaction.user.username}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    await interaction.reply({ embeds: [infoEmbed] });
  },
};
