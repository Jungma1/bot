import { Command } from '../interface/Command';
import { info } from './me/info';
import { lol } from './search/lol';
import { team } from './team/index';

export const CommandList: Command[] = [info, lol, team];
