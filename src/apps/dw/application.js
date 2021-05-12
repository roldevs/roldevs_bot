'use strict';

const Application = require('../application');
const localeDefinitions = require('./locales');
const CARepliers = require('./repliers');

const DungeonWorldSolo = Application({
  appName: 'dw',
  localeDefinitions,
  CARepliers,
});

module.exports = DungeonWorldSolo;
