const { Operation } = require('../src/classes/Operation');
const { Stock } = require('../src/classes/Stock')

describe('Stock Taxes', () => {
  it('Case #1', () => {
    const stock = new Stock();
    stock.items.push([{"operation":"buy", "unit-cost":10.00, "quantity": 100},{"operation":"sell", "unit-cost":15.00, "quantity": 50},{"operation":"sell", "unit-cost":15.00, "quantity": 50}]);
    const input = stock.process().taxes;
    const expectedOutput = [{"tax": 0.00},{"tax": 0.00},{"tax": 0.00}];
    expect(input).toEqual(expectedOutput);
  });

  it('Case #2', () => {
    const stock = new Stock();
    stock.items.push([{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"sell", "unit-cost":20.00, "quantity": 5000},{"operation":"sell", "unit-cost":5.00, "quantity": 5000}]);
    const input = stock.process().taxes;
    const expectedOutput = [{"tax": 0.00},{"tax": 10000.00},{"tax": 0.00}];
    expect(input).toEqual(expectedOutput);
  });

  it('Case #3', () => {
    const stock = new Stock();
    stock.items.push([{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"sell", "unit-cost":5.00, "quantity": 5000},{"operation":"sell", "unit-cost":20.00, "quantity": 3000}]);
    const input = stock.process().taxes;
    const expectedOutput = [{"tax": 0.00},{"tax": 0.00},{"tax": 1000.00}]
    expect(input).toEqual(expectedOutput);
  });

  it('Case #4', () => {
    const stock = new Stock();
    stock.items.push([{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"buy", "unit-cost":25.00, "quantity": 5000},{"operation":"sell", "unit-cost":15.00, "quantity": 10000}]);
    const input = stock.process().taxes;
    const expectedOutput = [{"tax": 0.00},{"tax": 0.00},{"tax": 0.00}];
    expect(input).toEqual(expectedOutput);
  });

  it('Case #5', () => {
    const stock = new Stock();
    stock.items.push([{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"buy", "unit-cost":25.00, "quantity": 5000},{"operation":"sell", "unit-cost":15.00, "quantity": 10000},{"operation":"sell", "unit-cost":25.00, "quantity": 5000}]);
    const input = stock.process().taxes;
    const expectedOutput = [{"tax": 0.00},{"tax": 0.00},{"tax": 0.00},{"tax": 10000.00}];
    expect(input).toEqual(expectedOutput);
  });

  it('Case #6', () => {
    const stock = new Stock();
    stock.items.push([{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"sell", "unit-cost":2.00, "quantity": 5000},{"operation":"sell", "unit-cost":20.00, "quantity": 2000},{"operation":"sell", "unit-cost":20.00, "quantity": 2000},{"operation":"sell", "unit-cost":25.00, "quantity": 1000}]);
    const input = stock.process().taxes;
    const expectedOutput = [{"tax": 0.00},{"tax": 0.00},{"tax": 0.00},{"tax": 0.00},{"tax": 3000.00}];
    expect(input).toEqual(expectedOutput);
  });

  it('Case #7', () => {
    const stock = new Stock();
    stock.items.push([{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"sell", "unit-cost":2.00, "quantity": 5000},{"operation":"sell", "unit-cost":20.00, "quantity": 2000},{"operation":"sell", "unit-cost":20.00, "quantity": 2000},{"operation":"sell", "unit-cost":25.00, "quantity": 1000},{"operation":"buy", "unit-cost":20.00, "quantity": 10000},{"operation":"sell", "unit-cost":15.00, "quantity": 5000},{"operation":"sell", "unit-cost":30.00, "quantity": 4350},{"operation":"sell", "unit-cost":30.00, "quantity": 650}]);
    const input = stock.process().taxes;
    const expectedOutput = [{"tax":0.00}, {"tax":0.00}, {"tax":0.00}, {"tax":0.00}, {"tax":3000.00},{"tax":0.00}, {"tax":0.00}, {"tax":3700.00}, {"tax":0.00}];
    expect(input).toEqual(expectedOutput);
  });

  it('Case #8', () => {
    const stock = new Stock();
    stock.items.push([{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"sell", "unit-cost":50.00, "quantity": 10000},{"operation":"buy", "unit-cost":20.00, "quantity": 10000},{"operation":"sell", "unit-cost":50.00, "quantity": 10000}]);
    const input = stock.process().taxes;
    const expectedOutput = [{"tax":0.00},{"tax":80000.00},{"tax":0.00},{"tax":60000.00}];
    expect(input).toEqual(expectedOutput);
  });

  it('Case #9', () => {
    const stock = new Stock();
    stock.items.push([{"operation":"buy", "unit-cost": 5000.00, "quantity":10},{"operation":"sell", "unit-cost": 4000.00, "quantity":5},{"operation":"buy", "unit-cost": 15000.00, "quantity":5},{"operation":"buy", "unit-cost": 4000.00, "quantity":2},{"operation":"buy", "unit-cost": 23000.00, "quantity":2},{"operation":"sell", "unit-cost": 20000.00, "quantity":1},{"operation":"sell", "unit-cost": 12000.00, "quantity":10},{"operation":"sell", "unit-cost": 15000.00, "quantity":3}]);
    const input = stock.process().taxes;
    const expectedOutput = [{"tax":0},{"tax":0},{"tax":0},{"tax":0},{"tax":0},{"tax":0},{"tax":1000},{"tax":2400}];
    expect(input).toEqual(expectedOutput);
  });

});


describe('Taxes format', () => {
  it('Decimal tax format', ()=> {
    const item = {
      "quantity": 4,
      "unit-cost": 10000.13,
      "operation": "sell"
    }
    const profit = 100000.10;
    const price = 100.56
    const stock = 20
    const loss = 0
    const operation = new Operation(item);

    tax = operation.calculateTax(price, loss)
    expect(tax).toBeCloseTo(7919.66);
  })
})