import { Client, CommandInteraction } from 'discord.js';
import * as commandModules from '../commands';
import { Event } from '../interfaces/Event';

export const event: Event = {
  name: 'interactionCreate',
  once: false,
  execute(client: Client, interaction: CommandInteraction) {
    const commands = Object(commandModules);
    const { commandName } = interaction;

    if (!interaction.isCommand()) return;

    commands[commandName].execute(interaction, client);
  },
};
