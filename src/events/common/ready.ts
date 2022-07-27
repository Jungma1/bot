import { Event } from '../../interfaces/Event';

export const event: Event = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log('✅ Discord bot ready!');
  },
};
