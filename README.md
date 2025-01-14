# stock-taxes

Node version required: v23.6.0


execute the program to use as imput a file: node --permission --allow-fs-read=* index.js < ./case1.txt

**Stock Operations Tax Calculator**
===================================

**Overview**
------------

This Node.js application calculates the taxes on stock market operations based on specific rules. It processes input in JSON format, calculates profits, weighted average prices, and taxes, and outputs the results.

**How It Works**
----------------

1.  Accepts input through standard input (stdin) in JSON format.
    
2.  Parses the JSON to extract operations (buy or sell).
    
3.  For each operation:
    
    *   Updates stock and price for buy operations.
        
    *   Calculates profit, loss, and tax for sell operations.
        
4.  Outputs the taxes for each operation.
    

**Project Structure**
---------------------

### **Classes**

#### Operation

Handles individual stock operations.

##### **Constructor**
```javascript
constructor(operation)
```
*   **Parameters**:
    
    *   operation (Object): Contains operation type, unit-cost, and quantity.
        
*   **Attributes**:
    
    *   operation: Operation type (buy or sell).
        
    *   newPrice: Price per unit for the operation.
        
    *   newStock: Quantity of stocks in the operation.
        
    *   totalAmount: Total amount for the operation (newPrice \* newStock).
        
    *   profit: Profit from the operation.
        
    *   tax: Tax for the operation (default: 0.00).
        

##### **Methods**

*   isBuyOperation: Checks if the operation is a buy.
    
*   isSellOperation: Checks if the operation is a sell.
    
*   getFloatFormat(num): Formats a number to 2 decimal places.
    
*   calculateProfit(price): Calculates profit based on the difference between the current price and weighted average price.
    
*   getLoss(loss): Calculates loss after a sell operation.
    
*   getTax(price, loss): Calculates the tax for the operation.
    
*   getWeightedAveragePrice(price, stock): Computes the weighted average price of stocks.
    

### **Functions**

#### processStockOperations(operations)

Processes an array of stock operations and calculates taxes.

*   **Parameters**:
    
    *   operations (Array): List of stock operations in JSON format.
        
*   **Returns**:
    
    *   taxes (Array): Array of tax amounts for each operation.
        

### **Input and Output**

* Input: JSON array of operations passed via standard input. Example:

   ` [ {"operation": "buy", "unit-cost": 10.00, "quantity": 10000}, {"operation": "sell", "unit-cost": 20.00, "quantity": 5000}\]`
    
*  Output: Array of calculated tax values. Example: `[ {"tax": 0.00}, {"tax": 1000.00}\]`
    

**Usage Instructions**
----------------------

1. Install nodeJs in a version equal or greather than `v22.13.0`.

2. Install the npm dependencies running in the root folder `npm i`.

3. Run the Application:
```bash
node index.js
```

4.  **Input Format**:Enter each JSON array of operations line by line. Press Ctrl+D (Linux/macOS) or Ctrl+Z (Windows) to signal the end of input. Other input format is use a file.
    
5.  Example Execution 1:
 ```bash
 node index.js
 Enter stock operations (JSON format) line by line. Press Ctrl+D (Linux/macOS) or Ctrl+Z (Windows) to finish:
 [{"operation": "buy", "unit-cost": 10.00, "quantity": 10000}, {"operation": "sell", "unit-cost": 20.00, "quantity": 5000}\]\[{"tax":0.00},{"tax":1000.00}\]
 ```
 4. Example execution 2:
 ```bash
 node --permission --allow-fs-read=* index.js < input.txt
 Enter stock operations (JSON format) line by line. Press Ctrl+D (Linux/macOS) or Ctrl+Z (Windows) to finish:
 [{"operation": "buy", "unit-cost": 10.00, "quantity": 10000}, {"operation": "sell", "unit-cost": 20.00, "quantity": 5000}\]\[{"tax":0.00},{"tax":1000.00}\]
 ```
 5. To execute the unit tests needs to be run the command `npm test` in the root folder inside the project.   

**Error Handling**
------------------

*   Logs errors if:
    
    *   Input is not valid JSON.
        
    *   Operation type is unsupported.
        
* Exmple:
```bash
Error processing line: Unexpected token
```
    

**Dependencies**
----------------

*   **Node.js**: Ensure you have Node.js installed on your machine in a version equal or greather than `v22.13.0`.
    

**Features**
------------

*   Handles both buy and sell operations.
    
*   Calculates profit, loss, and tax accurately.
    
*   Supports multiple operations in a single input.


