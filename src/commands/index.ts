import { Command } from '../interfaces/Command';
import { mute } from './admin/mute';
import { unmute } from './admin/unmute';
import { info } from './info';

export const CommandList: Command[] = [info, mute, unmute];
