import { CommandInteraction } from 'discord.js';

export interface CommandRun {
  run: (interaction: CommandInteraction) => Promise<any>;
}
