const readline = require('node:readline');
const { processStockOperations} = require('./src/services')

// Create a readline interface for reading from standard input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
});

console.log("Enter stock operations (JSON format) line by line. Press Ctrl+D (Linux/macOS) or Ctrl+Z (Windows) to finish:");

rl.on('line', (line) => {
    if (line.trim() !== '') {
        try {
            // Parse the input line as a JSON array
            const operations = JSON.parse(line);
            const taxes = processStockOperations(operations);
            console.log(taxes);
        } catch (error) {
            console.error(error)
            console.error(`Error processing line: ${error.message}`);
        }
    }
});


