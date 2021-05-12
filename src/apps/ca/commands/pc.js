'use strict';

const R = require('ramda');
const CAReply = require('../lib/reply');
const CAPlayedCards = require('../lib/cards/played');

const CAPickCardCommand = ({args}) => {
  const cmd = 'pc';
  const _reply = CAReply({cmd});

  const pick = () => {
    const playedString = R.head(args);
    const cards = CAPlayedCards({playedString}).nextCards();
    return _reply.reply(R.last(cards), cards);
  };

  return {
    cmd,
    pick,
  };
};

module.exports = CAPickCardCommand;
