import { Client, Intents } from 'discord.js';
import config from './config';
import { readdirSync } from 'fs';
import path from 'path';

const { DISCORD_TOKEN } = config;
const eventPath = path.join(__dirname, 'events');

export const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});

readdirSync(eventPath).forEach(async (dir) => {
  const files = readdirSync(`${eventPath}/${dir}`).filter((file) =>
    file.endsWith('.ts')
  );

  for (const file of files) {
    const { event } = await import(`${eventPath}/${dir}/${file}`);

    if (event.once) {
      client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
      client.on(event.name, (...args) => event.execute(client, ...args));
    }
  }
});

client.login(DISCORD_TOKEN);
