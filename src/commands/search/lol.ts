import { CommandInteractionOptionResolver, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { Command } from '../../interface/Command';
import {
  findSummonerDataByName,
  findSummonerLeagueDataById,
  LeagueGamemodeType,
  RANKED_SOLO,
  UNRANKED,
} from '../../lib/api/riotClient';
import { replyRiotEmbed } from '../../lib/utils/replyRiotEmbed';

export const lol: Command = {
  name: '롤전적',
  permission: false,
  data: new SlashCommandBuilder()
    .setName('롤전적')
    .setDescription('간단한 명령어로 롤 전적을 확인할 수 있어요!')
    .addStringOption(option =>
      option.setName('username').setDescription('찾으려고 하는 유저의 이름').setRequired(true)
    ),
  run: async interaction => {
    const options = interaction.options as CommandInteractionOptionResolver;
    const username = options.getString('username', true);
    const summonerData = await findSummonerDataByName(username);

    if (!summonerData) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('Aqua')
            .setDescription('**소환사님의 정보를 찾지 못했어요!**'),
        ],
      });
    }

    const summonerLeagueData = await findSummonerLeagueDataById(summonerData.id);

    if (summonerLeagueData.length === 0) {
      replyRiotEmbed(UNRANKED, interaction, summonerData, summonerLeagueData);
    }

    // const gamemode = summonerLeagueData.flatMap((league) => league.queueType);
    const choiceMode: LeagueGamemodeType = RANKED_SOLO;

    return replyRiotEmbed(choiceMode, interaction, summonerData, summonerLeagueData);
  },
};
