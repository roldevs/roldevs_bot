'use strict';

const R = require('ramda');

const Reply = (appName) => {
  const pickFormat = R.curry(({cmd, key, roll}) => {
    return {app: appName, cmd, key, roll};
  });

  return {
    pickFormat,
  };
};

module.exports = Reply;
