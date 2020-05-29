'use strict';

const Logger = ({ logger$ }) => {
  const info = (message) => logger$({
    type: 'info',
    message,
  });
  const debug = (message) => logger$({
    type: 'debug',
    message,
  });
  const error = (message) => logger$({
    type: 'error',
    message,
  });

  return {
    info,
    debug,
    error,
  };
};

module.exports = Logger;
