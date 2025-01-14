
class Operation{
    constructor(operation){
        this.operation = operation.operation;
        this.newPrice = operation["unit-cost"];
        this.newStock = operation.quantity;
        this.totalAmount = this.newPrice * this.newStock;
        this.profit;
        this.tax = 0.00
    }

    get isBuyOperation(){
        if(this.operation == "buy")
            return true
        return false
    }


    get isSellOperation(){
        if(this.operation == "sell")
            return true
        return false
    }

    getFloatFormat(num){
        return parseFloat(num.toFixed(2));
    }


    calculateProfit(price){
        // if the result is greater than 20.0000 is calculated the tax otherwise the tax is zero
        this.profit = this.getFloatFormat((this.newPrice - price) * this.newStock);
    }

    getLoss (loss) {
        let tempLosses = loss;
        if(this.profit <= 0)
            tempLosses = loss-this.profit;
        if(this.totalAmount > 20000){
            if(this.profit <= loss && this.totalAmount > 20000)
                tempLosses = loss - this.profit;
            else
                tempLosses = 0;
        }
        return tempLosses;
    }

    getTax(price, loss) {
        this.calculateProfit(price);
        // if the result is greater than 20.0000 is calculated the tax otherwise the tax is zero
        if(this.totalAmount > 20000 && this.profit - loss > 0){
            this.tax = this.getFloatFormat((this.profit - loss)  *0.20);
        }
    
        return this.tax;
    } 

    getWeightedAveragePrice(price, stock){
        return ((stock * price) +
        (this.newStock * this.newPrice)) / (stock + this.newStock)
    }

}

module.exports = { Operation };