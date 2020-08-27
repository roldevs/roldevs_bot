'use strict';

const R = require('ramda');

const ApplicationFinder = ({dice, loader}) => {
  const _applications = loader.load('./src/apps/*/application.js');

  const _isApp = R.equals;
  const _prdicateFindApp = (app) =>
    (klass) => _isApp(app)(klass({dice, loader}).appName);
  const _getApp = (app) => R.find(_prdicateFindApp(app), _applications);

  const getApp = (payload) => {
    const appClass = _getApp(payload.app, payload.command, payload.args);
    return appClass ? appClass({dice, loader}) : null;
  };

  return {
    getApp,
  };
};

module.exports = ApplicationFinder;
