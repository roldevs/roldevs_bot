'use strict';

const R = require('ramda');
const AOReply = require('./reply');

const AOQuestionCommand = ({cmd, minValue}) => ({dice}) => {
  const _reply = AOReply({cmd});
  const _roll = (sides) => dice.roll({dices: 1, sides})[0];
  const _isYes = (rollValue) => rollValue >= minValue;
  const _normalValue = (rollQualifyValue) => {
    return rollQualifyValue !== 1 && rollQualifyValue !== 6;
  };

  const _pickValue = (yesKey, noKey) => () => {
    const rollValue = _roll(6);
    const key = _isYes(rollValue) ? yesKey : noKey;
    return _reply(key, rollValue);
  };

  const pick = () => {
    return R.cond([
      [_normalValue, _pickValue('yes', 'no')],
      [R.equals(1), _pickValue('yes_but', 'no_but')],
      [R.equals(6), _pickValue('yes_and', 'no_and')],
    ])(_roll(6));
  };

  return {
    cmd,
    pick,
  };
};

module.exports = AOQuestionCommand;
