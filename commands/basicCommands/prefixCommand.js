const prisma = require("../../lib/prisma");

const command = async (client, message, args) => {
  if (args.length === 0) {
    return message.reply("No args provided!");
  }

  const cache = await client.getCache(message.guild.id);
  if (cache.prefix.name !== null) {
    await client.setCache(message.guild.id, {
      ...cache,
      prefix: {
        name: args[0],
      },
    });

    await prisma.guild.update({
      where: {
        guildID: message.guild.id,
      },
      data: {
        prefix: args[0],
      },
    });

    await message.reply(`Your server prefix changed to **${args[0]}**`);
  }
};

module.exports = {
  command: {
    name: "prefix",
    aliases: [],
    label: "Change prefix",
    run: command,
  },
};
