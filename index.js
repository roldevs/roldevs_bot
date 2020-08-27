'use strict';

const flyd = require('flyd');
const R = require('ramda');
const Discord = require('./src/discord');
const Loader = require('./src/loader/file');
const Logger = require('./src/logger');
const Broker = require('./src/broker');
const ApplicationFinder = require('./src/apps/finder');
const Application = require('./src/application');
const Dice = require('./src/dice');
const Reply = require('./src/reply');
const Locale = require('./src/locale');

require('dotenv').config();

const broker$ = flyd.stream();
const logger$ = flyd.stream();

const _isLoggerType = (type) => R.compose(R.equals(type), R.prop('type'));
const applicationFinder = ApplicationFinder({dice: Dice(), loader: Loader()});
const locale = Locale({language: 'es', applicationFinder});
const logger = Logger({logger$});
const error$ = flyd.combine((logger, self) => {
  if (_isLoggerType('error')(logger.val)) self(logger.val);
}, [logger$]);

const reply$ = Application({applicationFinder, logger, broker$});

const translation$ = flyd.combine((options) => {
  return locale.translate(options());
}, [reply$]);

flyd.on(Reply().reply, translation$);
flyd.on(Reply().error, error$);

Discord({
  logger,
  broker: Broker({broker$}),
  prefix: process.env.DISCORD_PREFIX,
  token: process.env.DISCORD_TOKEN,
});
