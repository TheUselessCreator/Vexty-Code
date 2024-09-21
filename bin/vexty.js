#!/usr/bin/env node

require('dotenv').config(); // Load environment variables from .env file

const fs = require('fs');
const path = require('path');
const lexer = require('../compiler/lexer');
const parser = require('../compiler/parser');
const interpreter = require('../compiler/interpreter');

// Helper function for enhanced error logging
function logError(stage, error) {
    console.error(`Error during ${stage}:`);
    console.error(`Message: ${error.message}`);
    if (error.stack) {
        console.error(`Stack trace: ${error.stack}`);
    }
    console.error("Suggestions:");
    if (stage === 'File Reading') {
        console.error("- Ensure the file path is correct.");
        console.error("- Ensure the file has read permissions.");
    } else if (stage === 'Lexing') {
        console.error("- Check for invalid or unsupported characters in the source code.");
    } else if (stage === 'Parsing') {
        console.error("- Verify the syntax of the code is correct.");
        console.error("- Ensure all required tokens are correctly placed.");
    } else if (stage === 'Interpreting') {
        console.error("- Check that all variables and functions are correctly declared and used.");
        console.error("- Ensure there are no invalid operations in the source code.");
    }
}

// Function to center a string based on a specified width
function centerString(str, width) {
    const totalSpaces = Math.max(0, width - str.length);
    const spaces = Math.floor(totalSpaces / 2);
    return ' '.repeat(spaces) + str + ' '.repeat(totalSpaces - spaces);
}

// Function to display the welcome message in a box
function displayWelcomeMessage(file) {
    const border = '------------------------';
    const width = border.length;
    const messageLines = [
        '   Thanks for using    ',
        '        Vexty          ',
        '                       ',
        '    Running File:       ',
        centerString(file, width)
    ];

    console.log(border);
    messageLines.forEach(line => {
        console.log(centerString(line, width));
    });
    console.log(border);
    console.log(); // Add a new line for spacing
}

// Check if a filename is provided
const fileName = process.argv[2];
if (!fileName) {
    console.error("Error: No input file specified.");
    console.error("Usage: vexty <file.vxty>");
    process.exit(1);
}

// Check if the file exists
const filePath = path.resolve(fileName);
if (!fs.existsSync(filePath)) {
    console.error(`Error: File '${fileName}' does not exist.`);
    process.exit(1);
}

// Display the welcome message
displayWelcomeMessage(fileName);

// Read the file contents
fs.readFile(filePath, 'utf8', (err, code) => {
    if (err) {
        logError('File Reading', err);
        process.exit(1);
    }

    try {
        console.log('Lexing the source code...');

        // Perform lexing with a 10-second timeout
        const startTime = Date.now();
        const tokens = lexer(code);

        const lexingTime = Date.now() - startTime;
        if (lexingTime > 10000) { // If it takes more than 10 seconds
            throw new Error("Lexing process exceeded the 10-second limit.");
        }

        console.log('Lexing completed. Tokens:', tokens);

        console.log('Parsing the tokens into an AST...');
        const ast = parser(tokens);
        console.log('Parsing completed. AST:', JSON.stringify(ast, null, 2));

        console.log('Interpreting the AST...');
        const result = interpreter(ast);
        console.log('Interpreting completed. Result:', result);

    } catch (error) {
        if (error instanceof SyntaxError) {
            logError('Parsing', error);
        } else if (error instanceof TypeError) {
            logError('Interpreting', error);
        } else {
            logError('Lexing', error);
        }
        process.exit(1);
    }
});
