import axios from 'axios';
import config from '../../config';

interface SummonerData {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}

interface SummonerLeagueData {
  leagueId: string;
  queueType: string;
  tier: string;
  rank: string;
  summonerId: string;
  summonerName: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}

const { RIOT_TOKEN } = config;

const riotClient = axios.create({
  withCredentials: true,
  headers: {
    'X-Riot-Token': RIOT_TOKEN,
  },
});

export const findSummonerDataByName = async (
  username: string
): Promise<SummonerData> => {
  return riotClient
    .get(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(
        username
      )}`
    )
    .then((result) => result.data);
};

export const findSummonerLeagueDataById = async (
  summonerId: string
): Promise<SummonerLeagueData> => {
  return riotClient
    .get(
      `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`
    )
    .then((result) => result.data);
};

export default riotClient;
