import {
  AttachmentBuilder,
  CommandInteraction,
  EmbedBuilder,
  hyperlink,
} from 'discord.js';
import {
  LeagueGamemodeType,
  SummonerData,
  SummonerLeagueData,
} from '../api/riotClient';

export const replyRiotEmbed = (
  leaguGamemode: LeagueGamemodeType,
  interaction: CommandInteraction,
  summonerData: SummonerData,
  summonerLeagueDataList: SummonerLeagueData[]
) => {
  const riotLink = hyperlink(
    'https://developer.riotgames.com/',
    'https://developer.riotgames.com/'
  );

  // Summoner Profile options
  const summonerName = summonerData.name;
  const summonerLevel = summonerData.summonerLevel;
  const summonerProfileIconUrl = `http://ddragon.leagueoflegends.com/cdn/12.14.1/img/profileicon/${summonerData.profileIconId}.png`;

  // Summoner League options
  const summonerLeagueData = summonerLeagueDataList.find(
    (league) => league.queueType === leaguGamemode
  );

  if (!summonerLeagueData) {
    const file = new AttachmentBuilder(`./src/assets/tier/undefined.png`);
    const riotEmbed = new EmbedBuilder()
      .setColor('Aqua')
      .setAuthor({
        name: summonerName,
        iconURL: summonerProfileIconUrl,
      })
      .setThumbnail(`attachment://undefined.png`)
      .setFields(
        { name: '\u200B', value: '\u200B' },
        {
          name: '⎮ 랭크 경기',
          value: leaguGamemode,
        },
        { name: '\u200B', value: '\u200B' },
        {
          name: '⎪ 레벨',
          value: `⎪ ${summonerLevel}`,
          inline: true,
        },
        {
          name: '⎪ 리그 포인트',
          value: `⎪ 0 LP`,
          inline: true,
        },
        {
          name: '⎪ 티어',
          value: '⎪ UnRanked',
          inline: true,
        },
        { name: '\u200B', value: '\u200B' },
        {
          name: 'Data Source',
          value: riotLink,
        }
      );

    return interaction.reply({ embeds: [riotEmbed], files: [file] });
  }

  const summonerLeaguePoint = summonerLeagueData.leaguePoints;
  const summonerTier = `${summonerLeagueData.tier} ${summonerLeagueData.rank}`;
  const summnoerWins = summonerLeagueData.wins;
  const summnoerLosses = summonerLeagueData.losses;
  const summnoerRate = Math.round(
    (summnoerWins / (summnoerWins + summnoerLosses)) * 100
  );

  const tierImageName = `${summonerLeagueData.tier}.png`;
  const file = new AttachmentBuilder(`./src/assets/tier/${tierImageName}`);

  const riotEmbed = new EmbedBuilder()
    .setColor('Aqua')
    .setAuthor({
      name: summonerName,
      iconURL: summonerProfileIconUrl,
    })
    .setThumbnail(`attachment://${tierImageName}`)
    .setFields(
      { name: '\u200B', value: '\u200B' },
      {
        name: '⎮ 랭크 경기',
        value: leaguGamemode,
      },
      { name: '\u200B', value: '\u200B' },
      {
        name: '⎪ 레벨',
        value: `⎪ ${summonerLevel}`,
        inline: true,
      },
      {
        name: '⎪ 리그 포인트',
        value: `⎪ ${summonerLeaguePoint} LP`,
        inline: true,
      },
      {
        name: '⎪ 티어',
        value: `⎪ ${summonerTier}`,
        inline: true,
      },
      {
        name: '⎪ 승리',
        value: `⎪ ${summnoerWins} 승`,
        inline: true,
      },
      {
        name: '⎪ 패배',
        value: `⎪ ${summnoerLosses} 패`,
        inline: true,
      },
      {
        name: '⎪ 승률',
        value: `⎪ ${summnoerRate} %`,
        inline: true,
      },
      { name: '\u200B', value: '\u200B' },
      {
        name: 'Data Source',
        value: riotLink,
      }
    );

  return interaction.reply({ embeds: [riotEmbed], files: [file] });
};
