const { Operation } = require("./Operation");

class Stock {
    #price
    #loss
    #taxes
    #stock
    constructor(){
        this.#stock = 0;
        this.#price = 0.00;
        this.#loss = 0.00;
        this.#taxes = [];
        this.items=[];
    }

    get taxes(){
        return this.#taxes;
    }


   processStockOperations = (operations) => {
        // Process each operation
        operations.forEach((item) => {
            let tax = 0.00;
            const operation = new Operation(item);
            // if the operation is buy we need to recalculate the price and stock and the tax is 0.00
            if(operation.isBuyOperation){
                this.#price = operation.getWeightedAveragePrice(this.#price, this.#stock);
                this.#stock += operation.newStock;
            }
            else if(operation.isSellOperation){
                tax = operation.calculateTax(this.#price, this.#loss);
                this.#loss = operation.calculateLoss(this.#loss);
                this.#stock -= operation.newStock;
            } else {
                console.error(`The ${operation.operation} operation is not supported.`)
            }
            this.#taxes.push({tax});   
        });
    }

    process = () => {
        console.log("\n");
        this.items.forEach(operations => {
            try {
                // Parse the input line as a JSON array
                this.processStockOperations(operations);
                console.log(this.#taxes);
            } catch (error) {
                console.error(error);
                console.error(`Error processing the operation: ${error.message}`);
            }
        })

        return this;
    }



}


module.exports = {
    Stock
}