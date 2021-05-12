'use strict';

const Application = require('../application');
const localeDefinitions = require('./locales');
const AORepliers = require('./repliers');

const ApocalypseOracle = Application({
  appName: 'ao',
  localeDefinitions,
  repliers: AORepliers,
});

module.exports = ApocalypseOracle;
