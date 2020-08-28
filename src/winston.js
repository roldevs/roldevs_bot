'use strict';

const flyd = require('flyd');
const winston = require('winston');
const {format} = require('winston');
const {combine, timestamp, printf} = format;

const WinstonLogger = ({logger$, environment}) => {
  const _myFormat = printf(({level, message, timestamp}) => {
    return `${timestamp} ${level}: ${message}`;
  });

  const _createDevelopmentLogger = () => {
    return winston.createLogger({
      format: combine(timestamp(), _myFormat),
      transports: [
        new winston.transports.File({filename: 'log/debugger.log'}),
      ],
      exceptionHandlers: [
        new winston.transports.File({filename: 'log/exceptions.log'}),
      ],
    });
  };

  const _createProductionLogger = () => {
    //
    // Requiring `winston-papertrail` will expose
    // `winston.transports.Papertrail`
    //
    require('winston-papertrail').Papertrail;
    const _winstonPapertrail = new winston.transports.Papertrail({
      host: 'logs3.papertrailapp.com',
      port: 51862,
    });

    return winston.createLogger({
      format: combine(timestamp(), myFormat),
      transports: [_winstonPapertrail],
      exceptionHandlers: [_winstonPapertrail],
    });
  };

  const _getLogger = () => {
    return (
      environment === 'development' ?
      _createDevelopmentLogger() :
      _createProductionLogger()
    );
  };

  const logger = _getLogger();
  const loggerByType = (type) => {
    return (type === 'error' ? logger.error : logger.info);
  };

  flyd.on(({type, message}) => loggerByType(type)(message), logger$);

  return logger;
};

module.exports = WinstonLogger;
