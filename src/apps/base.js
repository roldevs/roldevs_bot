'use strict';

const R = require('ramda');

const ApplicationBase = ({ appName, commands }) => ({ dice }) => {
  const _isApp = R.equals(appName);
  const _isCommand = (command) => R.equals(command);
  const _classCommand = (commandClass, args) => commandClass({ dice, args }).cmd;

  const _predicateCommand = (command, args) => (commandClass) => _isCommand(command)(_classCommand(commandClass, args));
  const _findCommand = (command, args) => R.find(_predicateCommand(command, args));

  const _getCommand = ({ app, command, args }) => {
    if (!_isApp(app)) return;

    return _findCommand(command, args)(commands);
  };

  const execute = (payload) => {
    const commandClass = _getCommand(payload);
    if (!commandClass) return;

    const context = commandClass({ dice });

    return context.pick();
  };

  return {
    execute,
    appName,
  };
};

module.exports = ApplicationBase;
