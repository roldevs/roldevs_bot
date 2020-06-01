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

const ApocalypseOracle = ApplicationBase({
  appName: 'ao',
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
