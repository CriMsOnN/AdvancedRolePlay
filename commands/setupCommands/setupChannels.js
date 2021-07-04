const { MessageEmbed } = require("discord.js");
const { MessageButton, MessageActionRow } = require("discord-buttons");
const prisma = require("../../lib/prisma");
const { init } = require("../../lib/initializeCache");

const command = async (client, message, args) => {
  const cache = await client.getCache(message.guild.id);

  const instagramChannel = cache.instagramChannel.channel || null;
  const darknetChannel = cache.darknetChannel.channel || null;
  const facebookChannel = cache.facebookChannel.channel || null;
  const twitterChannel = cache.twitterChannel.channel || null;
  const cargrChannel = cache.cargrChannel.channel || null;
  const welcomeLeaveChannel = cache.welcomeLeaveChannel.channel || null;

  const embed = new MessageEmbed();
  embed.setTitle("Setup RolePlay Channels");
  embed.setDescription(
    `Default RolePlay Channels ( Instagram, Facebook, Darknet, Twitter, Car.gr, Logs, Welcome and Leave). You can setup all of them or choose any of them\n You can click the [create] button and let me create the channels`
  );
  embed.addFields([
    {
      name: "Instagram Channel",
      value: `${
        instagramChannel !== null
          ? `<#${instagramChannel}>`
          : "**Not specified**"
      }`,
      inline: true,
    },
    {
      name: "Facebook Channel",
      value: `${
        facebookChannel !== null ? `<#${facebookChannel}>` : "**Not specified**"
      }`,
      inline: true,
    },
    {
      name: "Darknet Channel",
      value: `${
        darknetChannel !== null ? `<#${darknetChannel}>` : "**Not specified**"
      }`,
      inline: true,
    },
    {
      name: "Twitter Channel",
      value: `${
        twitterChannel !== null ? `<#${twitterChannel}>` : "**Not specified**"
      }`,
      inline: true,
    },
    {
      name: "Car.gr Channel",
      value: `${
        cargrChannel !== null ? `<#${cargrChannel}>` : "**Not specified**"
      }`,
      inline: true,
    },
    {
      name: "Welcome & Leave Channel",
      value: `${
        welcomeLeaveChannel !== null
          ? `<#${welcomeLeaveChannel}>`
          : "**Not specified**"
      }`,
      inline: true,
    },
  ]);
  embed.setThumbnail(client.user.displayAvatarURL());

  embed.setFooter(
    "Advanced RolePlay Bot by Cr1MsOn",
    client.user.displayAvatarURL({ dynamic: true })
  );

  const create = new MessageButton()
    .setStyle("blurple")
    .setLabel("Create Channels")
    .setID(`${message.channel.id}`);

  await message.channel.send({ component: create, embed });

  client.on("clickButton", async (button) => {
    if (button.clicker.user.id !== message.author.id) {
      button.reply.defer();
      return;
    }
    if (button.message.channel.id !== message.channel.id) return;
    if (button.id === `${message.channel.id}`) {
      console.log("run twice");
      const channelsToCreate = [
        {
          name: "Instagram",
          cacheName: "instagramChannel",
        },
        {
          name: "Facebook",
          cacheName: "facebookChannel",
        },
        {
          name: "Darknet",
          cacheName: "darknetChannel",
        },
        {
          name: "Twitter",
          cacheName: "twitterChannel",
        },
        {
          name: "Car.gr",
          cacheName: "cargrChannel",
        },
        {
          name: "Welcome",
          cacheName: "welcomeLeaveChannel",
        },
      ];

      console.log(button);
      const category = await button.message.guild.channels.create(
        "RolePlay Channels",
        {
          type: "category",
          position: 1,
        }
      );

      channelsToCreate.forEach(async (ch) => {
        const channel = await button.message.guild.channels.create(ch.name, {
          type: "text",
          parent: category,
        });

        await prisma.guild.update({
          where: {
            guildID: button.message.guild.id,
          },
          data: {
            [ch.cacheName]: channel.id,
          },
        });
      });

      button.reply.defer();

      setTimeout(async () => {
        await init();
      }, 2000);

      message.reply("I have created all the channels");
    }
  });
};

module.exports = {
  command: {
    name: "setup",
    label: "Setup Channels",
    aliases: [],
    permissions: ["MANAGE_GUILD"],
    run: command,
  },
};
