'use strict';

const AOClassesCommand = require('../lib/classes');
const AOEventFocusCommand = require('./ef');
const AOActionQuestionCommand = require('./aq');

const AORandomEventCommand = AOClassesCommand({
  cmd: 're',
  classes: [AOEventFocusCommand, AOActionQuestionCommand],
});

module.exports = AORandomEventCommand;
