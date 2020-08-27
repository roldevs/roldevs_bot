'use strict';

const AOClassesCommand = require('../lib/classes');

const AOObjetiveCommand = require('./ob');
const AOPlotFocusCommand = require('./pf');
const AOAdversariesCommand = require('./ad');
const AORewardsCommand = require('./rw');

module.exports = AOClassesCommand({
  cmd: 'plot',
  classes: [
    AOObjetiveCommand,
    AOPlotFocusCommand,
    AOAdversariesCommand,
    AORewardsCommand,
  ],
});
