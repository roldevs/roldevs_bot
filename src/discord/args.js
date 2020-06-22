'use strict';

const R = require('ramda');
const Args = require('../args');

const DicordArgs = ({prefix}) => {
  const _args = Args();

  const _removeFromStart = (size) => (text) => text.substring(size);
  const _startsPrefix = R.startsWith(prefix);
  const _app = R.compose(_removeFromStart(1), R.prop('app'), _args.payload);
  const isDiscord = R.compose(_startsPrefix, R.prop('app'), _args.payload);

  const payload = (message) => {
    return R.merge(_args.payload(message), {app: _app(message)});
  };

  return {
    isDiscord,
    payload,
  };
};

module.exports = DicordArgs;
