const { cacheGet } = require("../../lib/cache");
const fetch = require('node-fetch');
const { MessageEmbed } = require("discord.js");
const { MessageButton, MessageActionRow } = require("discord-buttons");
const command = async (client, message, args) => {
    const splitArray = (arr, len) => {
        let chunks = [];
        let i = 0;
        let n = arr.length;
        while (i < n) {
            chunks.push(arr.slice(i, (i += len)))
        }
        return chunks;
    }

    const cache = await cacheGet(message.guild.id);

    if (cache.serverIP.ip !== null) {
        const serverip = cache.serverIP.ip;
        const response = await fetch(`http://${serverip}/players.json`);
        if (response.ok) {
            const results = await response.json();
            if (results.length === 0) {
                return message.reply("Server is starting up");
            }

            const splittedArrays = splitArray(results, 25);
            const pages = splittedArrays.length;
            let currentPage = 0;
            const embed = new MessageEmbed();
            embed.setTitle(`Total Players: ${results.length}`);
            embed.setColor("DARK_AQUA");

            splittedArrays[currentPage].forEach((player) => {
                embed.addField(
                    `**${player.name}**`,
                    `Ping: **${player.ping > 100 ? `${player.ping} ** -> HIGH` : player.ping + "**"}`,
                    true
                )
            });

            embed.setFooter(`Pages: ${currentPage + 1}/${pages}`);
            embed.setThumbnail(client.user.displayAvatarURL({ dynamic: true }));

            const nextButton = new MessageButton()
                .setStyle('blurple')
                .setLabel('NEXT')
                .setID('next')

            const previousButton = new MessageButton()
                .setStyle('blurple')
                .setLabel('BACK')
                .setID('back')

            const row = new MessageActionRow()
                .addComponent([previousButton, nextButton])

            message.channel.send({ component: row, embed })


            client.on('clickButton', async (button) => {
                button.reply.defer()
                if (button.id === 'next') {
                    currentPage += 1;
                    if (currentPage >= pages) {
                        currentPage -= 1;
                    }
                    const embed = new MessageEmbed()
                    embed.setTitle(`Total Players: ${results.length}`);
                    embed.setColor("DARK_AQUA");

                    splittedArrays[currentPage].forEach((player) => {
                        embed.addField(
                            `**${player.name}**`,
                            `Ping: **${player.ping > 100 ? `${player.ping} ** -> HIGH` : player.ping + "**"}`,
                            true
                        )
                    });

                    embed.setFooter(`Pages: ${currentPage + 1}/${pages}`);
                    embed.setThumbnail(client.user.displayAvatarURL({ dynamic: true }));

                    button.message.edit({
                        embed: embed,
                    
                    })
                    embed.setFooter(`Pages: ${currentPage + 1}/${pages}`)

                } else if (button.id === "back") {
                    currentPage -= 1;
                    if (currentPage < 0) {
                        currentPage = 0;
                    }
                    const embed = new MessageEmbed()
                    embed.setTitle(`Total Players: ${results.length}`);
                    embed.setColor("DARK_AQUA");

                    splittedArrays[currentPage].forEach((player) => {
                        embed.addField(
                            `**${player.name}**`,
                            `Ping: **${player.ping > 100 ? `${player.ping} ** -> HIGH` : player.ping + "**"}`,
                            true
                        )
                    });

                    embed.setFooter(`Pages: ${currentPage + 1}/${pages}`);
                    embed.setThumbnail(client.user.displayAvatarURL({ dynamic: true }));

                    button.message.edit({
                        embed: embed,
                    
                    })
                    embed.setFooter(`Pages: ${currentPage + 1}/${pages}`)

                }
            })
        }
    }
}


module.exports = {
    command: {
        name: 'players',
        aliases: [],
        label: 'Total Players',
        run: command
    }
}