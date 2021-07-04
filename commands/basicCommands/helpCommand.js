const { MessageEmbed } = require("discord.js");

const command = async (client, message, args) => {
  const commands = client.commands;
  const fieldsCommands = [];
  const cache = await client.getCache(message.guild.id);
  const embed = new MessageEmbed();

  embed.setTitle("Commands List");
  embed.setDescription("All the available commands for me");
  console.log(cache);

  commands.forEach((command) => {
    embed.addField(
      `${command.label}`,
      `Usage: ${cache.prefix.name}${command.name}`,
      true
    );
  });

  embed.setColor("DARK_AQUA");

  embed.setThumbnail(client.user.displayAvatarURL());

  embed.setFooter(
    "Advanced RolePlay Bot by Cr1MsOn",
    client.user.displayAvatarURL({ dynamic: true })
  );

  await message.channel.send({ embed });
};

module.exports = {
  command: {
    name: "help",
    label: "Help Command",
    aliases: [],
    run: command,
  },
};
