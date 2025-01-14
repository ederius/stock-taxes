const { Operation } = require('./classes/Operation.js');


const processStockOperations = (operations) => {
     const taxes = []
     let price = 0.00;
     let stock = 0;
     let loss = 0.00;
     // Process each operation
     operations.forEach((item) => {
         let tax = 0.00;
         const operation = new Operation(item);
         // if the operation is buy we need to recalculate the price and stock and the tax is 0.00
         if(operation.isBuyOperation){
            price = operation.getWeightedAveragePrice(price, stock);
            stock += operation.newStock;
         }
         else if(operation.isSellOperation){
            tax = operation.getTax(price, loss);
            loss = operation.getLoss(loss);
            stock -= operation.newStock;
         } else {
             console.error(`The ${operation.operation} operation is not supported.`)
         }
         taxes.push({tax});           
     });
     return taxes;
 }


 const processLines = (lines) => {
    console.log("\n");
    lines.forEach(operations => {
        try {
            // Parse the input line as a JSON array
            const taxes = processStockOperations(operations);
            console.log(taxes);
        } catch (error) {
            console.error(`Error processing the operation: ${error.message}`);
        }
    })
    process.exit(0);
 }

 module.exports = { processStockOperations, processLines };