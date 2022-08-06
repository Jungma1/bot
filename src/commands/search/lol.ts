import {
  AttachmentBuilder,
  CommandInteractionOptionResolver,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';
import { Command } from '../../interface/Command';
import {
  findSummonerDataByName,
  findSummonerLeagueDataById,
  RANKED_SOLO,
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

    const summonerLeagueDataList = await findSummonerLeagueDataById(
      summonerData.id
    );

    const summonerSoloRankData = summonerLeagueDataList?.find(
      (league) => league.queueType === RANKED_SOLO
    );

    const tierImageName = `${summonerSoloRankData?.tier}.png`;

    const file = new AttachmentBuilder(`./src/assets/emblem/${tierImageName}`);

    const summonerDataEmbed = new EmbedBuilder()
      .setColor('Aqua')
      .setTitle(summonerData.name)
      .setThumbnail(
        `http://ddragon.leagueoflegends.com/cdn/12.14.1/img/profileicon/${summonerData.profileIconId}.png`
      )
      .setImage(`attachment://${tierImageName}`)
      .setFields(
        { name: '\u200B', value: '\u200B' },
        {
          name: '⎮ 랭크 경기',
          value: `⎮ ${RANKED_SOLO}`,
        },
        { name: '\u200B', value: '\u200B' },
        {
          name: '⎪ 레벨',
          value: `⎪ ${summonerData.summonerLevel}`,
        },
        {
          name: '⎪ 티어',
          value: `${
            summonerSoloRankData
              ? `⎪ ${summonerSoloRankData?.tier}` +
                ` ${summonerSoloRankData?.rank}`
              : '⎪ UnRanked'
          }`,
        },
        {
          name: '⎪ 리그 포인트',
          value: `⎪ ${summonerSoloRankData?.leaguePoints || 0} LP`,
          inline: true,
        },
        {
          name: '⎪ 승리',
          value: `⎪ ${summonerSoloRankData?.wins || 0}`,
          inline: true,
        },
        {
          name: '⎪ 패배',
          value: `⎪ ${summonerSoloRankData?.losses || 0}`,
          inline: true,
        }
      );

    await interaction.reply({ embeds: [summonerDataEmbed], files: [file] });
  },
};
