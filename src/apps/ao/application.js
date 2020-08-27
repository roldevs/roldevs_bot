'use strict';

const Application = require('../application');
const localeDefinitions = require('./locales');

const ApocalypseOracle = Application({
  appName: 'ao',
  localeDefinitions,
});

module.exports = ApocalypseOracle;
