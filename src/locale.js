'use strict';

const R = require('ramda');

const Locale = ({ language }) => (definitions) => {
  const t = (payload) => (key) => {
    return R.view(R.lensPath([language, payload.command, key]), definitions);
  };

  return {
    t,
  };
};

module.exports = Locale;
