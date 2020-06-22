'use strict';

const flyd = require('flyd');
const R = require('ramda');

const Application = ({applicationFinder, broker$, logger}) => {
  const reply$ = flyd.stream();

  const _getApp = applicationFinder.getApp;

  const _getReply = (payload) => _getApp(payload).execute(payload);

  const _mergeReply = (payload) => {
    return R.merge(
        payload, {
          reply: _getApp(payload).execute(payload),
        });
  };

  const _noAppFoundMessage = (payload) =>
    `application not found: '${payload.app}'`;

  const _noCmdFoundMessage = (payload) =>
    `command: '${payload.command}' not found for the app: '${payload.app}'`;

  const _executePayload = (payload) => {
    const logError = logger.error(payload);

    if (!_getApp(payload)) {
      logError(_noAppFoundMessage(payload));
      return;
    }
    if (!_getReply(payload)) {
      logError(_noCmdFoundMessage(payload));
      return;
    }
    reply$(_mergeReply(payload));
  };

  flyd.on(_executePayload, broker$);

  return reply$;
};

module.exports = Application;
