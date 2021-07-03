const { cacheGet } = require('../lib/cache');

const event = async (client, message) => {
    const cache = await cacheGet(message.guild.id);
    let args = message.content.slice(cache.prefix.name.length).trim().split(/ +/g);
    if (message.author.bot) return;

    const channels = [cache.instagramChannel.channel || null, cache.darknetChannel.channel || null, cache.facebookChannel.channel || null, cache.twitterChannel.channel || null, cache.cargrChannel.channel || null];

    const find = channels.includes(message.channel.id);

    if (find) {
        //TODO REFACTOR
        for (let channel of Object.values(cache)) {
            if (channel["channel"] === message.channel.id) {
                const content = message.content;
                const image = message.attachments.size > 0 ? message.attachments.array()[0].url : null;
                let addImage = null;
                if (image) {
                    addImage = image;
                }

                await message.delete({timeout: 100})

            }
        }
    }

    const cmd = args.shift().toLocaleLowerCase();
    if (!cmd) return;
    const command = client.commands.get(cmd) || client.aliases.get(cmd);
    if (command) {
        command.run(client, message, args);
    }
}


module.exports = {
    event: {
        name: 'message',
        run: event
    }
}