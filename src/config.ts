import dotenv from 'dotenv';

dotenv.config();

const { DISCORD_TOKEN, CLIENT_ID, RIOT_TOKEN } = process.env;

if (!DISCORD_TOKEN || !CLIENT_ID || !RIOT_TOKEN) {
  throw new Error('Missing environment variables');
}

const config = {
  DISCORD_TOKEN,
  CLIENT_ID,
  RIOT_TOKEN,
};

export default config;
