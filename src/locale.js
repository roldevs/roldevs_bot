'use strict';

const R = require('ramda');

const Locale = ({language, applicationFinder}) => {
  const translate = (payload) => {
    return R.set(
        R.lensProp('reply'),
        applicationFinder.getApp(payload).translate(language, payload.reply),
        payload,
    );
  };

  return {
    translate,
  };
};

module.exports = Locale;
