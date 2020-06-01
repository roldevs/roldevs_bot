'use strict';

const flyd = require('flyd');
const Discord = require('./src/discord');
const Logger = require('./src/logger');
const Broker = require('./src/broker');
const Application = require('./src/apps/finder');
const Dice = require('./src/dice');
const Reply = require('./src/reply');
const Locale = require('./src/locale');

const application = Application({ dice: Dice() });

require('dotenv').config()

const broker$ = flyd.stream();
const logger$ = flyd.stream();

//flyd.on(console.log, broker$);
flyd.on(console.error, logger$);

const reply$ = flyd.combine((options) => application.execute(options()), [broker$]);

flyd.on(Reply().reply, reply$);

const discord = Discord({
  logger: Logger({ logger$ }),
  broker: Broker({ broker$ }),
  prefix: process.env.DISCORD_PREFIX,
  token: process.env.DISCORD_TOKEN
});

discord.init();



