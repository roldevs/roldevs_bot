'use strict';

const R = require('ramda');
const AOSceneComplicationCommand = require('./sc');
const AORandomEventCommand = require('./re');
const AOPacingMoveCommand = require('./pm');
const AOOracleValues = require('../values');
const Reply = require('../../reply');

const AOSceneAlterationCommand = (options) => {
  const cmd = 'sa';
  const _roll = (sides) => options.dice.roll({dices: 1, sides})[0];
  const _pickSceneComplication = AOSceneComplicationCommand(options).pick;
  const _pickRandomEvent = AORandomEventCommand(options).pick;
  const _pickPacingMove = AOPacingMoveCommand(options).pick;
  const _pickSceneAlteration =(rollValue) => {
    const key = R.nth(rollValue - 1, AOOracleValues.sa);
    return [Reply('ao').pickFormat({cmd, key, rollValue})];
  };

  const pick = () => {
    return R.cond([
      [R.flip(R.lte)(3), _pickSceneAlteration],
      [R.equals(4), _pickSceneComplication],
      [R.equals(5), _pickRandomEvent],
      [R.equals(6), _pickPacingMove],
    ])(_roll(6));
  };

  return {
    cmd,
    pick,
  };
};

module.exports = AOSceneAlterationCommand;
