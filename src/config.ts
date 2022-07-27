import dotenv from 'dotenv';

dotenv.config();

const {
  DISCORD_TOKEN,
  CLIENT_ID,
  GUILD_ID,
  ROLE_ADMIN_ID,
  ROLE_USER_ID,
  ROLE_MUTED_ID,
} = process.env;

if (
  !DISCORD_TOKEN ||
  !CLIENT_ID ||
  !GUILD_ID ||
  !ROLE_ADMIN_ID ||
  !ROLE_USER_ID ||
  !ROLE_MUTED_ID
) {
  throw new Error('Missing environment variables');
}

const config = {
  DISCORD_TOKEN,
  CLIENT_ID,
  GUILD_ID,
  ROLE_ADMIN_ID,
  ROLE_USER_ID,
  ROLE_MUTED_ID,
};

export default config;
