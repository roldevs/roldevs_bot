'use strict';

const R = require('ramda');

const Locale = ({language, applicationFinder}) => {
  const translate = (payload) => {
    const translator = applicationFinder.getApp(payload).translate(language);
    const reply = translator(payload.reply);
    return R.set(R.lensProp('reply'), reply, payload);
  };

  return {
    translate,
  };
};

module.exports = Locale;
