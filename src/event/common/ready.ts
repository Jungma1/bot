import { ActivityOptions } from 'discord.js';
import config from '../../config';
import { Event } from '../../interface/Event';

export const event: Event = {
  name: 'ready',
  once: false,
  async execute(client) {
    let index = 0;
    const { BOT_ACTIVITY_MS } = config;

    setInterval(async () => {
      const serverCount = client.guilds.cache.size;
      const memberCount = client.guilds.cache
        .map(
          (guild) =>
            guild.members.cache.filter((member) => !member.user.bot).size
        )
        .reduce((a, b) => a + b, 0);

      const activityList: ActivityOptions[] = [
        {
          name: `${memberCount}명의 유저가 나래와 함께`,
        },
        {
          name: `${serverCount}개의 서버에서 나래가 활동`,
        },
        { name: `/정보 명령어를 입력해보세요!` },
        { name: `/롤전적 명령어로 게임 전적을 확인할 수 있어요!` },
      ];

      client.user?.setPresence({ activities: [activityList[index]] });
      index++;

      if (index >= activityList.length) index = 0;
    }, Number(BOT_ACTIVITY_MS));

    console.log('✅ Discord bot ready!');
  },
};
