// compiler/index.js

const lexer = require('./lexer');
const parser = require('./parser');
const interpreter = require('./interpreter');

function compile(source) {
    try {
        const tokens = lexer.tokenize(source);
        const ast = parser.parse(tokens);
        const output = interpreter.interpret(ast);
        return output;
    } catch (error) {
        console.error('Compilation Error:', error.message);
        throw error; // Re-throw the error after logging it
    }
}

// Extended functionality for handling file input
function compileFile(filePath) {
    const fs = require('fs');
    try {
        const source = fs.readFileSync(filePath, 'utf8');
        return compile(source);
    } catch (error) {
        console.error('File Read Error:', error.message);
        throw error;
    }
}

// Example of adding package management integration
async function installAndCompile(packageName) {
    const packageManager = require('./packageManager');
    
    try {
        await packageManager.installPackage(packageName);
        const packagePath = `./packages/${packageName}.vxty`;
        return compileFile(packagePath);
    } catch (error) {
        console.error('Package Installation Error:', error.message);
        throw error;
    }
}

// Example usage
if (require.main === module) {
    const source = `
        VAR x = 10;
        PRINT(x);
    `;

    console.log('Compiling source code...');
    const result = compile(source);
    console.log('Compilation Result:', result);
}

module.exports = { compile, compileFile, installAndCompile };
