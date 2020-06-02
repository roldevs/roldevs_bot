'use strict';

// ** dices
// ** sides
const TestDice = ({value}) => {
  const roll = () => value;

  return {
    roll,
  };
};

module.exports = TestDice;
