'use strict';

const R = require('ramda');

const ApplicationBase = ({appName, commands, localeDefinitions}) =>
  ({dice}) => {
    const _isApp = R.equals(appName);
    const _isCommand = (command) => R.equals(command);

    const _predicateCommand = (command, args) =>
      (commandClass) => {
        const klass = commandClass({dice, args});
        return _isCommand(command)(klass.cmd);
      };
    const _findCommand = (command, args) => {
      return R.find(_predicateCommand(command, args));
    };

    const _getCommand = ({app, command, args}) => {
      if (!_isApp(app)) return;

      return _findCommand(command, args)(commands);
    };

    const execute = (payload) => {
      const commandClass = _getCommand(payload);
      if (!commandClass) {
        return _list(payload);
      }

      const context = commandClass({dice});

      return context.pick();
    };

    const _isList = R.compose(R.equals('ls'), R.prop('command'));

    const _list = (payload) => {
      if (!_isList(payload)) return;

      return R.map((cmdClass) => {
        return {app: 'ao', cmd: cmdClass({dice}).cmd, key: 'ls'};
      }, commands);
    };

    const _translateItem = (language) => (options) => {
      return R.merge({
        text: localeDefinitions[language][options.cmd][options.key],
        description: localeDefinitions[language][options.cmd].description,
      }, options);
    };

    const translate = (language) => (options) => {
      return R.map(_translateItem(language), options);
    };

    return {
      translate,
      execute,
      appName,
    };
  };

module.exports = ApplicationBase;
