import { CommandInteractionOptionResolver, SlashCommandBuilder } from 'discord.js';
import { Command } from '../../interface/Command';
import { lol } from './lol';
import { lostark } from './lostark';

export const search: Command = {
  name: '전적',
  permission: false,
  data: new SlashCommandBuilder()
    .setName('전적')
    .setDescription('_')
    .addSubcommand(subCommand =>
      subCommand
        .setName('롤')
        .setDescription('게임 << 리그 오브 레전드 >> 전적을 확인할 수 있어요!')
        .addStringOption(option =>
          option.setName('username').setDescription('찾으려고 하는 유저의 이름').setRequired(true)
        )
    )
    .addSubcommand(subCommand =>
      subCommand
        .setName('로스트아크')
        .setDescription('게임 << 로스트아크 >> 전적을 확인할 수 있어요!')
        .addStringOption(option =>
          option.setName('username').setDescription('찾으려고 하는 유저의 이름').setRequired(true)
        )
    ),
  run: async interaction => {
    const options = interaction.options as CommandInteractionOptionResolver;
    const selected = options.getSubcommand();

    if (selected === '롤') {
      return lol.run(interaction);
    }

    if (selected === '로스트아크') {
      return lostark.run(interaction);
    }
  },
};
