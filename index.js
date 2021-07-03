const { BotInstance } = require('./client')


const bot = new BotInstance
require('discord-buttons')(bot);
bot.start()