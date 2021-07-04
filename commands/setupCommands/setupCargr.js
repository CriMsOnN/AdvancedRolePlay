const prisma = require("../../lib/prisma");

const command = async (client, message, args) => {
  if (args.length === 0) {
    return await message.reply("No args provided!");
  }

  const cargr = +args[0];

  if (typeof cargr !== "number") {
    return await message.reply("You need to specify the channel id");
  }

  const cargrstring = args[0];

  if (message.guild.channels.cache.get(cargrstring)) {
    const cargrchannel = await prisma.guild.update({
      where: {
        guildID: message.guild.id,
      },
      data: {
        cargrChannel: cargrstring,
      },
    });

    const currentCache = await client.getCache(message.guild.id);
    await client.setCache(message.guild.id, {
      ...currentCache,
      cargrChannel: {
        channel: cargrstring,
        name: currentCache.cargrChannel.name,
      },
    });

    return await message.reply(`<#${cargrstring}> setup finished!`);
  } else {
    return await message.reply(`The specified channel doesnt exist`);
  }
};

module.exports = {
  command: {
    name: "setupcar",
    label: "Setup Car",
    aliases: [],
    run: command,
  },
};
