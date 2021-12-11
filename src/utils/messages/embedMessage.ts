import { ColorResolvable, CommandInteraction, MessageEmbed } from 'discord.js';

export async function embedMessage(
  interaction: CommandInteraction,
  color: ColorResolvable,
  description: string
) {
  return await interaction.reply({
    embeds: [new MessageEmbed().setColor(color).setDescription(description)],
  });
}
