import dotenv from 'dotenv';

dotenv.config();

const {
  DISCORD_TOKEN,
  CLIENT_ID,
  RIOT_TOKEN,
  BOT_ACTIVITY_MS,
  ROLE_BOT_ID,
  ROLE_ADMIN_ID,
  ROLE_MASTER_ID,
  ROLE_MEMBER_ID,
  ROLE_CANDIDATE_ID,
  ROLE_USER_ID,
} = process.env;

if (
  !DISCORD_TOKEN ||
  !CLIENT_ID ||
  !RIOT_TOKEN ||
  !BOT_ACTIVITY_MS ||
  !ROLE_BOT_ID ||
  !ROLE_ADMIN_ID ||
  !ROLE_MASTER_ID ||
  !ROLE_MEMBER_ID ||
  !ROLE_CANDIDATE_ID ||
  !ROLE_USER_ID
) {
  throw new Error('Missing environment variables');
}

const config = {
  DISCORD_TOKEN,
  CLIENT_ID,
  RIOT_TOKEN,
  BOT_ACTIVITY_MS,
  ROLE_BOT_ID,
  ROLE_ADMIN_ID,
  ROLE_MASTER_ID,
  ROLE_MEMBER_ID,
  ROLE_CANDIDATE_ID,
  ROLE_USER_ID,
};

export default config;
