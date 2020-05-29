'use strict';

const Broker = ({ broker$ }) => {
  const send = broker$;

  return {
    send,
  };
};

module.exports = Broker;
