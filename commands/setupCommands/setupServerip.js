const prisma = require("../../lib/prisma");

const command = async (client, message, args) => {
  if (args.length === 0) {
    return await message.reply(
      "No args provided! ( !ss or !setupserver ip:port )"
    );
  }

  const ip = args[0].split(":")[0];
  const port = args[0].split(":")[1];

  if (ip && port) {
    await prisma.guild.update({
      where: {
        guildID: message.guild.id,
      },
      data: {
        serverIP: `${ip}:${port}`,
      },
    });

    const currentCache = await client.getCache(message.guild.id);
    await client.setCache(message.guild.id, {
      ...currentCache,
      serverIP: {
        ip: `${ip}:${port}`,
      },
    });

    return await message.reply(`${ip}:${port} saved successfully!`);
  } else {
    return await message.reply(
      `There was an issue with your serverip. <Arguments: ip:port>`
    );
  }
};

module.exports = {
  command: {
    name: "setupserver",
    aliases: [],
    label: "Setup Server",
    description: "Setup your server",
    run: command,
  },
};
