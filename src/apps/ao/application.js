'use strict';

const {
  AOQuestionLikelyCommand,
  AOQuestionNormalCommand,
  AOQuestionUnlikelyCommand,
  AOSceneComplicationCommand,
  AOPacingMoveCommand,
  AOSoftMoveCommand,
  AOHardMoveCommand,
  AONPCMoveCommand,
  AOActionQuestionCommand,
  AODescriptionQuestionCommand,
  AOEventFocusCommand,
  AORandomEventCommand,
  AOSceneAlterationCommand,
  AOSocialPositionCommand,
  AONotableFeaturesCommand,
  AOAttitudeCommand,
  AOConversationFocusCommand,
  AOObjetiveCommand,
  AOPlotFocusCommand,
  AOAdversariesCommand,
  AORewardsCommand,
  AONPCCommand,
  AOPlotCommand,
} = require('./commands');
const ApplicationBase = require('../base');
const localeDefinitions = require('./locales');

const ApocalypseOracle = ApplicationBase({
  appName: 'ao',
  localeDefinitions,
  commands: [
    AOQuestionLikelyCommand,
    AOQuestionNormalCommand,
    AOQuestionUnlikelyCommand,
    AOSceneComplicationCommand,
    AOPacingMoveCommand,
    AOSoftMoveCommand,
    AOHardMoveCommand,
    AONPCMoveCommand,
    AOActionQuestionCommand,
    AODescriptionQuestionCommand,
    AOEventFocusCommand,
    AORandomEventCommand,
    AOSceneAlterationCommand,
    AOSceneAlterationCommand,
    AOSocialPositionCommand,
    AONotableFeaturesCommand,
    AOAttitudeCommand,
    AOConversationFocusCommand,
    AOObjetiveCommand,
    AOPlotFocusCommand,
    AOAdversariesCommand,
    AORewardsCommand,
    AONPCCommand,
    AOPlotCommand,
  ],
});

module.exports = ApocalypseOracle;
