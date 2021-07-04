const prisma = require("../../lib/prisma");

const command = async (client, message, args) => {
  if (args.length === 0) {
    return await message.reply(
      "No args provided! ( !sw or !setupwelcome channelID )"
    );
  }

  const welcome = +args[0];

  if (typeof welcome !== "number") {
    return await message.reply("You need to provide the channel ID");
  }

  const welcomestring = args[0];
  if (message.guild.channels.cache.get(welcomestring)) {
    const facebookchannel = await prisma.guild.update({
      where: {
        guildID: message.guild.id,
      },
      data: {
        welcomeLeaveChannel: welcomestring,
      },
    });

    const currentCache = await client.getCache(message.guild.id);
    await client.setCache(message.guild.id, {
      ...currentCache,
      welcomeLeaveChannel: {
        channel: welcomestring,
        name: currentCache.welcomeLeaveChannel.name,
      },
    });

    return await message.reply(`<#${welcomestring}> setup finished!`);
  } else {
    return await message.reply(`The specified channel doesnt exist`);
  }
};

module.exports = {
  command: {
    name: "setupwelcome",
    aliases: ["sw"],
    label: "Setup Welcome",
    description: "Setup welcome channel",
    run: command,
  },
};
