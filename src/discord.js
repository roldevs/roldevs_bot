
const R = require('ramda');
const Args = require('../src/discord/args');
const discord = require('discord.js');

// Options
// ** Logger
// ** prefix
// ** token
const Discord = ({logger, broker, prefix, token}) => {
  const client = new discord.Client();
  const args = Args({prefix});

  const _payload = (message) => R.merge({
    system: 'discord',
    sender: client,
    message: message,
  }, args.payload(message.content));

  // client.on('ready', () => _logInfo('Discord ready'));

  client.on('message', (message) => {
    if (!args.isDiscord(message.content)) {
      return;
    }
    const payload = _payload(message);

    logger.info(payload, message.content);
    broker.send(payload);
  });

  client.login(token);
  return client;
};

module.exports = Discord;
