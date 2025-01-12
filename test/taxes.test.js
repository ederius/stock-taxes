const { getTax, processStockOperations } = require('../src/services');

describe('Stock Taxes', () => {
  it('Case #1', () => {
    const operations = [{"operation":"buy", "unit-cost":10.00, "quantity": 100},{"operation":"sell", "unit-cost":15.00, "quantity": 50},{"operation":"sell", "unit-cost":15.00, "quantity": 50}];
    taxes = processStockOperations(operations);
    expectedOutput = [{"tax": 0.00},{"tax": 0.00},{"tax": 0.00}];
    expect(taxes).toEqual(expectedOutput);
  });

  it('Case #2', () => {
    const operations = [{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"sell", "unit-cost":20.00, "quantity": 5000},{"operation":"sell", "unit-cost":5.00, "quantity": 5000}];
    taxes = processStockOperations(operations);
    expectedOutput = [{"tax": 0.00},{"tax": 10000.00},{"tax": 0.00}];
    expect(taxes).toEqual(expectedOutput);
  });

  it('Case #3', () => {
    const operations = [{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"sell", "unit-cost":5.00, "quantity": 5000},{"operation":"sell", "unit-cost":20.00, "quantity": 3000}];
    taxes = processStockOperations(operations);
    expectedOutput = [{"tax": 0.00},{"tax": 0.00},{"tax": 1000.00}]
    expect(taxes).toEqual(expectedOutput);
  });

  it('Case #4', () => {
    const operations = [{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"buy", "unit-cost":25.00, "quantity": 5000},{"operation":"sell", "unit-cost":15.00, "quantity": 10000}];
    taxes = processStockOperations(operations);
    expectedOutput = [{"tax": 0.00},{"tax": 0.00},{"tax": 0.00}];
    expect(taxes).toEqual(expectedOutput);
  });

  it('Case #5', () => {
    const operations = [{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"buy", "unit-cost":25.00, "quantity": 5000},{"operation":"sell", "unit-cost":15.00, "quantity": 10000},{"operation":"sell", "unit-cost":25.00, "quantity": 5000}];
    taxes = processStockOperations(operations);
    expectedOutput = [{"tax": 0.00},{"tax": 0.00},{"tax": 0.00},{"tax": 10000.00}];
    expect(taxes).toEqual(expectedOutput);
  });

  it('Case #6', () => {
    const operations = [{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"sell", "unit-cost":2.00, "quantity": 5000},{"operation":"sell", "unit-cost":20.00, "quantity": 2000},{"operation":"sell", "unit-cost":20.00, "quantity": 2000},{"operation":"sell", "unit-cost":25.00, "quantity": 1000}];
    taxes = processStockOperations(operations);
    expectedOutput = [{"tax": 0.00},{"tax": 0.00},{"tax": 0.00},{"tax": 0.00},{"tax": 3000.00}];
    expect(taxes).toEqual(expectedOutput);
  });

  it('Case #7', () => {
    const operations = [{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"sell", "unit-cost":2.00, "quantity": 5000},{"operation":"sell", "unit-cost":20.00, "quantity": 2000},{"operation":"sell", "unit-cost":20.00, "quantity": 2000},{"operation":"sell", "unit-cost":25.00, "quantity": 1000},{"operation":"buy", "unit-cost":20.00, "quantity": 10000},{"operation":"sell", "unit-cost":15.00, "quantity": 5000},{"operation":"sell", "unit-cost":30.00, "quantity": 4350},{"operation":"sell", "unit-cost":30.00, "quantity": 650}];
    taxes = processStockOperations(operations);
    expectedOutput = [{"tax":0.00}, {"tax":0.00}, {"tax":0.00}, {"tax":0.00}, {"tax":3000.00},{"tax":0.00}, {"tax":0.00}, {"tax":3700.00}, {"tax":0.00}];
    expect(taxes).toEqual(expectedOutput);
  });

  it('Case #8', () => {
    const operations = [{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"sell", "unit-cost":50.00, "quantity": 10000},{"operation":"buy", "unit-cost":20.00, "quantity": 10000},{"operation":"sell", "unit-cost":50.00, "quantity": 10000}];
    taxes = processStockOperations(operations);
    expectedOutput = [{"tax":0.00},{"tax":80000.00},{"tax":0.00},{"tax":60000.00}];
    expect(taxes).toEqual(expectedOutput);
  });

  it('Case #9', () => {
    const operations = [{"operation":"buy", "unit-cost": 5000.00, "quantity":10},{"operation":"sell", "unit-cost": 4000.00, "quantity":5},{"operation":"buy", "unit-cost": 15000.00, "quantity":5},{"operation":"buy", "unit-cost": 4000.00, "quantity":2},{"operation":"buy", "unit-cost": 23000.00, "quantity":2},{"operation":"sell", "unit-cost": 20000.00, "quantity":1},{"operation":"sell", "unit-cost": 12000.00, "quantity":10},{"operation":"sell", "unit-cost": 15000.00, "quantity":3}];
    taxes = processStockOperations(operations);
    expectedOutput = [{"tax":0},{"tax":0},{"tax":0},{"tax":0},{"tax":0},{"tax":0},{"tax":1000},{"tax":2400}];
    expect(taxes).toEqual(expectedOutput);
  });

});


describe('Taxes format', () => {
  it('Decimal tax format', ()=> {
    const profit = 100000.10;
    const price = 10000.00
    const stock = 20
    const losses = 20000
    const totalAmount = price*stock;
    tax = getTax(totalAmount, profit, losses);
    expect(tax).toBeCloseTo(16000.02);
  })
})