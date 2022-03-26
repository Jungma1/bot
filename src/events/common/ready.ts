import { GuildApplicationCommandPermissionData, Role } from 'discord.js';
import { CommandList } from '../../commands';
import config from '../../config';
import { Event } from '../../interfaces/Event';

export const event: Event = {
  name: 'ready',
  once: true,
  async execute(client) {
    const { GUILD_ID, ROLE_ADMIN_ID, ROLE_USER_ID } = config;
    const commands = await client.guilds.cache.get(GUILD_ID)?.commands.fetch();
    const fullPermissions: GuildApplicationCommandPermissionData[] = [];

    commands?.forEach((slashCommand) => {
      CommandList.forEach((command) => {
        if (slashCommand.name !== command.name) return;

        fullPermissions.push({
          id: slashCommand.id,
          permissions: [
            {
              id: ROLE_ADMIN_ID,
              type: 'ROLE',
              permission: true,
            },
            {
              id: ROLE_USER_ID,
              type: 'ROLE',
              permission: !command.permission,
            },
          ],
        });
      });
    });

    await client.guilds.cache
      .get(GUILD_ID)
      ?.commands.permissions.set({ fullPermissions });

    console.log('✅ Discord bot ready!');
  },
};
