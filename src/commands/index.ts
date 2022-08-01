import { Command } from '../interface/Command';
import { info } from './info';
import { lol } from './search/lol';

export const CommandList: Command[] = [info, lol];
