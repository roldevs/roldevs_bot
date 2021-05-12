'use strict';

const flyd = require('flyd');
const R = require('ramda');
const Discord = require('../src/discord');
const Loader = require('../src/loader/file');
const Logger = require('../src/logger');
const Broker = require('../src/broker');
const ApplicationFinder = require('../src/apps/finder');
const Application = require('../src/application');
const Dice = require('../src/dice');
const Reply = require('../src/reply');
const Locale = require('../src/locale');
const WinstonLogger = require('../src/winston');

const DiscordServer = () => {
  const broker$ = flyd.stream();
  const logger$ = flyd.stream();

  const _isLoggerType = (type) => R.compose(R.equals(type), R.prop('type'));
  const _applicationFinder = ApplicationFinder({
    dice: Dice(),
    loader: Loader(),
  });
  const _locale = Locale({
    language: 'es',
    applicationFinder: _applicationFinder,
  });
  const _logger = Logger({logger$});
  const error$ = flyd.combine((logger, self) => {
    if (_isLoggerType('error')(logger.val)) self(logger.val);
  }, [logger$]);

  const reply$ = Application({
    applicationFinder: _applicationFinder,
    logger: _logger,
    broker$,
  });

  const translation$ = flyd.combine((options) => {
    return _locale.translate(options());
  }, [reply$]);

  const run = ({prefix, token, environment}) => {
    const reply = Reply({applicationFinder: _applicationFinder});

    WinstonLogger({logger$, environment});
    flyd.on(reply.reply, translation$);
    flyd.on(reply.error, error$);

    Discord({
      logger: _logger,
      broker: Broker({broker$}),
      prefix,
      token,
    });
  };

  return {
    run,
  };
};

module.exports = DiscordServer;
