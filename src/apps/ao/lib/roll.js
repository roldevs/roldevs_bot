'use strict';

const R = require('ramda');
const AOOracleValues = require('../values');
const AOReply = require('./reply');

const AORollCommand = ({cmd, diceSides}) => ({dice}) => {
  const _reply = AOReply({cmd});
  const _roll = () => dice.roll({dices: 1, sides: diceSides})[0];

  const pick = () => {
    const rollValue = _roll();
    const key = R.nth(rollValue - 1, AOOracleValues[cmd]);
    return _reply(key, rollValue);
  };

  return {
    cmd,
    pick,
  };
};


module.exports = AORollCommand;
