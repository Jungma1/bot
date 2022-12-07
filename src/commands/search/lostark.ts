import {
  ActionRowBuilder,
  CommandInteractionOptionResolver,
  StringSelectMenuBuilder,
} from 'discord.js';
import { CommandRun } from '../../interface/CommandRun';
import { LOSTARK_MENU_KEY } from '../../keys';
import { lostRepository } from './../../lib/api/lostClient';
import { sendEmbed } from './../../lib/utils/sendEmbed';

export const lostark: CommandRun = {
  run: async interaction => {
    const options = interaction.options as CommandInteractionOptionResolver;
    const username = options.getString('username', true);

    const characters = await lostRepository.findByUsername(username);
    if (!characters)
      return sendEmbed.error('해당하는 유저를 찾지 못했어요!', interaction, { ephemeral: true });

    const selectMenuBuilder = new StringSelectMenuBuilder()
      .setCustomId(LOSTARK_MENU_KEY)
      .setPlaceholder('캐릭터 선택');

    characters.forEach(
      ({ ServerName, CharacterName, CharacterLevel, CharacterClassName, ItemMaxLevel }) =>
        selectMenuBuilder.addOptions({
          label: CharacterName,
          description: `${ServerName} │ ${CharacterClassName} │ ${CharacterLevel} │ ${ItemMaxLevel}`,
          value: CharacterName,
        })
    );

    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(selectMenuBuilder);

    return sendEmbed.success('캐릭터를 선택해주세요!', interaction, { components: [row] });
  },
};
