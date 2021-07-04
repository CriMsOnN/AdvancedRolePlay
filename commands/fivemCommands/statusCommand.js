const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const command = async (client, message, args) => {
  const cache = await client.getCache(message.guild.id);

  if (cache.serverIP.ip !== null) {
    const serverip = cache.serverIP.ip;
    const response = await fetch(`http://${serverip}/dynamic.json`);
    if (response.ok) {
      const { hostname, clients, sv_maxclients } = await response.json();
      const regex = hostname.replace(/[^+]\d+/g, " ");
      const removeCharacters = regex.replace(/\|\|/g, " ");
      const embed = new MessageEmbed();
      embed.setTitle(`Server Status - ${cache.serverName.name}`);
      embed.setDescription(`Hostname: ${removeCharacters}`);
      embed.addFields({
        name: "Total Players",
        value: `${clients}/${sv_maxclients}`,
      });
      embed.setColor("DARK_AQUA");

      embed.setThumbnail(client.user.displayAvatarURL());

      embed.setFooter(
        "Advanced RolePlay Bot by Cr1MsOn",
        client.user.displayAvatarURL({ dynamic: true })
      );

      await message.channel.send({ embed });
    }
  }
};

module.exports = {
  command: {
    name: "status",
    aliases: [],
    label: "Server Status",
    run: command,
  },
};
