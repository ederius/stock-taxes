const readline = require('readline');
const { processStockOperations, processLines } = require('./src/services.js');

// Create a readline interface for reading from standard input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
});

const lines = [];

//console.log("Enter stock operations (JSON format) line by line. Press Ctrl+D (Linux/macOS) or Ctrl+Z (Windows) to finish:");

rl.on('line', (line) => {    
    if (line.trim() !== '') {
        try{            
            lines.push(JSON.parse(line))
        } catch (error) {
            console.error(`Error processing line: ${error.message}`);
        }
    }else{
        // triggered when the lines come from the CLI
        processLines(lines);

    }
});

rl.on("close", ()=>{
    // triggered when the input con from a file
    processLines(lines);
})


