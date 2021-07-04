const prisma = require("../lib/prisma");
const { init } = require("../lib/initializeCache");
const pogger = require("pogger");

const event = async (client, oldGuild, newGuild) => {
  if (oldGuild.name !== newGuild.name) {
    const guildID = await prisma.guild.update({
      where: {
        guildID: oldGuild.id,
      },
      data: {
        name: newGuild.name,
      },
    });
    await init();
    pogger.info(`Guild name changed to ${newGuild.name}`);
  }
};

module.exports = {
  event: {
    name: "guildUpdate",
    run: event,
  },
};
