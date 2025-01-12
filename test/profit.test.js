const { getProfit } = require('../src/services');

describe('Profit tests', () => {
    it('Profit with losses', ()=> {
        const newPrice = 10.10
        const price = 20.22
        const newStock = 10
        const profit = getProfit(price, newPrice, newStock)
        expect(profit).toBeCloseTo(-101.20);

      })
})