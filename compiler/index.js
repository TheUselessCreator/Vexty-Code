// compiler/index.js

const fs = require('fs').promises; // Use promises for file operations
const lexer = require('./lexer');
const parser = require('./parser');
const interpreter = require('./interpreter');
const getSuggestions = require('./suggestions');

// Compile the source code
async function compile(source) {
    try {
        const tokens = lexer.tokenize(source);
        const ast = parser.parse(tokens);
        const output = interpreter.interpret(ast);
        return output;
    } catch (error) {
        handleError(error);
    }
}

// Compile a file and return its output
async function compileFile(filePath) {
    try {
        const source = await fs.readFile(filePath, 'utf8');
        return await compile(source);
    } catch (error) {
        console.error('File Read Error:', error.message);
        throw error;
    }
}

// Install a package and compile its main file
async function installAndCompile(packageName) {
    const packageManager = require('./packageManager');
    
    try {
        await packageManager.installPackage(packageName);
        const packagePath = `./packages/${packageName}.vxty`;
        return await compileFile(packagePath);
    } catch (error) {
        console.error('Package Installation Error:', error.message);
        throw error;
    }
}

// Handle errors with suggestions
function handleError(error) {
    console.error('Compilation Error:', error.message);
    const { severity, messages, actions } = getSuggestions(error);
    console.log(`Severity: ${severity}`);
    
    console.log('Suggestions:');
    messages.forEach(message => console.log(`- ${message}`));
    
    if (actions.length > 0) {
        console.log('Recommended Actions:');
        actions.forEach(action => console.log(`- ${action}`));
    }
}

// Example usage of compiling source code directly
async function runExample() {
    const source = `
        VAR x = 10;
        PRINT(x);
    `;

    console.log('Compiling source code...');
    try {
        const result = await compile(source);
        console.log('Compilation Result:', result);
    } catch (error) {
        console.error('Error during compilation:', error.message);
    }
}

// Run the example if the script is executed directly
if (require.main === module) {
    runExample();
}

module.exports = { compile, compileFile, installAndCompile };
