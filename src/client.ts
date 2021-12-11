import { Client } from 'discord.js';
import * as commandModules from './commands';
import config from './config';

const { DISCORD_TOKEN } = config;
const commands = Object(commandModules);

export const client = new Client({
  intents: ['GUILDS'],
});

client.once('ready', () => {
  console.log('✅ Discord bot ready!');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  commands[commandName].execute(interaction, client);
});

client.login(DISCORD_TOKEN);
