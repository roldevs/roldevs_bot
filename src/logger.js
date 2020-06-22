'use strict';

const R = require('ramda');

const Logger = ({logger$}) => {
  const _log = R.curry((type, payload, message) => logger$({
    payload,
    type,
    message,
  }));

  const info = _log('info');
  const debug = _log('debug');
  const error = _log('error');

  return {
    info,
    debug,
    error,
  };
};

module.exports = Logger;
