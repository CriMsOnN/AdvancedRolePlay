const prisma = require("../../lib/prisma");

const command = async (client, message, args) => {
  if (args.length === 0) {
    return await message.reply(
      "No args provided! ( !sw or !setupwelcome channelID )"
    );
  }

  const logs = +args[0];

  if (typeof welcome !== "number") {
    return await message.reply("You need to provide the channel ID");
  }

  const logstring = args[0];
  if (message.guild.channels.cache.get(welcomestring)) {
    const logschannel = await prisma.guild.update({
      where: {
        guildID: message.guild.id,
      },
      data: {
        logsChannel: logstring,
      },
    });

    const currentCache = await client.getCache(message.guild.id);
    await client.setCache(message.guild.id, {
      ...currentCache,
      logsChannel: {
        channel: logstring,
        name: currentCache.logsChannel.name,
      },
    });

    return await message.reply(`<#${logsChannel}> setup finished!`);
  } else {
    return await message.reply(`The specified channel doesnt exist`);
  }
};

module.exports = {
  command: {
    name: "setuplogs",
    aliases: [],
    label: "Setup Logs",
    description: "Setup logs channel",
    run: command,
  },
};
