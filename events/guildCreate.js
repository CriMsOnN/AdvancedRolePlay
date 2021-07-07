const prisma = require("../lib/prisma");
const { init } = require("../lib/initializeCache");

const event = async (client, guild) => {
  const newGUILD = await prisma.guild.create({
    data: {
      name: guild.name,
      guildID: guild.id,
    },
  });
  const id = guild.ownerID;
  guild.owner?.send(
    "Thank for inviting me to your guild! You default settings have been saved to my database\n If you want to see my commands type ~help"
  );
  await init();
};

module.exports = {
  event: {
    name: "guildCreate",
    run: event,
  },
};
