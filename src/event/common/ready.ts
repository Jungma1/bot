import { Event } from '../../interface/Event';

export const event: Event = {
  name: 'ready',
  once: false,
  async execute(client) {
    console.log('✅ Discord bot ready!');
  },
};
