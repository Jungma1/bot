import { Command } from '../interface/Command';
import { info } from './me/info';
import { search } from './search';
import { team } from './team/index';

export const CommandList: Command[] = [info, search, team];
