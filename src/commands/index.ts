import { Command } from '../interfaces/Command';
import { mute } from './admin/mute';
import { info } from './info';

export const CommandList: Command[] = [info, mute];
