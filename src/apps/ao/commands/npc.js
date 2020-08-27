'use strict';

const AOClassesCommand = require('../lib/classes');
const AOSocialPositionCommand = require('./sp');
const AONotableFeaturesCommand = require('./nf');
const AOAttitudeCommand = require('./at');
const AOConversationFocusCommand = require('./cf');


module.exports = AOClassesCommand({
  cmd: 'npc',
  classes: [
    AOSocialPositionCommand,
    AONotableFeaturesCommand,
    AOAttitudeCommand,
    AOConversationFocusCommand,
  ],
});
