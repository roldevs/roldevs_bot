'use strict';

const R = require('ramda');
const {expect} = require('chai');
const DungeonWorldSolo = require('../../src/apps/dw/application');
const LoaderFile = require('../../src/loader/file');
const TestDice = require('../test_dice');

const language = 'es';
const loader = LoaderFile();

describe('DungeonWorldSolo', () => {
  describe('with wrong app', () => {
    it('returns undefined', () => {
      const dice = TestDice({value: 1});
      const DW = DungeonWorldSolo({dice, loader});
      expect(DW.execute('bb', 'sc')).to.be.undefined;
    });
  });
  describe('with wrong command', () => {
    it('returns undefined', () => {
      const dice = TestDice({value: 1});
      const DW = DungeonWorldSolo({dice, loader});
      expect(DW.execute('dw', 'xx')).to.be.undefined;
    });
  });

  describe('#question', () => {
    const tests = {
      qu: [{
        diceValues: [1, 1],
        answer: 'no',
      }, {
        diceValues: [1, 2],
        answer: 'no',
      }, {
        diceValues: [1, 3],
        answer: 'no',
      }, {
        diceValues: [1, 4],
        answer: 'no',
      }, {
        diceValues: [1, 5],
        answer: 'no',
      }, {
        diceValues: [1, 6],
        answer: 'no',
      }, {
        diceValues: [2, 6],
        answer: 'no',
      }, {
        diceValues: [3, 6],
        answer: 'yes_but',
      }, {
        diceValues: [4, 6],
        answer: 'yes_but',
      }, {
        diceValues: [5, 6],
        answer: 'yes_but',
      }, {
        diceValues: [6, 6],
        answer: 'yes',
      }],
      qn: [{
        diceValues: [1, 1],
        answer: 'no',
      }, {
        diceValues: [1, 2],
        answer: 'no',
      }, {
        diceValues: [1, 3],
        answer: 'no',
      }, {
        diceValues: [1, 4],
        answer: 'no',
      }, {
        diceValues: [1, 5],
        answer: 'no',
      }, {
        diceValues: [1, 6],
        answer: 'yes_but',
      }, {
        diceValues: [2, 6],
        answer: 'yes_but',
      }, {
        diceValues: [3, 6],
        answer: 'yes_but',
      }, {
        diceValues: [4, 6],
        answer: 'yes',
      }, {
        diceValues: [5, 6],
        answer: 'yes',
      }, {
        diceValues: [6, 6],
        answer: 'yes',
      }],
      ql: [{
        diceValues: [1, 1],
        answer: 'no',
      }, {
        diceValues: [1, 2],
        answer: 'no',
      }, {
        diceValues: [1, 3],
        answer: 'no',
      }, {
        diceValues: [1, 4],
        answer: 'yes_but',
      }, {
        diceValues: [1, 5],
        answer: 'yes_but',
      }, {
        diceValues: [1, 6],
        answer: 'yes_but',
      }, {
        diceValues: [2, 6],
        answer: 'yes',
      }, {
        diceValues: [3, 6],
        answer: 'yes',
      }, {
        diceValues: [4, 6],
        answer: 'yes',
      }, {
        diceValues: [5, 6],
        answer: 'yes',
      }, {
        diceValues: [6, 6],
        answer: 'yes',
      }],
    };

    R.forEach((questionType) => {
      describe(`question type: ${questionType}`, () => {
        R.forEach(({diceValues, answer}) => {
          const dice = TestDice({value: diceValues});
          const DW = DungeonWorldSolo({dice, loader});

          it(`returns: ${answer}`, () => {
            const subject = DW.execute({app: 'dw', command: questionType});
            expect(subject[0]).to.eql({
              app: 'dw',
              cmd: questionType,
              key: answer,
              roll: R.sum(diceValues),
            });
          });
          it(`translates: ${answer} to ${language}`, () => {
            expect(DW.translate(language, [{
              app: 'dw',
              cmd: questionType,
              key: answer,
            }])).to.not.be.null;
          });
        }, tests[questionType]);
      });
    }, R.keys(tests));
  });
});
