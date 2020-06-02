'use strict';

const flyd = require('flyd');
const Discord = require('./src/discord');
const Logger = require('./src/logger');
const Broker = require('./src/broker');
const ApplicationFinder = require('./src/apps/finder');
const Application = require('./src/application');
const Dice = require('./src/dice');
const Reply = require('./src/reply');
const Locale = require('./src/locale');

const applicationFinder = ApplicationFinder({dice: Dice()});
const application = Application({applicationFinder});
const locale = Locale({language: 'es', applicationFinder});

require('dotenv').config();

const broker$ = flyd.stream();
const logger$ = flyd.stream();

// flyd.on(console.log, broker$);
// flyd.on(console.error, logger$);

const reply$ = flyd.combine((options) => {
  application.execute(options());
}, [broker$]);
const translation$ = flyd.combine((options) => {
  locale.translate(options());
}, [reply$]);

flyd.on((options) => {
  // console.log(options.reply);
}, translation$);

flyd.on(Reply().reply, translation$);

const discord = Discord({
  logger: Logger({logger$}),
  broker: Broker({broker$}),
  prefix: process.env.DISCORD_PREFIX,
  token: process.env.DISCORD_TOKEN,
});

discord.init();
