import { Command } from '../../interfaces/Command';
import { SlashCommandBuilder } from '@discordjs/builders';
import { GuildMember, MessageEmbed } from 'discord.js';
import config from '../../config';

export const mute: Command = {
  name: '뮤트',
  permission: true,
  data: new SlashCommandBuilder()
    .setName('뮤트')
    .setDescription('사용자를 뮤트 시킵니다.')
    .addUserOption((option) =>
      option
        .setName('사용자')
        .setDescription('뮤트 시킬 사용자를 선택합니다.')
        .setRequired(true)
    ),
  run: async (interaction) => {
    const { ROLE_MUTED_ID } = config;
    const sender = interaction.member as GuildMember;
    const target = interaction.options.getMember('사용자') as GuildMember;
    const sendEmbed = new MessageEmbed();

    if (sender === target) {
      sendEmbed
        .setColor('DARK_RED')
        .setDescription('본인은 뮤트가 불가능합니다.');

      return interaction.reply({ embeds: [sendEmbed], ephemeral: true });
    }

    if (target.roles.cache.has(ROLE_MUTED_ID)) {
      sendEmbed
        .setColor('DARK_RED')
        .setDescription(`${target} 이미 뮤트 상태입니다.`);

      return interaction.reply({ embeds: [sendEmbed], ephemeral: true });
    }

    await target.roles.add(ROLE_MUTED_ID);
    sendEmbed
      .setColor('DARK_GREEN')
      .setDescription(`${target} 뮤트를 시작합니다.`);

    return interaction.reply({ embeds: [sendEmbed] });
  },
};
