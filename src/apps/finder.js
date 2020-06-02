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

  const getApp = (payload) => {
    const appClass = _getApp(payload.app, payload.command, payload.args);
    return appClass ? appClass(options) : null;
  };

  return {
    getApp,
  };
};

module.exports = ApplicationFinder;
