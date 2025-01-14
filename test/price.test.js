const { Operation } = require('../src/classes/Operation');

describe('Weighted Average Price', () => {
  it('Rounding decimal price', () => {
    let price = 10;
    const stock = 2;
    const item = {
      "quantity": 4,
      "unit-cost": 20,
      "operation": "sell"
    }
    const operation = new Operation(item);
    price = operation.getWeightedAveragePrice(price, stock);
    expect(price).toBeCloseTo(16.67);
  });
});