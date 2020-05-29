
const R = require('ramda');
const Args = require('../src/discord/args');
const discord = require('discord.js');

// Options
// ** Logger
// ** prefix
// ** token
const Discord = ({logger, broker, prefix, token}) => {
  const client = new discord.Client();
  const args = Args({ prefix });

  const _logInfo = logger.info;

  const _payload = (message) => R.merge({
      system: 'discord',
      sender: client,
      message: message,
  }, args.payload(message.content));

  client.on('ready', () => _logInfo('Discord ready'));

  client.on('message', (message) => {
    if (!args.isDiscord(message.content)) {
      return;
    }

    _logInfo(message.content);
    broker.send(_payload(message));
  });

  const init = () => client.login(token);

  return {
    init: init,
  };
};

module.exports = Discord;
