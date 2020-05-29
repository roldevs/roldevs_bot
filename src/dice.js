'use strict';

const R = require('ramda');

// ** dices
// ** sides
const Dice = (options) => {
  const randomNumber = () => Math.floor(Math.random() * options.sides) + 1;
  const roll = () => R.times(randomNumber, options.dices);

  return {
    roll,
  };
};

module.exports = Dice;
