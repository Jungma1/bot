import './config';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import * as commandModules from './commands';
import config from './config';

interface Command {
  data: unknown;
}

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = config;

const commands = [];

for (const module of Object.values<Command>(commandModules)) {
  commands.push(module.data);
}

const rest = new REST({ version: '9' }).setToken(DISCORD_TOKEN);

rest
  .put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
    body: commands,
  })
  .then(() => {
    console.log('✅ Successfully registered application commands');
  })
  .catch(console.error);
