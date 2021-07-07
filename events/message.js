const { MessageEmbed } = require("discord.js");

const event = async (client, message) => {
  const cache = await client.getCache(message.guild.id);
  if (!cache) return;
  let args = message.content
    .slice(cache.prefix.name.length)
    .trim()
    .split(/ +/g);

  if (message.author.bot) return;

  const channels = [
    cache.instagramChannel.channel || null,
    cache.darknetChannel.channel || null,
    cache.facebookChannel.channel || null,
    cache.twitterChannel.channel || null,
    cache.cargrChannel.channel || null,
  ];

  const find = channels.includes(message.channel.id);

  if (find) {
    //TODO REFACTOR
    for (let channel of Object.values(cache)) {
      if (channel["channel"] === message.channel.id) {
        const content = message.content;
        const image =
          message.attachments.size > 0
            ? message.attachments.array()[0].url
            : null;
        let addImage = null;
        if (image) {
          addImage = image;
        }

        const embed = new MessageEmbed();

        embed.setTitle(channel["name"]);
        embed.setDescription(content);
        if (addImage) {
          embed.setImage(addImage);
        }

        await message.delete({ timeout: 100 }).then(async () => {
          await message.channel.send({ embed });
        });
      }
    }
  }

  const cmd = args.shift().toLocaleLowerCase();
  const command = client.commands.get(cmd) || client.aliases.get(cmd);
  if (command) {
    if (!message.member.hasPermission(client.commands.get(cmd).permissions))
      return await message.reply("Invalid permissions");
    command.run(client, message, args);
  }
};

module.exports = {
  event: {
    name: "message",
    run: event,
  },
};
