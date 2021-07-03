const dotenv = require('dotenv')
const path = require('path');
dotenv.config({
    path: path.resolve(process.cwd(), '.env')
})
const TOKEN = process.env.TOKEN
const PREFIX = process.env.PREFIX


module.exports = {TOKEN, PREFIX}