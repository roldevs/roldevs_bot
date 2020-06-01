'use strict';

const R = require('ramda');

const DicordReply = () => {
  const _question = R.compose(R.defaultTo(''), R.nth(0), R.prop('args'));
  const _description = R.compose(R.defaultTo(''), R.view(R.lensPath(['reply','description'])));
  const _eachReply = R.compose(R.defaultTo(''), R.prop('key'));
  const _reply = R.compose(R.join(', '), R.map(_eachReply), R.prop('reply'));
  const _rolls = R.compose(R.join(', '), R.map(R.prop('roll')), R.prop('reply'));

  const _message = (payload) => {
    return `${_reply(payload)} (${_rolls(payload)})`;
  };

  const reply = (payload) => {
    if (!payload.reply) {
      return;
    }
    const msg = [];
    msg.push(`**${_description(payload)}:** ${_question(payload)}`);
    R.forEach((reply) => {
      msg.push(`> ${R.prop('cmd', reply)}: ${R.prop('key', reply)}\u200B`);
    }, payload.reply);
    payload.message.channel.send(R.join('\n', msg));
  };

  return {
    reply,
  };
};

module.exports = DicordReply;
