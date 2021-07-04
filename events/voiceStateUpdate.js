const prisma = require("../lib/prisma");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const event = async (client, oldState, newState) => {
  const cache = await client.getCache(newState.guild.id);
  //   const wfsChannel = cache.wfsChannel.channel;
  //   console.log(await user.voice.setChannel("860934991026585600"));
  if (newState.channelID === "860934991026585600") {
    const user = newState.guild.members.cache.find((e) => e.id === newState.id);
    const random = getRandomInt(0, 1000);
    const channel = await newState.guild.channels.create(`support_${random}`, {
      type: "voice",
    });
    await client.setCache(newState.guild.id, {
      ...cache,
      support: {
        id: channel.id,
      },
    });
    await user.voice.setChannel(channel.id);
  }

  if (newState.channelID === null) {
    const newStateCache = await client.getCache(oldState.guild.id);
    for (let [key, value] of Object.entries(newStateCache)) {
      if (key === "support" && value.id === oldState.channelID) {
        const memberCount = oldState.guild.channels.cache.get(
          oldState.channelID
        ).members;
        if (memberCount.size === 0) {
          const fetchedChannel = oldState.guild.channels.cache.find(
            (e) => e.id === oldState.channelID
          );

          await fetchedChannel.delete();
        }
      }
    }
  }
};

module.exports = {
  event: {
    name: "voiceStateUpdate",
    run: event,
  },
};
