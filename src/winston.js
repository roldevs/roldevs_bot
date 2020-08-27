'use strict';

const flyd = require('flyd');
const winston = require('winston');
const {format} = require('winston');
const {combine, timestamp, printf} = format;

const myFormat = printf(({level, message, timestamp}) => {
  return `${timestamp} ${level}: ${message}`;
});

const WinstonLogger = ({logger$}) => {
  const logger = winston.createLogger({
    format: combine(timestamp(), myFormat),
    transports: [
      new winston.transports.File({filename: 'log/debugger.log'}),
    ],
    exceptionHandlers: [
      new winston.transports.File({filename: 'log/exceptions.log'}),
    ],
  });

  flyd.on(({
    type,
    message,
  }) => {
    if (type==='error') {
      logger.error(message);
    } else {
      logger.info(message);
    }
  }, logger$);

  return logger;
};

module.exports = WinstonLogger;
