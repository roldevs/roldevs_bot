'use strict';

const DiscordServer = require('./server/discord');

require('dotenv').config();

DiscordServer().run({
  prefix: process.env.DISCORD_PREFIX,
  token: process.env.DISCORD_TOKEN,
});
