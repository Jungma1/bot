import { Client, MessageReaction, User } from 'discord.js';
import config from '../../config';
import { Event } from '../../interfaces/Event';

export const event: Event = {
  name: 'messageReactionAdd',
  once: false,
  async execute(client: Client, reaction: MessageReaction, user: User) {
    if (reaction.partial) await reaction.fetch();

    const {
      ROLE_SELECT_CHANNEL_ID,
      ROLE_GAMER_ID,
      ROLE_PRO_ID,
      GAMER_EMOJI_NAME,
      PRO_EMOJI_NAME,
    } = config;
    const sender = reaction.message.member;

    if (reaction.message.channel.id === ROLE_SELECT_CHANNEL_ID) {
      switch (reaction.emoji.name) {
        case GAMER_EMOJI_NAME:
          await sender?.roles.add(ROLE_GAMER_ID);
          break;
        case PRO_EMOJI_NAME:
          await sender?.roles.add(ROLE_PRO_ID);
          break;
      }
    }
  },
};
