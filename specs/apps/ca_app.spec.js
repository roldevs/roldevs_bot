'use strict';

const R = require('ramda');
const {expect} = require('chai');
const CAApp = require('../../src/apps/ca/application');
const LoaderFile = require('../../src/loader/file');
const TestDice = require('../test_dice');
const CAPlayedCards = require('../../src/apps/ca/lib/cards/played');
const CAPickCardCommand = require('../../src/apps/ca/commands/pc');

// const language = 'es';
const loader = LoaderFile();
const _countingCards = (card) => R.compose(R.length, R.filter(R.equals(card)));
const _roll = R.prop('roll');

describe('CuentoAnimas', () => {
  describe('with wrong app', () => {
    it('returns undefined', () => {
      const dice = TestDice({value: 1});
      const DW = CAApp({dice, loader});
      expect(DW.execute('bb', 'sc')).to.be.undefined;
    });
  });
  describe('with wrong command', () => {
    it('returns undefined', () => {
      const dice = TestDice({value: 1});
      const DW = CAApp({dice, loader});
      expect(DW.execute('dw', 'xx')).to.be.undefined;
    });
  });
});

describe('Cards', () => {
  describe('generation', () => {
    it('generates a radom deck', () => {
      let cards = [];

      do {
        cards = CAPlayedCards({playedString: cards.join(',')}).nextCards();
      } while (cards.length < 19);

      expect(cards.length).to.eql(19);

      // Were are the gray ladies
      expect(R.nth(6, cards)).to.eql('d');
      expect(R.nth(13, cards)).to.eql('d');
      expect(R.nth(18, cards)).to.eql('d');

      // Count elements
      expect(_countingCards('r')(cards)).to.eql(4);
      expect(_countingCards('p')(cards)).to.eql(4);
      expect(_countingCards('o4')(cards)).to.eql(1);
      expect(_countingCards('o5')(cards)).to.eql(1);
      expect(_countingCards('o6')(cards)).to.eql(1);
      expect(_countingCards('o7')(cards)).to.eql(1);
      expect(_countingCards('e4')(cards)).to.eql(1);
      expect(_countingCards('e5')(cards)).to.eql(1);
      expect(_countingCards('e6')(cards)).to.eql(1);
      expect(_countingCards('e7')(cards)).to.eql(1);
    });
  });
});

describe('CAPickCardCommand', () => {
  describe('with bad args', () => {
    describe('with unexitant cards', () => {
      it('ignores previous cards', () => {
        const command = CAPickCardCommand({args: ['pepe']});
        const reply = command.pick()[0];
        expect(_roll(reply)).to.have.lengthOf(1);
        expect(_roll(reply)).to.not.contain('pepe');
      });
    });

    describe('with spaces', () => {
      it('ignores in spaces', () => {
        const command = CAPickCardCommand({args: ['pepe,,']});
        const reply = command.pick()[0];
        expect(_roll(reply)).to.have.lengthOf(1);
        expect(_roll(reply)).to.not.contain('pepe');
      });
      it('ignores previous spaces', () => {
        const command = CAPickCardCommand({args: [',,pepe']});
        const reply = command.pick()[0];
        expect(_roll(reply)).to.have.lengthOf(1);
        expect(_roll(reply)).to.not.contain('pepe');
      });
      it('ignores card in spaces', () => {
        const command = CAPickCardCommand({args: ['p, r, p , r']});
        const reply = command.pick()[0];
        expect(_roll(reply)).to.have.lengthOf(5);
        expect(_roll(reply)[0]).to.eql('p');
        expect(_roll(reply)[1]).to.eql('r');
        expect(_roll(reply)[2]).to.eql('p');
        expect(_roll(reply)[3]).to.eql('r');
      });
      it('ignores card in spaces', () => {
        const command = CAPickCardCommand({args: ['r, o6']});
        const reply = command.pick()[0];
        expect(_roll(reply)).to.have.lengthOf(3);
        expect(_roll(reply)[0]).to.eql('r');
        expect(_roll(reply)[5]).to.eql('o6');
      });
    });
  });
});
