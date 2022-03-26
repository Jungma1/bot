import { Command } from '../../interfaces/Command';
import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';

export const mute: Command = {
  name: '뮤트',
  permission: true,
  data: new SlashCommandBuilder()
    .setName('뮤트')
    .setDescription('해당 유저를 뮤트시킵니다.'),
  run: async (interaction) => {
    const testEmbed = new MessageEmbed().setTitle('test');

    await interaction.reply({ embeds: [testEmbed] });
  },
};
