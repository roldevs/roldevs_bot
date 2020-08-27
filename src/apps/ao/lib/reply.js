'use strict';

const Reply = require('../../reply');

const AOReply = ({cmd}) => {
  const reply = (key, rollValue) => [
    Reply('ao').pickFormat({cmd, key, rollValue}),
  ];

  return {
    reply,
  };
};

module.exports = AOReply;
