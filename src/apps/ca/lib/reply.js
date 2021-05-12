'use strict';

const Reply = require('../../reply');

const CAReply = ({cmd}) => {
  const reply = (key, roll) => [
    Reply('ca').pickFormat({cmd, key, roll}),
  ];

  return {
    reply,
  };
};

module.exports = CAReply;
