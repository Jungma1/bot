import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { readdirSync } from 'fs';
import path from 'path';
import config from './config';
import { Event } from './interface/Event';

const { DISCORD_TOKEN } = config;
const eventPath = path.join(__dirname, 'event');

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

readdirSync(eventPath).forEach(async dir => {
  const files = readdirSync(`${eventPath}/${dir}`).filter(file => {
    if (file.endsWith('.js') || file.endsWith('.ts')) return file;
  });

  for (const file of files) {
    const { event }: { event: Event } = await import(`${eventPath}/${dir}/${file}`);

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
});

client.login(DISCORD_TOKEN);
