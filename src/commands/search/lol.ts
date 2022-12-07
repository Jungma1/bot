import { CommandInteractionOptionResolver, EmbedBuilder } from 'discord.js';
import {
  findSummonerDataByName,
  findSummonerLeagueDataById,
  LeagueGamemodeType,
  RANKED_SOLO,
  UNRANKED,
} from '../../lib/api/riotClient';
import { replyRiotEmbed } from '../../lib/utils/replyRiotEmbed';
import { CommandRun } from './../../interface/CommandRun';

export const lol: CommandRun = {
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
      return replyRiotEmbed(UNRANKED, interaction, summonerData, summonerLeagueData);
    }

    // const gamemode = summonerLeagueData.flatMap((league) => league.queueType);
    const choiceMode: LeagueGamemodeType = RANKED_SOLO;

    return replyRiotEmbed(choiceMode, interaction, summonerData, summonerLeagueData);
  },
};
