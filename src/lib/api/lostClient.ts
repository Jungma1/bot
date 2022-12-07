import axios from 'axios';
import config from '../../config';

interface Character {
  ServerName: string;
  CharacterName: string;
  CharacterLevel: number;
  CharacterClassName: string;
  ItemAvgLevel: string;
  ItemMaxLevel: string;
}

interface Armories extends Character {
  CharacterImage: string;
  ExpeditionLevel: number;
  PvpGradeName: string;
  TownLevel: number;
  TownName: string;
  Title: string;
  GuildMemberGrade: string;
  GuildName: string;
  Stats: [
    {
      Type: string;
      Value: string;
      Tooltip: string[];
    }
  ];
  Tendencies: [
    {
      Type: string;
      Point: number;
      MaxPoint: number;
    }
  ];
}

const { LOSTARK_TOKEN } = config;

const client = axios.create({
  baseURL: 'https://developer-lostark.game.onstove.com',
  withCredentials: true,
  headers: {
    Authorization: `bearer ${LOSTARK_TOKEN}`,
  },
});

export const lostRepository = {
  findByUsername: async (username: string) => {
    const response = await client.get<Character[]>(`/characters/${encodeURI(username)}/siblings`);
    return response.data;
  },
  findArmoriesByUsername: async (username: string) => {
    const response = await client.get<Armories>(
      `/armories/characters/${encodeURI(username)}/profiles`
    );
    return response.data;
  },
};
