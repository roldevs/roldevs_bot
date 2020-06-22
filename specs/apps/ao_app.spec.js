'use strict';

const R = require('ramda');
const {expect} = require('chai');
const sinon = require('sinon');
const ApocalypseOracle = require('../../src/apps/ao/application');
const ApocalypseOracleValues = require('../../src/apps/ao/values');
const TestDice = require('../test_dice');

const eachIndexed = R.addIndex(R.forEach);
const locale = () => {
  return {
    t: () => () => null,
  };
};
const language = 'es';

describe('ApocalypseOracle', () => {
  describe('with wrong app', () => {
    it('returns undefined', () => {
      const dice = TestDice({value: 1});
      const AO = ApocalypseOracle({dice, locale});
      expect(AO.execute('bb', 'sc')).to.be.undefined;
    });
  });
  describe('with wrong command', () => {
    it('returns undefined', () => {
      const dice = TestDice({value: 1});
      const AO = ApocalypseOracle({dice, locale});
      expect(AO.execute('ao', 'xx')).to.be.undefined;
    });
  });

  describe('#question', () => {
    const types = [{
      cmd: 'qu',
      description: 'unlikely',
      minValue: 4,
    }, {
      cmd: 'qn',
      description: 'normal',
      minValue: 3,
    }, {
      cmd: 'ql',
      description: 'likely',
      minValue: 2,
    }];

    const dice = TestDice({value: 1});
    const AO = ApocalypseOracle({dice, locale});
    const sandbox = sinon.createSandbox();
    const getQualifier = (index) => {
      return index === 0 ? 'no_but' : index === 5 ? 'no_and' : 'no';
    };

    R.forEach((cmdData) => {
      describe(cmdData.description, () => {
        R.times((index) => {
          const answer = index >= cmdData.minValue ? 'yes' : 'no';
          describe(`roll question: ${index + 1}`, () => {
            beforeEach(() => {
              const stub = sandbox.stub(dice, 'roll');
              stub.onCall(0).returns([2]);
              stub.onCall(1).returns([index + 1]);
            });
            afterEach(sandbox.restore);
            it(`returns: ${answer}`, () => {
              const subject = AO.execute({app: 'ao', command: cmdData.cmd});
              expect(subject[0]).to.eql({
                app: 'ao',
                cmd: cmdData.cmd,
                key: answer,
                roll: index + 1,
              });
            });
            it(`translates: ${answer} to ${language}`, () => {
              expect(AO.translate(language, [{
                app: 'ao',
                cmd: cmdData.cmd,
                key: answer,
              }])).to.not.be.null;
            });
          });

          const qualifier = getQualifier(index);
          describe(`roll qualifier: ${index + 1}`, () => {
            beforeEach(() => {
              const stub = sandbox.stub(dice, 'roll');
              stub.onCall(0).returns([index + 1]);
              stub.onCall(1).returns([1]);
            });
            afterEach(sandbox.restore);
            it(`returns: ${qualifier}`, () => {
              const subject = AO.execute({app: 'ao', command: cmdData.cmd});
              expect(subject[0]).to.eql({
                app: 'ao',
                cmd: cmdData.cmd,
                key: qualifier,
                roll: 1,
              });
            });
          });
        }, 6);
      });
    }, types);
  });

  describe('#sceneComplication', () => {
    eachIndexed((value, index) => {
      it(`with ${index + 1} returns ${value}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        const subject = AO.execute({app: 'ao', command: 'sc'});
        expect(subject).to.eql([{
          app: 'ao',
          cmd: 'sc',
          key: value,
          roll: index + 1,
        }]);
      });
      it(`translates: ${value} to ${language}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.translate(language, [{
          app: 'ao',
          cmd: 'sc',
          key: value,
        }])).to.not.be.null;
      });
    }, ApocalypseOracleValues.sc);
  });
  describe('#sceneAlteration', () => {
    const sandbox = sinon.createSandbox();
    eachIndexed((value, index) => {
      it(`with ${index + 1} returns ${value}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        const subject = AO.execute({app: 'ao', command: 'sa'});
        expect(subject[0]).to.eql({
          app: 'ao',
          cmd: 'sa',
          key: value,
          roll: index + 1,
        });
      });
      it(`translates: ${value} to ${language}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.translate(language, [{
          app: 'ao',
          cmd: 'sa',
          key: value,
        }])).to.not.be.null;
      });
    }, ApocalypseOracleValues.sa);

    describe('for a 4 roll', () => {
      const dice = TestDice({value: [1]});
      beforeEach(() => {
        const stub = sandbox.stub(dice, 'roll');
        stub.onCall(0).returns([4]);
        stub.onCall(1).returns([1]);
      });
      it('returns an scene complication', () => {
        const AO = ApocalypseOracle({dice, locale});
        const subject = AO.execute({app: 'ao', command: 'sa'});
        expect(subject).to.eql([
          {app: 'ao', cmd: 'sa', key: ApocalypseOracleValues.sa[3], roll: 4},
          {app: 'ao', cmd: 'sc', key: ApocalypseOracleValues.sc[0], roll: 1},
        ]);
      });
    });

    describe('for a 5 roll', () => {
      const dice = TestDice({value: [1]});
      beforeEach(() => {
        const stub = sandbox.stub(dice, 'roll');
        stub.onCall(0).returns([5]);
        stub.onCall(1).returns([1]);
        stub.onCall(2).returns([1]);
      });
      it('returns an random event', () => {
        const AO = ApocalypseOracle({dice, locale});
        const subject = AO.execute({app: 'ao', command: 'sa'});
        expect(subject).to.eql([
          {app: 'ao', cmd: 'sa', key: ApocalypseOracleValues.sa[4], roll: 5},
          {app: 'ao', cmd: 'ef', key: ApocalypseOracleValues.ef[0], roll: 1},
          {app: 'ao', cmd: 'aq', key: ApocalypseOracleValues.aq[0], roll: 1},
        ]);
      });
    });

    describe('for a 6 roll', () => {
      const dice = TestDice({value: [1]});
      beforeEach(() => {
        const stub = sandbox.stub(dice, 'roll');
        stub.onCall(0).returns([6]);
        stub.onCall(1).returns([1]);
      });
      it('returns a pacing move', () => {
        const AO = ApocalypseOracle({dice, locale});
        const subject = AO.execute({app: 'ao', command: 'sa'});
        expect(subject).to.eql([
          {app: 'ao', cmd: 'sa', key: ApocalypseOracleValues.sa[5], roll: 6},
          {app: 'ao', cmd: 'pm', key: ApocalypseOracleValues.pm[0], roll: 1},
        ]);
      });
    });
  });
  describe('#actionQuestion', () => {
    eachIndexed((value, index) => {
      it(`with ${index + 1} returns ${value}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.execute({app: 'ao', command: 'aq'})).to.eql([
          {app: 'ao', cmd: 'aq', key: value, roll: index + 1},
        ]);
      });
      it(`translates: ${value} to ${language}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.translate(language, [{
          app: 'ao',
          cmd: 'aq',
          key: value,
        }])).to.not.be.null;
      });
    }, ApocalypseOracleValues.aq);
  });
  describe('#pacingMove', () => {
    eachIndexed((value, index) => {
      it(`with ${index + 1} returns ${value}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.execute({app: 'ao', command: 'pm'})).to.eql([
          {app: 'ao', cmd: 'pm', key: value, roll: index + 1},
        ]);
      });
      it(`translates: ${value} to ${language}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.translate(language, [{
          app: 'ao',
          cmd: 'pm',
          key: value,
        }])).to.not.be.null;
      });
    }, ApocalypseOracleValues.pm);
  });
  describe('#softMove', () => {
    eachIndexed((value, index) => {
      it(`with ${index + 1} returns ${value}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.execute({app: 'ao', command: 'sm'})).to.eql([
          {app: 'ao', cmd: 'sm', key: value, roll: index + 1},
        ]);
      });
      it(`translates: ${value} to ${language}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.translate(language, [{
          app: 'ao',
          cmd: 'sm',
          key: value,
        }])).to.not.be.null;
      });
    }, ApocalypseOracleValues.sm);
  });
  describe('#hardMove', () => {
    eachIndexed((value, index) => {
      it(`with ${index + 1} returns ${value}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.execute({app: 'ao', command: 'hm'})).to.eql([
          {app: 'ao', cmd: 'hm', key: value, roll: index + 1},
        ]);
      });
      it(`translates: ${value} to ${language}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.translate(language, [{
          app: 'ao',
          cmd: 'hm',
          key: value,
        }])).to.not.be.null;
      });
    }, ApocalypseOracleValues.hm);
  });
  describe('#npcMove', () => {
    eachIndexed((value, index) => {
      it(`with ${index + 1} returns ${value}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.execute({app: 'ao', command: 'nm'})).to.eql([
          {app: 'ao', cmd: 'nm', key: value, roll: index + 1},
        ]);
      });
      it(`translates: ${value} to ${language}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.translate(language, [{
          app: 'ao',
          cmd: 'nm',
          key: value,
        }])).to.not.be.null;
      });
    }, ApocalypseOracleValues.nm);
  });
  describe('#descriptionQuestion', () => {
    eachIndexed((value, index) => {
      it(`with ${index + 1} returns ${value}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.execute({app: 'ao', command: 'dq'})).to.eql([
          {app: 'ao', cmd: 'dq', key: value, roll: index + 1},
        ]);
      });
      it(`translates: ${value} to ${language}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.translate(language, [{
          app: 'ao',
          cmd: 'dq',
          key: value,
        }])).to.not.be.null;
      });
    }, ApocalypseOracleValues.dq);
  });
  describe('#eventFocus', () => {
    eachIndexed((value, index) => {
      it(`with ${index + 1} returns ${value}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.execute({app: 'ao', command: 'ef'})).to.eql([
          {app: 'ao', cmd: 'ef', key: value, roll: index + 1},
        ]);
      });
      it(`translates: ${value} to ${language}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.translate(language, [{
          app: 'ao',
          cmd: 'ef',
          key: value,
        }])).to.not.be.null;
      });
    }, ApocalypseOracleValues.ef);
  });

  describe('#randomEvent', () => {
    const dice = TestDice({value: 1});
    const sandbox = sinon.createSandbox();

    eachIndexed((efValue, efIndex) => {
      eachIndexed((aqValue, aqIndex) => {
        // eslint-disable-next-line max-len
        describe(`with EventFocus ${efIndex + 1}, ActionQuestion ${aqIndex + 1}`, () => {
          beforeEach(() => {
            const stub = sandbox.stub(dice, 'roll');
            stub.onCall(0).returns([efIndex + 1]);
            stub.onCall(1).returns([aqIndex + 1]);
          });
          afterEach(() => sandbox.restore());

          it(`returns ${efValue}, ${aqValue}`, () => {
            const AO = ApocalypseOracle({dice, locale});
            const subject = AO.execute({app: 'ao', command: 're'});
            expect(subject).to.eql([
              {app: 'ao', cmd: 'ef', key: efValue, roll: efIndex + 1},
              {app: 'ao', cmd: 'aq', key: aqValue, roll: aqIndex + 1},
            ]);
          });
        });
      }, ApocalypseOracleValues.aq);
    }, ApocalypseOracleValues.ef);
  });

  describe('#socialPosition', () => {
    eachIndexed((value, index) => {
      it(`with ${index + 1} returns ${value}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.execute({app: 'ao', command: 'sp'})).to.eql([
          {app: 'ao', cmd: 'sp', key: value, roll: index + 1},
        ]);
      });
      it(`translates: ${value} to ${language}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.translate(language, [{
          app: 'ao',
          cmd: 'sp',
          key: value,
        }])).to.not.be.null;
      });
    }, ApocalypseOracleValues.sp);
  });

  describe('#notableFeatures', () => {
    eachIndexed((value, index) => {
      it(`with ${index + 1} returns ${value}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.execute({app: 'ao', command: 'nf'})).to.eql([
          {app: 'ao', cmd: 'nf', key: value, roll: index + 1},
        ]);
      });
      it(`translates: ${value} to ${language}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.translate(language, [{
          app: 'ao',
          cmd: 'nf',
          key: value,
        }])).to.not.be.null;
      });
    }, ApocalypseOracleValues.nf);
  });

  describe('#attitude', () => {
    eachIndexed((value, index) => {
      it(`with ${index + 1} returns ${value}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.execute({app: 'ao', command: 'at'})).to.eql([
          {app: 'ao', cmd: 'at', key: value, roll: index + 1},
        ]);
      });
      it(`translates: ${value} to ${language}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.translate(language, [{
          app: 'ao',
          cmd: 'at',
          key: value,
        }])).to.not.be.null;
      });
    }, ApocalypseOracleValues.at);
  });

  describe('#conversationFocus', () => {
    eachIndexed((value, index) => {
      it(`with ${index + 1} returns ${value}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.execute({app: 'ao', command: 'cf'})).to.eql([
          {app: 'ao', cmd: 'cf', key: value, roll: index + 1},
        ]);
      });
      it(`translates: ${value} to ${language}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.translate(language, [{
          app: 'ao',
          cmd: 'cf',
          key: value,
        }])).to.not.be.null;
      });
    }, ApocalypseOracleValues.cf);
  });

  describe('#objective', () => {
    eachIndexed((value, index) => {
      it(`with ${index + 1} returns ${value}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.execute({app: 'ao', command: 'ob'})).to.eql([
          {app: 'ao', cmd: 'ob', key: value, roll: index + 1},
        ]);
      });
      it(`translates: ${value} to ${language}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.translate(language, [{
          app: 'ao',
          cmd: 'ob',
          key: value,
        }])).to.not.be.null;
      });
    }, ApocalypseOracleValues.ob);
  });

  describe('#plotFocus', () => {
    eachIndexed((value, index) => {
      it(`with ${index + 1} returns ${value}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.execute({app: 'ao', command: 'pf'})).to.eql([
          {app: 'ao', cmd: 'pf', key: value, roll: index + 1},
        ]);
      });
      it(`translates: ${value} to ${language}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.translate(language, [{
          app: 'ao',
          cmd: 'pf',
          key: value,
        }])).to.not.be.null;
      });
    }, ApocalypseOracleValues.pf);
  });

  describe('#adversaries', () => {
    eachIndexed((value, index) => {
      it(`with ${index + 1} returns ${value}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.execute({app: 'ao', command: 'ad'})).to.eql([
          {app: 'ao', cmd: 'ad', key: value, roll: index + 1},
        ]);
      });
      it(`translates: ${value} to ${language}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.translate(language, [{
          app: 'ao',
          cmd: 'ad',
          key: value,
        }])).to.not.be.null;
      });
    }, ApocalypseOracleValues.ad);
  });

  describe('#rewards', () => {
    eachIndexed((value, index) => {
      it(`with ${index + 1} returns ${value}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.execute({app: 'ao', command: 'rw'})).to.eql([
          {app: 'ao', cmd: 'rw', key: value, roll: index + 1},
        ]);
      });
      it(`translates: ${value} to ${language}`, () => {
        const dice = TestDice({value: [index + 1]});
        const AO = ApocalypseOracle({dice, locale});
        expect(AO.translate(language, [{
          app: 'ao',
          cmd: 'rw',
          key: value,
        }])).to.not.be.null;
      });
    }, ApocalypseOracleValues.rw);
  });
});
