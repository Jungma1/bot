import { EmbedBuilder } from 'discord.js';
import { CommandRun } from './../../interface/CommandRun';

export const help: CommandRun = {
  run: async interaction => {
    interaction.reply({
      embeds: [new EmbedBuilder().setColor('Aqua').setDescription('준비중...')],
    });
  },
};
