'use strict';

const Reply = require('../../reply');

const AOReply = ({cmd}) => {
  const reply = (key, roll) => [
    Reply('ao').pickFormat({cmd, key, roll}),
  ];

  return {
    reply,
  };
};

module.exports = AOReply;
