const prisma = require("../../lib/prisma");
const command = async (client, message, args) => {
  if (args.length === 0) {
    return await message.reply(
      "No args provided! ( !st or !setuptwitter channelID )"
    );
  }

  const twitter = +args[0];

  if (typeof twitter !== "number") {
    return await message.reply("You need to provide the channel ID");
  }

  const twitterstring = args[0];
  if (message.guild.channels.cache.get(twitterstring)) {
    const facebookchannel = await prisma.guild.update({
      where: {
        guildID: message.guild.id,
      },
      data: {
        twitterChannel: twitterstring,
      },
    });

    const currentCache = await client.getCache(message.guild.id);
    await client.setCache(message.guild.id, {
      ...currentCache,
      twitterChannel: {
        channel: twitterstring,
        name: currentCache.twitterChannel.name,
      },
    });

    return await message.reply(`<#${twitterstring}> setup finished!`);
  } else {
    return await message.reply(`The specified channel doesnt exist`);
  }
};

module.exports = {
  command: {
    name: "setuptwitter",
    aliases: [],
    label: "Setup Twitter",
    description: "Setup twitter channel",
    run: command,
  },
};
