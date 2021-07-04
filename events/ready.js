const event = async (client) => {
  client.logger.success(`Loaded a total of ${client.commands.size} commands`);
  client.logger.success(`Loaded a total of ${client.events.size} events`);
  client.logger.info(
    `${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`,
    "ready"
  );
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
