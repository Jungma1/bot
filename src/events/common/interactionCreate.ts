import { Client, CommandInteraction } from 'discord.js';
import { CommandList } from '../../commands';
import { Event } from '../../interfaces/Event';

export const event: Event = {
  name: 'interactionCreate',
  once: false,
  async execute(client: Client, interaction: CommandInteraction) {
    if (!interaction.isCommand()) return;

    for (const command of CommandList) {
      if (interaction.commandName === command.name) {
        await command.run(interaction);
        break;
      }
    }
  },
};
