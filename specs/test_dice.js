'use strict';

const R = require('ramda');

// ** dices
// ** sides
const TestDice = ({ value }) => {
  const roll = () => value;

  return {
    roll,
  };
};

module.exports = TestDice;
