const prisma = require("./prisma");
const { cacheSet } = require("./cache");
const pogger = require("pogger");

const init = async () => {
  const guilds = await prisma.guild.findMany({});
  pogger.event("Initialize Cache");
  guilds.forEach(
    ({
      guildID,
      prefix,
      instagramChannel,
      darknetChannel,
      facebookChannel,
      twitterChannel,
      cargrChannel,
      logsChannel,
      serverIP,
      welcomeLeaveChannel,
      muteRoleID,
      name,
    }) => {
      cacheSet(guildID, {
        instagramChannel: {
          channel: instagramChannel,
          name: "Instagram",
        },
        darknetChannel: {
          channel: darknetChannel,
          name: "Darknet",
        },
        facebookChannel: {
          channel: facebookChannel,
          name: "Facebook",
        },
        twitterChannel: {
          channel: twitterChannel,
          name: "Twitter",
        },
        cargrChannel: {
          channel: cargrChannel,
          name: "Car.gr",
        },
        logsChannel: {
          channel: logsChannel,
          name: "Logs",
        },
        serverIP: {
          ip: serverIP,
        },
        welcomeLeaveChannel: {
          channel: welcomeLeaveChannel,
          name: "Welcome & Leave",
        },
        muteRoleID: {
          id: muteRoleID,
        },
        serverName: {
          name: name,
        },
        prefix: {
          name: prefix,
        },
      });
      pogger.success(`${name} initialized`);
    }
  );
};

module.exports = { init };
