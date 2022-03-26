import {
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export interface Command {
  name: string;
  permission: boolean;
  data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
  run: (interaction: CommandInteraction) => Promise<void>;
}
