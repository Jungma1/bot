import dotenv from 'dotenv';

dotenv.config();

const { DISCORD_TOKEN, CLIENT_ID, RIOT_TOKEN, BOT_ACTIVITY_MS } = process.env;

if (!DISCORD_TOKEN || !CLIENT_ID || !RIOT_TOKEN || !BOT_ACTIVITY_MS) {
  throw new Error('Missing environment variables');
}

const config = {
  DISCORD_TOKEN,
  CLIENT_ID,
  RIOT_TOKEN,
  BOT_ACTIVITY_MS,
};

export default config;
