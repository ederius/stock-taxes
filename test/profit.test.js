const { Operation } = require('../src/classes/Operation');

describe('Profit tests', () => {
    it('Profit with losses', ()=> {
      const item = {
        "quantity": 10,
        "unit-cost": 10.10,
        "operation": "sell"
      }
      const price = 20.22;
      const operation = new Operation(item);
      operation.calculateProfit(price);
      expect(operation.profit).toBeCloseTo(-101.20);

    })
})