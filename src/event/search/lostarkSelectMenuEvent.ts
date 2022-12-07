import { EmbedBuilder, Events, StringSelectMenuInteraction } from 'discord.js';
import { Event } from '../../interface/Event';
import { LOSTARK_MENU_KEY } from '../../keys';
import { lostRepository } from '../../lib/api/lostClient';

export const event: Event = {
  name: Events.InteractionCreate,
  once: false,
  execute: async (interaction: StringSelectMenuInteraction) => {
    if (!interaction.isStringSelectMenu()) return;
    if (interaction.customId !== LOSTARK_MENU_KEY) return;

    const username = interaction.values[0];
    const armories = await lostRepository.findArmoriesByUsername(username);
    const {
      CharacterName,
      CharacterImage,
      CharacterClassName,
      ExpeditionLevel,
      CharacterLevel,
      ItemAvgLevel,
      ItemMaxLevel,
      Title,
      GuildName,
      PvpGradeName,
    } = armories;

    return interaction.update({
      embeds: [
        new EmbedBuilder()
          .setColor('Aqua')
          .setTitle('전투정보실')
          .setURL(`https://lostark.game.onstove.com/Profile/Character/${CharacterName}`)
          .setAuthor({ name: `${CharacterName} / @${CharacterClassName}`, iconURL: CharacterImage })
          .setFields(
            { name: '\u200B', value: '\u200B' },
            { name: '⎮ 원정대 레벨', value: `⎮ ${ExpeditionLevel}`, inline: true },
            { name: '⎮ 전투 레벨', value: `⎮ ${CharacterLevel}`, inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: '⎮ 장착 아이템 레벨', value: `⎮ ${ItemAvgLevel}`, inline: true },
            { name: '⎮ 달성 아이템 레벨', value: `⎮ ${ItemMaxLevel}`, inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: '⎮ 칭호', value: `⎮ ${Title ?? '없음'}`, inline: true },
            { name: '⎮ 길드', value: `⎮ ${GuildName ?? '없음'}`, inline: true },
            { name: '⎮ PVP', value: `⎮ ${PvpGradeName ?? '없음'}`, inline: true }
          )
          .setImage(CharacterImage),
      ],
    });
  },
};
