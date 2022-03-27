import { Command } from '../../interfaces/Command';
import { SlashCommandBuilder } from '@discordjs/builders';
import { GuildMember, MessageEmbed } from 'discord.js';
import config from '../../config';

export const unmute: Command = {
  name: '뮤트해제',
  permission: true,
  data: new SlashCommandBuilder()
    .setName('뮤트해제')
    .setDescription('사용자의 뮤트를 해제시킵니다.')
    .addUserOption((option) =>
      option
        .setName('사용자')
        .setDescription('뮤트를 해제시킬 사용자를 선택합니다.')
        .setRequired(true)
    ),
  run: async (interaction) => {
    const { ROLE_MUTED_ID, ROLE_ADMIN_ID, ROLE_BOT_ID } = config;
    const sender = interaction.member as GuildMember;
    const target = interaction.options.getMember('사용자') as GuildMember;
    const sendEmbed = new MessageEmbed();

    if (
      sender === target ||
      target.roles.cache.has(ROLE_BOT_ID) ||
      target.roles.cache.has(ROLE_ADMIN_ID)
    ) {
      sendEmbed.setColor('DARK_RED').setDescription('뮤트 시킬 수 없습니다.');

      return interaction.reply({ embeds: [sendEmbed], ephemeral: true });
    }

    if (!target.roles.cache.has(ROLE_MUTED_ID)) {
      sendEmbed
        .setColor('DARK_RED')
        .setDescription(`${target} / 뮤트 상태가 아닙니다.`);

      return interaction.reply({ embeds: [sendEmbed], ephemeral: true });
    }

    await target.roles.remove(ROLE_MUTED_ID);
    sendEmbed
      .setColor('DARK_GREEN')
      .setDescription(`${target} / 뮤트를 해제하였습니다.`);

    return interaction.reply({ embeds: [sendEmbed] });
  },
};
