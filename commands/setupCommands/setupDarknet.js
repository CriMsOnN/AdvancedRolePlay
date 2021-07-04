const prisma = require("../../lib/prisma");
const command = async (client, message, args) => {
  if (args.length === 0) {
    return await message.reply(
      "No args provided! ( !sd or !setupdarknet channelID )"
    );
  }

  const darknet = +args[0];

  if (typeof darknet !== "number") {
    return await message.reply("You need to provide the channel ID");
  }

  const darknetstring = args[0];
  if (message.guild.channels.cache.get(darknetstring)) {
    const facebookchannel = await prisma.guild.update({
      where: {
        guildID: message.guild.id,
      },
      data: {
        darknetChannel: darknetstring,
      },
    });

    const currentCache = await client.getCache(message.guild.id);
    await client.setCache(message.guild.id, {
      ...currentCache,
      darknetChannel: {
        channel: darknetstring,
        name: currentCache.darknetChannel.name,
      },
    });

    return await message.reply(`<#${darknetstring}> setup finished!`);
  } else {
    return await message.reply(`The specified channel doesnt exist`);
  }
};

module.exports = {
  command: {
    name: "setupdarknet",
    label: "Setup Darknet",
    aliases: [],
    description: "Setup Darknet Channel",
    run: command,
  },
};
