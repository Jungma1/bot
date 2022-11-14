import { CommandInteractionOptionResolver, SlashCommandBuilder } from 'discord.js';
import { Command } from '../../interface/Command';
import { help } from './help';
import { role } from './role';

export const team: Command = {
  name: '동아리',
  permission: false,
  data: new SlashCommandBuilder()
    .setName('동아리')
    .setDescription('_')
    .addSubcommand(subCommand =>
      subCommand.setName('도움말').setDescription('명령어 도움말을 볼 수 있어요!')
    )
    .addSubcommand(subCommand =>
      subCommand
        .setName('역할부여')
        .setDescription('유저에게 역할을 부여할 수 있어요!')
        .addUserOption(option =>
          option.setName('user').setDescription('유저 선택').setRequired(true)
        )
        .addRoleOption(option =>
          option.setName('role').setDescription('역할 선택').setRequired(true)
        )
    )
    .addSubcommand(subCommand =>
      subCommand
        .setName('역할제외')
        .setDescription('유저를 역할에서 제외할 수 있어요!')
        .addUserOption(option =>
          option.setName('user').setDescription('유저 선택').setRequired(true)
        )
        .addRoleOption(option =>
          option.setName('role').setDescription('역할 선택').setRequired(true)
        )
    ),
  run: async interaction => {
    const options = interaction.options as CommandInteractionOptionResolver;
    const selected = options.getSubcommand();

    if (selected === '도움말') {
      return help.run(interaction);
    }

    if (selected === '역할부여' || selected === '역할제외') {
      return role.run(interaction);
    }
  },
};
