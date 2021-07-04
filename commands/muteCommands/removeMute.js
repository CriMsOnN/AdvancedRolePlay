const prisma = require("../../lib/prisma");

const command = async (client, message, args) => {
  const user = message.mentions.members.first();

  if (!user) {
    return await message.reply(`I cant find that user. Please try again!`);
  }

  const cache = await client.getCache(message.guild.id);

  if (cache.muteRoleID.id !== null) {
    if (!user.roles.cache.get(cache.muteRoleID.id)) {
      return await message.reply(`${user.user.username} is not muted!`);
    }
    await user.roles.remove(cache.muteRoleID.id);
    await message.reply(`Mute role removed from ${user.user.username}`);
  } else {
    await message.reply(
      `Seems you dont have specified mute role id. I will try to find one`
    );

    const role = message.guild.roles.cache.find(
      (role) => role.name === "muted"
    );

    if (role) {
      await message.reply(
        `Found one role with name muted! i am using that one`
      );

      user.roles.remove(role);

      await cacheSet(message.guild.id, {
        ...Cache,
        muteRoleID: {
          id: role,
        },
      });

      await prisma.guild.update({
        where: {
          guildID: message.guild.id,
        },
        data: {
          muteRoleID: role.id,
        },
      });

      await message.reply(`Mute role removed from ${user.user.username}`);
    } else {
      await message.reply(
        `Whoops. I think you dont have any specified mute role. Try !addmute @member to create one and assign it`
      );
    }
  }
};

module.exports = {
  command: {
    name: "removemute",
    label: "Remove Mute",
    aliases: [],
    description: "Remove mute to mentioned user",
    run: command,
  },
};
