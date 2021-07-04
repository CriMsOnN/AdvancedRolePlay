const { Client, Collection } = require("discord.js");
const dotenv = require("dotenv");
const { readdirSync } = require("fs");
const path = require("path");
const pogger = require("pogger");
const { TOKEN } = require("../lib/config");
const { init } = require("../lib/initializeCache");
const { cacheGet, cacheSet } = require("../lib/cache");
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

class BotInstance extends Client {
  commands = new Collection();
  events = new Collection();
  aliases = new Collection();
  logger = pogger;
  getCache = cacheGet;
  setCache = cacheSet;

  async start() {
    this.logger.event("Starting Bot");

    this.logger.event("Initialize Commands");

    const commandPath = path.join(__dirname, "..", "commands");
    readdirSync(commandPath).forEach((dir) => {
      const commands = readdirSync(`${commandPath}/${dir}`).filter((file) =>
        file.endsWith(".js")
      );

      if (commands) {
        for (const file of commands) {
          const { command } = require(`${commandPath}/${dir}/${file}`);
          this.commands.set(command.name, command);

          if (command.aliases.length !== 0) {
            command.aliases.forEach((alias) => {
              this.aliases.set(alias, command);
            });
          }
        }
      } else {
        this.logger.error("No commands available");
      }
    });

    this.logger.event("Initialize Events");
    const eventPath = path.join(__dirname, "..", "events");
    readdirSync(eventPath).forEach(async (file) => {
      const { event } = await require(`${eventPath}/${file}`);

      this.events.set(event.name, event);
      this.on(event.name, event.run.bind(null, this));
    });

    await init();
    await this.login(TOKEN);
  }
}

module.exports = {
  BotInstance: BotInstance,
};
