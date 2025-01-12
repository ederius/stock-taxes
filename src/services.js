const {Operation} = require('./Operation')

const getFloatFormat = num => parseFloat(num.toFixed(2));

const getWeightedAveragePrice = (currentPrice, currentStock, newPrice, newStock) => {
    const price = ((currentStock * currentPrice) +
    (newStock * newPrice)) / (currentStock + newStock)
    return getFloatFormat(price)
}


const getProfit = (price, newPrice, newStock) => {
    // if the result is greater than 20.0000 is calculated the tax otherwise the tax is zero
    return getFloatFormat((newPrice - price) * newStock);
}

const getTax = (totalAmount, profit, losses) => {
    let tax = 0.00;
    // if the result is greater than 20.0000 is calculated the tax otherwise the tax is zero
    if(totalAmount > 20000 && profit - losses > 0){
        tax = getFloatFormat((profit - losses)  *0.20);
    }

    return getFloatFormat(tax);
} 

 const getLosses = (profit, losses, totalAmount) => {
    let tempLosses = losses;
    if(profit <= 0)
        tempLosses = losses-profit;
    else if(profit <= losses && totalAmount > 20000)
        tempLosses = losses - profit;
    else if(totalAmount > 20000)
        tempLosses = 0;

    return tempLosses;
}


const processStockOperations = (operations) => {
     const taxes = []
     let price = 0.00;
     let stock = 0;
     let loss = 0.00;
     // Process each operation
     operations.forEach((item) => {
         let tax = 0.00;
         const { operation: type, 'unit-cost': newPrice, quantity: newStock } = item;
         const operation = new Operation(item);
         // if the operation is buy we need to recalculate the price and stock and the tax is 0.00
         if(type == "buy"){
            //  price = getWeightedAveragePrice(price, stock, newPrice, newStock)
            price = operation.getWeightedAveragePrice(price, stock);
            stock += newStock;
         }
         // if the operation is sell nneds to be calculated the totalAmount, in case we have loss the tax is 0.00 and the loss should be calculated 
         else if(type == "sell"){
            //  const totalAmount = newPrice * newStock;
            //  const profit = getProfit(price, newPrice, newStock, losses)
            //  tax = getTax(totalAmount, profit, losses);
            //  losses = getLosses(profit, losses, totalAmount);
            tax = operation.getTax(price, loss);
            loss = operation.getLoss(loss);
            stock -= newStock;
             //console.log(`\n price: ${price}, stock: ${stock}, losses: ${losses}, totalAmount: ${totalAmount}, profit: ${profit}, tax: ${tax} \n`);
         } else {
             console.error(`The ${type} operation is not supported.`)
         }
         console.log(`\n price: ${price}, stock: ${stock}, losses: ${loss}, totalAmount: ${operation.totalAmount}, profit: ${operation.profit}, tax: ${operation.tax} \n`);
         taxes.push({tax});                
     });
     return taxes;
 }

 module.exports = {
    getLosses,
    processStockOperations,
    getTax,
    getWeightedAveragePrice,
    getProfit
 }