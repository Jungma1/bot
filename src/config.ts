import dotenv from 'dotenv';

dotenv.config();

const {
  DISCORD_TOKEN,
  CLIENT_ID,
  GUILD_ID,
  ROLE_ADMIN_ID,
  ROLE_SELECT_CHANNEL_ID,
  ROLE_GAMER_ID,
  ROLE_PRO_ID,
  GAMER_EMOJI_NAME,
  PRO_EMOJI_NAME,
} = process.env;

if (
  !DISCORD_TOKEN ||
  !CLIENT_ID ||
  !GUILD_ID ||
  !ROLE_ADMIN_ID ||
  !ROLE_SELECT_CHANNEL_ID ||
  !ROLE_GAMER_ID ||
  !ROLE_PRO_ID ||
  !GAMER_EMOJI_NAME ||
  !PRO_EMOJI_NAME
) {
  throw new Error('Missing environment variables');
}

const config = {
  DISCORD_TOKEN,
  CLIENT_ID,
  GUILD_ID,
  ROLE_ADMIN_ID,
  ROLE_SELECT_CHANNEL_ID,
  ROLE_GAMER_ID,
  ROLE_PRO_ID,
  GAMER_EMOJI_NAME,
  PRO_EMOJI_NAME,
};

export default config;
