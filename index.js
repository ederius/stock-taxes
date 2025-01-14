const readline = require('readline');
// const { processStockOperations, processLines } = require('./src/services.js');
const { Stock } = require("./src/classes/Stock.js");

// Create a readline interface for reading from standard input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
});

const stocks = new Stock();

console.log("Enter stock operations (JSON format) line by line");

rl.on('line', (line) => {    
    if (line.trim() !== '') {
        try{
            // Parse the input line as a JSON array
            stocks.items.push(JSON.parse(line))
        } catch (error) {
            console.error(`Error processing line: ${error.message}`);
        }
    }else{
        // triggered when the lines come from the CLI
        stocks.process();
        process.exit(0);
    }
});

rl.on("close", ()=>{
    // triggered when the input come from a file
    stocks.process();
    process.exit(0);
})


