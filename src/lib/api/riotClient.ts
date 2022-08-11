import axios from 'axios';
import config from '../../config';

export const UNRANKED = 'UNRANKED';
export const RANKED_SOLO = 'RANKED_SOLO_5x5';
export const RANKED_FLEX_SR = 'RANKED_FLEX_SR';
export const RANKED_TFT_DOUBLE_UP = 'RANKED_TFT_DOUBLE_UP';

const LeagueGamemodeOptions = {
  UNRANKED,
  RANKED_SOLO,
  RANKED_FLEX_SR,
  RANKED_TFT_DOUBLE_UP,
};

type Union<T> = T[keyof T];

export type LeagueGamemodeType = Union<typeof LeagueGamemodeOptions>;

export interface SummonerData {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}

export interface SummonerLeagueData {
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

export const findSummonerDataByName = async (username: string) => {
  try {
    const { data: response } = await riotClient.get<SummonerData>(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(
        username
      )}`
    );

    return response;
  } catch (error) {
    return null;
  }
};

export const findSummonerLeagueDataById = async (summonerId: string) => {
  try {
    const { data: response } = await riotClient.get<SummonerLeagueData[]>(
      `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`
    );

    return response;
  } catch (error) {
    return [];
  }
};

export default riotClient;
