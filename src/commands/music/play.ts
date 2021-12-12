import { SlashCommandBuilder } from '@discordjs/builders';
import {
  CommandInteraction,
  GuildMember,
  TextChannel,
  VoiceChannel,
} from 'discord.js';
import { embedMessage } from '../../utils/messages/embedMessage';

export const data = new SlashCommandBuilder()
  .setName('play')
  .setDescription('음악 명령어')
  .addStringOption(option =>
    option
      .setName('제목')
      .setDescription('노래 제목을 입력하세요!')
      .setRequired(true)
  );

export async function execute(interaction: CommandInteraction) {
  const title = interaction.options.getString('제목');
  const member = interaction.member as GuildMember;
  const textChannel = interaction.channel as TextChannel;
  const voiceChannel = member.voice.channel as VoiceChannel;

  if (!voiceChannel) {
    return await embedMessage(
      interaction,
      'RED',
      '먼저 음성 채널에 입장해주세요!'
    );
  }

  return await embedMessage(interaction, 'AQUA', `${voiceChannel}`);
}
