const command = async (client, message, args) => {
  console.log("hello");
  const channel = await message.guild.channels.create(
    `ticket: ${message.author.tag}`
  );
  channel.setParent(message.channel.parentID);

  channel.updateOverwrite(message.guild.id, {
    SEND_MESSAGE: false,
    VIEW_CHANNEL: false,
  });
  channel.updateOverwrite(message.author.id, {
    SEND_MESSAGE: true,
    VIEW_CHANNEL: true,
  });

  const reactionMessage = await channel.send("Thanl you!");

  try {
    await reactionMessage.react("🔒");
    await reactionMessage.react("🔓");
  } catch (err) {
    channel.send("Error sending emojis!");
    throw err;
  }

  const collector = reactionMessage.createReactionCollector((reaction, user) =>
    messange.guild.members.cache
      .find((member) => member.id === user.id)
      .hasPermission("ADMINISTRATOR")
  );

  collector.on("collect", (reaction, user) => {
    switch (reaction.emoji.name) {
      case ":lock:":
        channel.updateOverwrite(message.author, { SEND_MESSANGE: false });
        break;
      case ":no_entry:":
        channel.send("Deleting this channel in 5 seconds!");
        setTimeout(() => channel.delete(), 5000);
        break;
    }
  });

  message.chanel
    .send(`We will be right back! {channel}`)
    .then((msg) => {
      setTimeout(() => msg.delete(), 7000);
      setTimeout(() => message.delete(), 3000);
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  command: {
    name: "test",
    label: "test",
    aliases: [],
    description: "",
    run: command,
  },
};
