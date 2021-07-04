const prisma = require("../../lib/prisma");

const command = async (client, message, args) => {
  const user = message.mentions.members.first();

  if (!user) {
    return await message.reply(`I cant find that user. Please try again`);
  }

  const count = await prisma.warnings.count({
    where: {
      user_name: user.user.username,
    },
  });

  await prisma.warnings.create({
    data: {
      user_name: user.user.username,
      user_id: user.user.id,
      guildID: message.guild.id,
    },
  });

  await message.reply(`Warning added to **${user.user.username}**`);
  if (count > 0) {
    await message.reply(`**${user.user.username}** has **${count}** warnings`);
  }
};

module.exports = {
  command: {
    name: "warning",
    aliases: ["wg"],
    label: "Warning",
    description: "Give warning to mentioned user",
    run: command,
  },
};
