### Discord bot for GTA5/Fivem Greek RolePlay servers

#### Still under development

## Dependencies

- Discord.js
- Prisma
- Docker
- Postgresql
- Redis server for caching values

## Setup

- ` git clone https://github.com/CriMsOnN/AdvancedRolePlay.git AdvancedRolePlay`
- `cd advancedroleplay`
- `create a .env file`
- - `DATABASE_URL="postgresql url"`
- - `TOKEN="bot token"`
- - `PREFIX="prefix"`
- ` docker-compose up -d`
- `npm install / yarn install`
- `npx prisma generate`
- `npx prisma migrate dev`
- ` npm run start:dev / yarn run start:dev`

## Commands

- `!help`
- `!prefix`
- `!players with paginated embed showing name and ping `
- `!status`
- `!clear for messages or messages from a specific user or clear the whole channel`
- `!setup will help you create all the roleplay channels `
- `!setupcar <channelid>`
- `!setupdarknet <channelid>`
- `!setupfacebook <channelid>`
- `!setupinstagram <channelid>`
- `!setuplogs <channelid>`
- `!setuptwitter <channelid>`
- `!setupserver <ip:port>`
- `!setupwelcome <channelid>`
- `!addmute @user`
- `!removemute @user`
- `!warning @user`
- `!removewarning @user`

When you setup all the role play channels it will automatically delete any msg from this channels and send it as embed with the channel name.
Caching is not perfect

voiceStateUpdate event is not ready yet

Players with back and next buttons + pages
![](https://imgur.com/iFj1U8i.png)

## LICENSE

Copyright (C) 2021 Cr1MsOn

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
