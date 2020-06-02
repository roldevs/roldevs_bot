'use strict';

const R = require('ramda');
const {
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
} = require('./commands');
const ApplicationBase = require('../base');
const localeDefinitions = require('./locales');

const ApocalypseOracle = ApplicationBase({
  appName: 'ao',
  localeDefinitions,
  commands: [
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
  ],
});

module.exports = ApocalypseOracle;
