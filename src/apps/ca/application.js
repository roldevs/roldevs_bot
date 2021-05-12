'use strict';

const Application = require('../application');
const localeDefinitions = require('./locales');
const CARepliers = require('./repliers');

const CuentoAnimas = Application({
  appName: 'ca',
  localeDefinitions,
  repliers: CARepliers,
});

module.exports = CuentoAnimas;
