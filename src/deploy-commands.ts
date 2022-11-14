import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { CommandList } from './commands';
import './config';
import config from './config';

const { DISCORD_TOKEN, CLIENT_ID } = config;

const commands = [];

for (const command of CommandList) {
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

rest
  .put(Routes.applicationCommands(CLIENT_ID), {
    body: commands,
  })
  .then(() => {
    console.log('✅ Successfully registered application commands');
  })
  .catch(console.error);
