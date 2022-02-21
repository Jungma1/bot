import { Event } from '../interfaces/Event';

export const event: Event = {
  name: 'ready',
  once: true,
  execute() {
    console.log('✅ Discord bot ready!');
  },
};
