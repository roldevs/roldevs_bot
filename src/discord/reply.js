'use strict';

const R = require('ramda');

const DicordReply = () => {
  const _question = R.compose(R.defaultTo(''), R.last, R.prop('args'));
  const _description = R.compose(R.defaultTo(''), R.prop('description'));
  const _text = R.prop('text');
  const _message = R.prop('message');

  const _header = (payload) => `_${_question(payload)}_`;
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

module.exports = DicordReply;
