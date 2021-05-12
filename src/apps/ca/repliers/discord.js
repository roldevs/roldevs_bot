'use strict';

const R = require('ramda');
require('dotenv').config();

const DiscordReply = () => {
  const _description = R.compose(R.defaultTo(''), R.prop('description'));
  const _text = R.prop('text');
  const _message = R.prop('message');
  const _cardsFromPayload = R.compose(
      R.join(','),
      R.defaultTo([]),
      R.view(R.lensPath(['reply', 0, 'roll'])),
  );

  const _header = (payload) => {
    const prefix = process.env.DISCORD_PREFIX;
    const history = _cardsFromPayload(payload);

    return `_${prefix}${payload.app} ${payload.command} ${history}_`;
  };

  const _reply = (reply) => {
    return `> **${_description(reply)}**: ${_text(reply)}\u200B`;
  };

  const reply = (payload) => {
    if (!payload.reply) return;

    const msg = [_header(payload)];
    R.forEach((reply) => msg.push(_reply(reply)), payload.reply);
    payload.message.channel.send(R.join('\n', msg));
  };

  const error = (logger) => {
    if (!logger) return;
    logger.payload.message.channel.send(_message(logger));
  };

  return {
    reply,
    error,
  };
};

module.exports = DiscordReply;
