'use strict';

const flyd = require('flyd');
const Discord = require('./src/discord');
const Logger = require('./src/logger');
const Broker = require('./src/broker');

require('dotenv').config()

const broker$ = flyd.stream();
const logger$ = flyd.stream();

flyd.on(console.log, broker$);
flyd.on(console.error, logger$);

const discord = Discord({
  logger: Logger({ logger$ }),
  broker: Broker({ broker$ }),
  prefix: process.env.DISCORD_PREFIX,
  token: process.env.DISCORD_TOKEN
});

discord.init();



