const { MessageEmbed } = require("discord.js");
const { MessageButton, MessageActionRow } = require("discord-buttons");
const prisma = require("../../lib/prisma");
const { init } = require("../../lib/initializeCache");

const command = async (client, message, args) => {
  if (args[0] === "all") {
    message.channel.send("I will clear the channel it may take some time!");
    await message.channel
      .awaitMessages((m) => m.author.id === message.author.id, {
        max: 1,
        time: 10000,
        errors: ["time"],
      })
      .catch(() => {
        message.reply("Times up");
      });
    const position = message.channel.position;
    const createNewChannel = await message.channel.clone();
    await message.channel.delete();
    createNewChannel.setPosition(position);
    return createNewChannel.send("Channel cleared");
  }

  let totalmessages = args[0];
  if (!totalmessages || isNaN(totalmessages) || parseInt(totalmessages) < 1) {
    return message.reply("Missing amount of messages to delete");
  }

  await message.delete();

  const user = message.mentions.users.first();

  let messages = await message.channel.messages.fetch({ limit: 100 });
  messages = messages.array();

  if (user) {
    messages = messages.filter((m) => m.author.id === user.id);
  }

  if (messages.length > totalmessages) {
    messages.length = parseInt(totalmessages, 10);
  }

  messages = messages.filter((m) => !m.pinned);
  message.channel.bulkDelete(messages, true);

  if (user) {
    await message.channel
      .send(`Deleted all messages from ${user.username}`)
      .then((m) => {
        m.delete({ timeout: 1000 });
      });
  } else {
    await message.channel
      .send(`Deleted a total of **${messages.length}** messages`)
      .then((m) => {
        m.delete({ timeout: 1000 });
      });
  }
};

module.exports = {
  command: {
    name: "clear",
    label: "Clear messages",
    aliases: [],
    description: "Clear messages or user messages",
    permissions: ["MANAGE_MESSAGES"],
    run: command,
  },
};
