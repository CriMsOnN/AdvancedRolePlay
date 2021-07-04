const prisma = require("../../lib/prisma");

const command = async (client, message, args) => {
  if (args.length === 0) {
    return await message.reply(
      "No args provided! ( !sf or !setupfacebook channelID )"
    );
  }

  const facebook = +args[0];

  if (typeof facebook !== "number") {
    return await message.reply("You need to provide the channel ID");
  }

  const facebookstring = args[0];
  if (message.guild.channels.cache.get(facebookstring)) {
    const facebookchannel = await prisma.guild.update({
      where: {
        guildID: message.guild.id,
      },
      data: {
        facebookChannel: facebookstring,
      },
    });

    const currentCache = await client.getCache(message.guild.id);
    await client.setCache(message.guild.id, {
      ...currentCache,
      facebookChannel: {
        channel: facebookstring,
        name: currentCache.facebookChannel.name,
      },
    });

    return await message.reply(`<#${facebookstring}> setup finished!`);
  } else {
    return await message.reply(`The specified channel doesnt exist`);
  }
};

module.exports = {
  command: {
    name: "setupfacebook",
    aliases: [],
    description: "Setup facebook channel",
    label: "Setup Facebook",
    run: command,
  },
};
