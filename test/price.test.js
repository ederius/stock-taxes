const { getWeightedAveragePrice } = require('../src/services');

describe('Weighted Average Price', () => {
  it('Rounding decimal prices', () => {
    const currentPrice = 10;
    const currentStock = 2;
    const newPrice = 20;
    const newStock = 4;
    const price = getWeightedAveragePrice(currentPrice, currentStock, newPrice, newStock);
    expect(price).toBeCloseTo(16.67);
  });
});