import { ActivityOptions, ActivityType, Guild } from 'discord.js';
import { Event } from '../../interface/Event';

export const event: Event = {
  name: 'ready',
  once: false,
  async execute(client) {
    let serverCount = client.guilds.cache.size;
    let memberCount = client.guilds.cache.reduce(
      (a, b) => a + b.memberCount,
      0
    );

    const activityList: ActivityOptions[] = [
      {
        name: `${serverCount}개 서버에서 ${memberCount}명의 유저가 나래를 이용하고 있어요!`,
      },
      { name: `/정보 명령어를 입력해보세요!` },
      { name: `/롤전적 명령어로 게임 전적을 확인할 수 있어요!` },
    ];

    let index = 0;

    client.user?.setPresence({ activities: [activityList[index]] });
    index++;

    setInterval(() => {
      client.user?.setPresence({ activities: [activityList[index]] });
      index++;

      if (index >= activityList.length) index = 0;
    }, 60 * 1000);

    console.log('✅ Discord bot ready!');
  },
};
