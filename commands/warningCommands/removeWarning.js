const prisma = require("../../lib/prisma");

const command = async (client, message, args) => {
  const user = message.mentions.members.first();

  if (!user) {
    return await message.reply(`I cant find that user. Please try again`);
  }

  const userWarnings = await prisma.warnings.findMany({
    where: {
      user_id: user.user.id,
    },
  });

  if (userWarnings) {
    await prisma.warnings.deleteMany({
      where: {
        user_id: user.user.id,
      },
    });

    return await message.reply(
      `Warnings from **${user.user.username}** removed!`
    );
  } else {
    return await message.reply(`**${user.user.username}** has **0** warnings`);
  }
};

module.exports = {
  command: {
    name: "removewarning",
    aliases: ["rw"],
    label: "Remove Warning",
    description: "Remove warning from mentioned user",
    run: command,
  },
};
