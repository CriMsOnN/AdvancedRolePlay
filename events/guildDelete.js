const prisma = require("../lib/prisma");

const event = async (client, guild) => {
  const owner = guild.ownerID;

  const findGuild = await prisma.guild.findUnique({
    where: {
      guildID: guild.id,
    },
  });

  if (findGuild) {
    const warnings = await prisma.warnings.deleteMany({
      where: {
        guildID: guild.id,
      },
    });

    const deleted = await prisma.guild.delete({
      where: { guildID: guild.id },
    });
  } else {
    return;
  }
};

module.exports = {
  event: {
    name: "guildDelete",
    run: event,
  },
};
