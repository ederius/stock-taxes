const { getLosses } = require('../src/services');

describe('Positive losses', () => {
    it('Profit with not losses', () => {
      const profit = 10;
      let losses = 0
      losses = getLosses(profit, losses);
      expect(losses).toBe(0);
    });
  });