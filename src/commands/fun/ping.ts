import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { embedMessage } from '../../utils/messages/embedMessage';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription("'Pong!' 으로 응답합니다.");

export async function execute(interaction: CommandInteraction) {
  return await embedMessage(interaction, 'AQUA', 'Pong!');
}
