import { Command } from '../interfaces/Command';
import { SlashCommandBuilder } from '@discordjs/builders';

export const ping: Command = {
  name: '핑',
  data: new SlashCommandBuilder()
    .setName('핑')
    .setDescription('현재 핑을 알려줍니다.'),
  run: async (interaction) => {
    await interaction.reply('퐁!');
  },
};
