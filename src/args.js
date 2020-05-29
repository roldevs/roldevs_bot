'use strict';

const R = require('ramda');

const Args = () => {
  const _getApp = R.nth(0);
  const _getCommand = R.nth(1);

  // Full args including app and command
  const _getArgs = (message) => message.split(/ +/);

  const _app = R.compose(_getApp, _getArgs);
  const _command = R.compose(R.defaultTo(null), _getCommand, _getArgs);
  const _args = R.compose(R.remove(0, 2), _getArgs);

  const payload = (message) => {
    return {
      app: _app(message),
      command: _command(message),
      args: _args(message),
    }
  };

  return {
    payload,
  };
};

module.exports = Args;
