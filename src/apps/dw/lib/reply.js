'use strict';

const R = require('ramda');
const Reply = require('../../reply');

const DWReply = ({cmd}) => {
  const reply = R.curry((key, roll) => [
    Reply('dw').pickFormat({cmd, key, roll}),
  ]);

  return {
    reply,
  };
};

module.exports = DWReply;
