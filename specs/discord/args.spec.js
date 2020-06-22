const {expect} = require('chai');
const DiscordArgs = require('../../src/discord/args');

describe('DiscordArgs', () => {
  describe('#isDiscord', () => {
    it('if it starts with prefix returns true', () => {
      const args = DiscordArgs({prefix: '+'});
      expect(args.isDiscord('+ao')).to.be.true;
    });

    it('if it does not start with prefix returns false', () => {
      const args = DiscordArgs({prefix: '+'});
      expect(args.isDiscord('ao')).to.be.false;
    });
  });
  describe('#app', () => {
    it('return de app code', () => {
      const args = DiscordArgs({prefix: '+'});
      expect(args.payload('+ao').app).to.eql('ao');
    });
    it('return de app code', () => {
      const args = DiscordArgs({prefix: '-'});
      expect(args.payload('-ao').app).to.eql('ao');
    });
    it('return de app code', () => {
      const args = DiscordArgs({prefix: '+'});
      expect(args.payload('+pepe').app).to.eql('pepe');
    });
    it('return de app code', () => {
      const args = DiscordArgs({prefix: '+'});
      expect(args.payload('+').app).to.eql('');
    });
  });
  describe('#command', () => {
    it('return de op code', () => {
      const args = DiscordArgs({prefix: '+'});
      expect(args.payload('+ao opp').command).to.eql('opp');
    });
    it('return de op code', () => {
      const args = DiscordArgs({prefix: '-'});
      expect(args.payload('-ao opp').command).to.eql('opp');
    });
    it('return de op code', () => {
      const args = DiscordArgs({prefix: '+'});
      expect(args.payload('+pepe opp').command).to.eql('opp');
    });
    it('return de op code', () => {
      const args = DiscordArgs({prefix: '+'});
      expect(args.payload('+ao').command).to.eql(null);
    });
  });
  describe('#args', () => {
    it('return the args', () => {
      const args = DiscordArgs({prefix: '+'});
      expect(args.payload('+ao opp 1').args).to.eql(['1']);
    });
    it('return the args', () => {
      const args = DiscordArgs({prefix: '-'});
      expect(args.payload('-ao opp 1 2').args).to.eql(['1', '2']);
    });
    it('return the args', () => {
      const args = DiscordArgs({prefix: '+'});
      expect(args.payload('+pepe opp 1 2').args).to.eql(['1', '2']);
    });
    it('return the args', () => {
      const args = DiscordArgs({prefix: '+'});
      expect(args.payload('+ao opp').args).to.eql([]);
    });
    it('return the args', () => {
      const args = DiscordArgs({prefix: '+'});
      expect(args.payload('+ao').args).to.eql([]);
    });
  });
});
