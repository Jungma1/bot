import {
  CommandInteractionOptionResolver,
  SlashCommandBuilder,
} from 'discord.js';
import { Command } from '../../interface/Command';
import {
  findSummonerDataByName,
  findSummonerLeagueDataById,
} from '../../lib/api/riotClient';

export const lol: Command = {
  name: '롤전적',
  permission: false,
  data: new SlashCommandBuilder()
    .setName('롤전적')
    .setDescription('간단한 명령어로 롤 전적을 확인할 수 있어요!')
    .addStringOption((option) =>
      option
        .setName('username')
        .setDescription('찾으려고 하는 유저의 이름')
        .setRequired(true)
    ),
  run: async (interaction) => {
    const options = interaction.options as CommandInteractionOptionResolver;
    const username = options.getString('username', true);
    const { id } = await findSummonerDataByName(username);
    const summonerLeagueData = await findSummonerLeagueDataById(id);

    await interaction.reply(`${JSON.stringify(summonerLeagueData)}`);
  },
};
