const { Operation } = require('../src/classes/Operation');

describe('Positive losses', () => {
    it('Profit with not losses', () => {
      let loss = 0
      const item = {
        "quantity": 10,
        "unit-cost": 30.10,
        "operation": "sell"
      }
      const operation = new Operation(item);
      loss = operation.getLoss(loss);
      expect(loss).toBe(0);
    });
  });