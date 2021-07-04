const event = async (client) => {
  client.logger.info(`${client.user.tag} is online!`);
  setInterval(() => {
    const size = client.guilds.cache.size;
    const msg = client.guilds.cache.size <= 1 ? "server" : "servers";
    client.user.setActivity(`${client.guilds.cache.size} ${msg}`, {
      type: "WATCHING",
    });
  }, 20000);
};

module.exports = {
  event: {
    name: "ready",
    run: event,
  },
};
