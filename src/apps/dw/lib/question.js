'use strict';

const R = require('ramda');
const DWReply = require('./reply');

const DWQuestionCommand = ({cmd, addValue}) => ({dice}) => {
  const _reply = DWReply({cmd});
  const _roll = (sides) => R.sum(dice.roll({dices: 2, sides}));
  const _rollWithAdd = (rollValue) => addValue + rollValue;

  const _moreThanTen = R.flip(R.gte)(10);
  const _partialSuccess = (rollQualifyValue) => {
    return rollQualifyValue >= 7 && rollQualifyValue <= 9;
  };
  const _lessThanSix = R.flip(R.lte)(6);

  const pick = () => {
    const rollValue = _roll(6);

    return R.compose(R.flatten, R.cond([
      [_moreThanTen, R.always(_reply.reply('yes', rollValue))],
      [_partialSuccess, R.always(_reply.reply('yes_but', rollValue))],
      [_lessThanSix, R.always(_reply.reply('no', rollValue))],
    ]))(_rollWithAdd(rollValue));
  };

  return {
    cmd,
    pick,
  };
};

module.exports = DWQuestionCommand;
