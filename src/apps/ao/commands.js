'use strict';

const R = require('ramda');
const ApocalypseOracleValues = require('./values');

const compact = R.reject(R.isNil);
const roll =(dice, sides) => dice.roll({ dices: 1, sides })[0];

const _pickFormat = R.curry((cmd, key, roll) => {
  return { app: 'ao', cmd, key, roll };
});

const ApocalypseBaseCommand = ({ cmd, diceValues }) => ({ dice }) => {
  const pick = () => {
    const rollValue = roll(dice, diceValues);
    return [_pickFormat(cmd, R.nth(rollValue - 1, ApocalypseOracleValues[cmd]), rollValue)]
  };

  return {
    cmd,
    pick,
  };
};

const ApocalypseQuestionCommand = ({ cmd, minValue }) =>  ({ dice }) => {
  const _isYes = (rollValue) => rollValue >= minValue;

  const pick = () => {
    const rollAnswerValue = roll(dice, 6);
    const rollQualifyValue = roll(dice, 6);

    if (rollQualifyValue !== 1 && rollQualifyValue !== 6) {
      return [_pickFormat(cmd, _isYes(rollAnswerValue) ? 'yes' : 'no', rollAnswerValue)];
    }
    if (rollQualifyValue === 1) {
      return [_pickFormat(cmd, _isYes(rollAnswerValue) ? 'yes_but' : 'no_but', rollAnswerValue)];
    }
    if (rollQualifyValue === 6) {
      return [_pickFormat(cmd, _isYes(rollAnswerValue) ? 'yes_and' : 'no_and', rollAnswerValue)];
    }
  };

  return {
    cmd,
    pick,
  };
};

const ApocalypseQuestionLikelyCommand = ApocalypseQuestionCommand({ cmd: 'ql', minValue: 3 });
const ApocalypseQuestionNormalCommand = ApocalypseQuestionCommand({ cmd: 'qn', minValue: 4 });
const ApocalypseQuestionUnlikelyCommand = ApocalypseQuestionCommand({ cmd: 'qu', minValue: 5 });
const ApocalypseSceneComplicationCommand = ApocalypseBaseCommand({ cmd: 'sc', diceValues: 6 });
const ApocalypsePacingMoveCommand = ApocalypseBaseCommand({ cmd: 'pm', diceValues: 6 });
const ApocalypseSoftMoveCommand = ApocalypseBaseCommand({ cmd: 'sm', diceValues: 6 });
const ApocalypseHardMoveCommand = ApocalypseBaseCommand({ cmd: 'hm', diceValues: 6 });
const ApocalypseNPCMoveCommand = ApocalypseBaseCommand({ cmd: 'nm', diceValues: 6 });
const ApocalypseActionQuestionCommand = ApocalypseBaseCommand({ cmd: 'aq', diceValues: 40 });
const ApocalypseDescriptionQuestionCommand = ApocalypseBaseCommand({ cmd: 'dq', diceValues: 40 });
const ApocalypseEventFocusCommand = ApocalypseBaseCommand({ cmd: 'ef', diceValues: 40 });

const ApocalypseRandomEventCommand = (options) => {
  const cmd = 're';
  const _classes = [ApocalypseEventFocusCommand, ApocalypseActionQuestionCommand];
  const _pickFromClass = (klass) => klass(options).pick();
  const _pickFromClasses = (classes) => R.compose(R.flatten, R.map(_pickFromClass))(classes);

  const pick = () => _pickFromClasses(_classes);

  return {
    cmd,
    pick
  };
};

const ApocalypseSceneAlterationCommand = (options) => {
  const cmd = 'sa';
  const _pickSceneComplication = ApocalypseSceneComplicationCommand(options).pick;
  const _pickRandomEvent = ApocalypseRandomEventCommand(options).pick;
  const _pickPacingMove = ApocalypsePacingMoveCommand(options).pick;

  const pick = () => {
    const rollValue = roll(options.dice, 6);
    let result = [_pickFormat(cmd, R.nth(rollValue - 1, ApocalypseOracleValues.sa), rollValue)];
    if (rollValue === 4) {
      result = R.concat(result, _pickSceneComplication());
    }
    if (rollValue === 5) {
      result = R.concat(result, _pickRandomEvent());
    }
    if (rollValue === 6) {
      result = R.concat(result, _pickPacingMove());
    }
    return result;
  };

  return {
    cmd,
    pick,
  };
};

module.exports = {
  ApocalypseQuestionLikelyCommand,
  ApocalypseQuestionNormalCommand,
  ApocalypseQuestionUnlikelyCommand,
  ApocalypseSceneComplicationCommand,
  ApocalypseSceneAlterationCommand,
  ApocalypsePacingMoveCommand,
  ApocalypseSoftMoveCommand,
  ApocalypseHardMoveCommand,
  ApocalypseNPCMoveCommand,
  ApocalypseActionQuestionCommand,
  ApocalypseDescriptionQuestionCommand,
  ApocalypseEventFocusCommand,
  ApocalypseRandomEventCommand,
};
