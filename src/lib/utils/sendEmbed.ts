import { CommandInteraction, EmbedBuilder, InteractionReplyOptions } from 'discord.js';

export const sendEmbed = {
  success: (
    description: string | null,
    interaction: CommandInteraction,
    options?: InteractionReplyOptions
  ) => {
    return interaction.reply({
      embeds: [new EmbedBuilder().setColor('Aqua').setDescription(description)],
      ...options,
    });
  },
  error: (
    description: string | null,
    interaction: CommandInteraction,
    options?: InteractionReplyOptions
  ) => {
    return interaction.reply({
      embeds: [new EmbedBuilder().setColor('Red').setDescription(description)],
      ...options,
    });
  },
};
