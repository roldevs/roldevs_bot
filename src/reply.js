'use strict';

const Reply = ({applicationFinder}) => {
  const _replyer = (options) =>
    applicationFinder.getApp(options).repliers[options.system]();
  const reply = (options) => _replyer(options).reply(options);
  const error = (options) => _replyer(options.payload.system).error(options);

  return {
    reply,
    error,
  };
};

module.exports = Reply;
