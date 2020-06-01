'use strict';

const R = require('ramda');

// ** dices
// ** sides
const Dice = () => {
  const _randomNumber = (sides) => () => Math.floor(Math.random() * sides) + 1;
  const roll = ({ dices, sides }) => R.times(_randomNumber(sides), dices);

  return {
    roll,
  };
};

module.exports = Dice;
