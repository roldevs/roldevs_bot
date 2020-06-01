'use strict';

const R = require('ramda');
const ApocalypseOracleApp = require('./ao/application');

const ApplicationFinder = (options) => {
  const _applications = [
    ApocalypseOracleApp,
  ]

  const _isApp = (app) => R.equals(app);
  const _prdicateFindApp = (app) => (klass) => _isApp(app)(klass(options).appName);
  const _getApp = (app) => R.find(_prdicateFindApp(app), _applications);

  const execute = (payload) => {
    const appClass = _getApp(payload.app, payload.command, payload.args);
    if (!appClass) return;

    const reply = appClass(options).execute(payload);
    return R.merge(payload, { reply });
  };

  return {
    execute,
  };
};

module.exports = ApplicationFinder;
