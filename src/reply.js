'use strict';

const DiscordReply = require('./discord/reply');

const Reply = () => {
  const _systemReply = {
    discord: DiscordReply,
  };

  const _replyer = (system) => _systemReply[system]();
  const reply = (options) => _replyer(options.system).reply(options);

  return {
    reply,
  };
};

module.exports = Reply;
