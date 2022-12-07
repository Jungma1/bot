import { CommandInteraction, Events } from 'discord.js';
import { CommandList } from '../../commands';
import { Event } from '../../interface/Event';

export const event: Event = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction: CommandInteraction) {
    if (!interaction.isChatInputCommand()) return;

    for (const command of CommandList) {
      if (interaction.commandName === command.name) {
        await command.run(interaction);
        break;
      }
    }
  },
};
