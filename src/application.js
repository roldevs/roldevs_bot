'use strict';

const R = require('ramda');

const Application = ({applicationFinder}) => {
  const execute = (payload) => {
    return R.merge(
        payload, {
          reply: applicationFinder.getApp(payload).execute(payload),
        },
    );
  };

  return {
    execute,
  };
};

module.exports = Application;
