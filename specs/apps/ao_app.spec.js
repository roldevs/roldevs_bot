'use strict';

const R = require('ramda');
const { expect } = require('chai');
const sinon = require('sinon');
const ApocalypseOracle = require('../../src/apps/ao/application');
const ApocalypseOracleValues = require('../../src/apps/ao/values');
const TestDice = require('../test_dice');

const eachIndexed = R.addIndex(R.forEach);
const locale = () => {
  return {
    t: () => () => null,
  }
};

describe('ApocalypseOracle', () => {
  describe('with wrong app', () => {
    it('returns undefined', () => {
      const dice = TestDice({ value: 1 });
      const AO = ApocalypseOracle({ dice, locale });
      expect(AO.execute('bb', 'sc')).to.be.undefined;
    });
  });
  describe('with wrong command', () => {
    it('returns undefined', () => {
      const dice = TestDice({ value: 1 });
      const AO = ApocalypseOracle({ dice, locale });
      expect(AO.execute('ao', 'xx')).to.be.undefined;
    });
  });

  describe('#question', () => {
    const dice = TestDice({ value: 1 });
    const AO = ApocalypseOracle({ dice, locale });
    const sandbox = sinon.createSandbox();
    describe('#unlikely', () => {
      R.times((index) => {
        const answer = index >= 4 ? 'yes' : 'no'
        describe(`roll question: ${index + 1}`, () => {
          beforeEach(() => {
            const stub = sandbox.stub(dice, 'roll');
            stub.onCall(0).returns([index + 1]);
            stub.onCall(1).returns([2]);
          });
          afterEach(sandbox.restore);
          it(`returns: ${answer}`, () => {
            const subject = AO.execute({ app: 'ao', command: 'qu' });
            expect(subject[0]).to.eql({ app: 'ao', cmd: 'qu', key: answer, roll: index + 1 });
          });
        });

        const qualifier = index === 0 ? 'no_but' : index === 5 ? 'no_and' : 'no';
        describe(`roll qualifier: ${index + 1}`, () => {
          beforeEach(() => {
            const stub = sandbox.stub(dice, 'roll');
            stub.onCall(0).returns([1]);
            stub.onCall(1).returns([index + 1]);
          });
          afterEach(sandbox.restore);
          it(`returns: ${qualifier}`, () => {
            const subject = AO.execute({ app: 'ao', command: 'qu' });
            expect(subject[0]).to.eql({ app: 'ao', cmd: 'qu', key: qualifier, roll: 1 });
          });
        });
      }, 6);
    });

    describe('#normal', () => {
      R.times((index) => {
        const answer = index >= 3 ? 'yes' : 'no'
        describe(`roll question: ${index + 1}`, () => {
          beforeEach(() => {
            const stub = sandbox.stub(dice, 'roll');
            stub.onCall(0).returns([index + 1]);
            stub.onCall(1).returns([2]);
          });
          afterEach(sandbox.restore);
          it(`returns: ${answer}`, () => {
            const subject = AO.execute({ app: 'ao', command: 'qn' });
            expect(subject[0]).to.eql({ app: 'ao', cmd: 'qn', key: answer, roll: index + 1 });
          });
        });

        const qualifier = index === 0 ? 'no_but' : index === 5 ? 'no_and' : 'no';
        describe(`roll qualifier: ${index + 1}`, () => {
          beforeEach(() => {
            const stub = sandbox.stub(dice, 'roll');
            stub.onCall(0).returns([1]);
            stub.onCall(1).returns([index + 1]);
          });
          afterEach(sandbox.restore);
          it(`returns: ${qualifier}`, () => {
            const subject = AO.execute({ app: 'ao', command: 'qn' });
            expect(subject[0]).to.eql({ app: 'ao', cmd: 'qn', key: qualifier, roll: 1 });
          });
        });
      }, 6);
    });

    describe('#likely', () => {
      R.times((index) => {
        const answer = index >= 2 ? 'yes' : 'no'
        describe(`roll question: ${index + 1}`, () => {
          beforeEach(() => {
            const stub = sandbox.stub(dice, 'roll');
            stub.onCall(0).returns([index + 1]);
            stub.onCall(1).returns([2]);
          });
          afterEach(sandbox.restore);
          it(`returns: ${answer}`, () => {
            const subject = AO.execute({ app: 'ao', command: 'ql' });
            expect(subject[0]).to.eql({ app: 'ao', cmd: 'ql', key: answer, roll: index + 1 });
          });
        });

        const qualifier = index === 0 ? 'no_but' : index === 5 ? 'no_and' : 'no';
        describe(`roll qualifier: ${index + 1}`, () => {
          beforeEach(() => {
            const stub = sandbox.stub(dice, 'roll');
            stub.onCall(0).returns([1]);
            stub.onCall(1).returns([index + 1]);
          });
          afterEach(sandbox.restore);
          it(`returns: ${qualifier}`, () => {
            const subject = AO.execute({ app: 'ao', command: 'ql' });
            expect(subject[0]).to.eql({ app: 'ao', cmd: 'ql', key: qualifier, roll: 1 });
          });
        });
      }, 6);
    });
  });

  describe('#sceneComplication', () => {
    eachIndexed((value, index) => {
      it(`with ${index + 1} returns ${value}`, () => {
        const dice = TestDice({ value: [index + 1] });
        const AO = ApocalypseOracle({ dice, locale });
        const subject = AO.execute({ app: 'ao', command: 'sc' });
        expect(subject).to.eql([{ app: 'ao', cmd: 'sc', key: value, roll: index + 1 }]);
      });
    }, ApocalypseOracleValues.sc);
  });
  describe('#sceneAlteration', () => {
    const sandbox = sinon.createSandbox();
    eachIndexed((value, index) => {
      it(`with ${index + 1} returns ${value}`, () => {
        const dice = TestDice({ value: [index + 1] });
        const AO = ApocalypseOracle({ dice, locale });
        const subject = AO.execute({ app: 'ao', command: 'sa' });
        expect(subject[0]).to.eql({ app: 'ao', cmd: 'sa', key: value, roll: index + 1 });
      });
    }, ApocalypseOracleValues.sa);

    describe('for a 4 roll', () => {
      const dice = TestDice({ value: [1] });
      beforeEach(() => {
        const stub = sandbox.stub(dice, 'roll');
        stub.onCall(0).returns([4]);
        stub.onCall(1).returns([1]);
      });
      it('returns an scene complication', () => {
        const AO = ApocalypseOracle({ dice, locale });
        const subject = AO.execute({ app: 'ao', command: 'sa' });
        expect(subject).to.eql([
          { app: 'ao', cmd: 'sa', key: ApocalypseOracleValues.sa[3], roll: 4 },
          { app: 'ao', cmd: 'sc', key: ApocalypseOracleValues.sc[0], roll: 1 },
        ])
      });
    });

    describe('for a 5 roll', () => {
      const dice = TestDice({ value: [1] });
      beforeEach(() => {
        const stub = sandbox.stub(dice, 'roll');
        stub.onCall(0).returns([5]);
        stub.onCall(1).returns([1]);
        stub.onCall(2).returns([1]);
      });
      it('returns an random event', () => {
        const AO = ApocalypseOracle({ dice, locale });
        const subject = AO.execute({ app: 'ao', command: 'sa' });
        expect(subject).to.eql([
          { app: 'ao', cmd: 'sa', key: ApocalypseOracleValues.sa[4], roll: 5 },
          { app: 'ao', cmd: 'ef', key: ApocalypseOracleValues.ef[0], roll: 1 },
          { app: 'ao', cmd: 'aq', key: ApocalypseOracleValues.aq[0], roll: 1 },
        ]);
      });
    });

    describe('for a 6 roll', () => {
      const dice = TestDice({ value: [1] });
      beforeEach(() => {
        const stub = sandbox.stub(dice, 'roll');
        stub.onCall(0).returns([6]);
        stub.onCall(1).returns([1]);
      });
      it('returns a pacing move', () => {
        const AO = ApocalypseOracle({ dice, locale });
        const subject = AO.execute({ app: 'ao', command: 'sa' });
        expect(subject).to.eql([
          { app: 'ao', cmd: 'sa', key: ApocalypseOracleValues.sa[5], roll: 6 },
          { app: 'ao', cmd: 'pm', key: ApocalypseOracleValues.pm[0], roll: 1 },
        ]);
      });
    });
  });
  describe('#actionQuestion', () => {
    eachIndexed((value, index) => {
      it(`with ${index + 1} returns ${value}`, () => {
        const dice = TestDice({ value: [index + 1] });
        const AO = ApocalypseOracle({ dice, locale });
        expect(AO.execute({ app: 'ao', command: 'aq' })).to.eql([
          { app: 'ao', cmd: 'aq', key: value, roll: index + 1 },
        ]);
      });
    }, ApocalypseOracleValues.aq);
  });
  describe('#pacingMove', () => {
    eachIndexed((value, index) => {
      it(`with ${index + 1} returns ${value}`, () => {
        const dice = TestDice({ value: [index + 1] });
        const AO = ApocalypseOracle({ dice, locale });
        expect(AO.execute({ app: 'ao', command: 'pm' })).to.eql([
          { app: 'ao', cmd: 'pm', key: value, roll: index + 1 },
        ]);
      });
    }, ApocalypseOracleValues.pm);
  });
  describe('#softMove', () => {
    eachIndexed((value, index) => {
      it(`with ${index + 1} returns ${value}`, () => {
        const dice = TestDice({ value: [index + 1] });
        const AO = ApocalypseOracle({ dice, locale });
        expect(AO.execute({ app: 'ao', command: 'sm' })).to.eql([
          { app: 'ao', cmd: 'sm', key: value, roll: index + 1 },
        ]);
      });
    }, ApocalypseOracleValues.sm);
  });
  describe('#hardMove', () => {
    eachIndexed((value, index) => {
      it(`with ${index + 1} returns ${value}`, () => {
        const dice = TestDice({ value: [index + 1] });
        const AO = ApocalypseOracle({ dice, locale });
        expect(AO.execute({ app: 'ao', command: 'hm' })).to.eql([
          { app: 'ao', cmd: 'hm', key: value, roll: index + 1 },
        ]);
      });
    }, ApocalypseOracleValues.hm);
  });
  describe('#npcMove', () => {
    eachIndexed((value, index) => {
      it(`with ${index + 1} returns ${value}`, () => {
        const dice = TestDice({ value: [index + 1] });
        const AO = ApocalypseOracle({ dice, locale });
        expect(AO.execute({ app: 'ao', command: 'nm' })).to.eql([
          { app: 'ao', cmd: 'nm', key: value, roll: index + 1 },
        ]);
      });
    }, ApocalypseOracleValues.nm);
  });
  describe('#descriptionQuestion', () => {
    eachIndexed((value, index) => {
      it(`with ${index + 1} returns ${value}`, () => {
        const dice = TestDice({ value: [index + 1] });
        const AO = ApocalypseOracle({ dice, locale });
        expect(AO.execute({ app: 'ao', command: 'dq' })).to.eql([
          { app: 'ao', cmd: 'dq', key: value, roll: index + 1 },
        ]);
      });
    }, ApocalypseOracleValues.dq);
  });
  describe('#eventFocus', () => {
    eachIndexed((value, index) => {
      it(`with ${index + 1} returns ${value}`, () => {
        const dice = TestDice({ value: [index + 1] });
        const AO = ApocalypseOracle({ dice, locale });
        expect(AO.execute({ app: 'ao', command: 'ef' })).to.eql([
          { app: 'ao', cmd: 'ef', key: value, roll: index + 1 },
        ]);
      });
    }, ApocalypseOracleValues.ef);
  });

  describe('#randomEvent', () => {
    const dice = TestDice({ value: 1 });
    const sandbox = sinon.createSandbox();

    eachIndexed((efValue, efIndex) => {
      eachIndexed((aqValue, aqIndex) => {
        describe(`with EventFocus ${efIndex + 1} and ActionQuestion ${aqIndex + 1}`, () => {
          beforeEach(() => {
            const stub = sandbox.stub(dice, 'roll');
            stub.onCall(0).returns([efIndex + 1]);
            stub.onCall(1).returns([aqIndex + 1]);
          });
          afterEach(() => sandbox.restore());

          it(`returns ${efValue}, ${aqValue}`, () => {
            const AO = ApocalypseOracle({ dice, locale });
            const subject = AO.execute({ app: 'ao', command: 're' })
            expect(subject).to.eql([
              { app: 'ao', cmd: 'ef', key: efValue, roll: efIndex + 1 },
              { app: 'ao', cmd: 'aq', key: aqValue, roll: aqIndex + 1 },
            ]);
          });
        });
      }, ApocalypseOracleValues.aq);
    }, ApocalypseOracleValues.ef);
  });
});
