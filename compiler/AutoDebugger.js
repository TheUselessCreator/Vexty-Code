const fs = require('fs');
const readline = require('readline');
const { execSync } = require('child_process');

// Function to display the error and get user input for auto-debugging
async function promptUserToFix(errorMessage, suggestions, code) {
    console.log('AutoDebugger detected an issue:');
    console.log(errorMessage);

    console.log('\nSuggested fixes:');
    suggestions.forEach((suggestion, idx) => {
        console.log(`[${idx + 1}] ${suggestion.description}`);
    });

    console.log('\nType the number of the suggestion to apply or N to skip: ');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question('> ', (answer) => {
            rl.close();
            const selectedIdx = parseInt(answer, 10) - 1;
            if (answer.toUpperCase() === 'N' || isNaN(selectedIdx)) {
                resolve(null);
            } else {
                resolve(suggestions[selectedIdx].fix);
            }
        });
    });
}

// Function to classify and suggest fixes for the error
function classifyError(errorMessage, code) {
    let suggestions = [];

    if (errorMessage.includes('Unexpected token')) {
        suggestions.push({
            description: 'Possible missing semicolon or syntax issue.',
            fix: () => code.replace(/(\w+)\n/g, '$1;\n')
        });
    }

    if (errorMessage.includes('ReferenceError')) {
        const missingVar = errorMessage.split(' ')[1];
        suggestions.push({
            description: `Declare the missing variable "${missingVar}".`,
            fix: () => `let ${missingVar};\n` + code
        });
    }

    if (errorMessage.includes('TypeError')) {
        suggestions.push({
            description: 'Check for null or undefined variable references.',
            fix: () => code.replace(/(\w+)\.(\w+)/g, (match, varName, propName) => {
                return `(typeof ${varName} !== 'undefined' ? ${varName}.${propName} : undefined)`;
            })
        });
    }

    // Add more classification rules here

    return suggestions;
}

// Function to log the debugging process to a file
function logErrorHistory(errorMessage, code, suggestions) {
    const logData = {
        error: errorMessage,
        code: code,
        suggestions: suggestions.map(s => s.description),
        timestamp: new Date().toISOString()
    };
    fs.appendFileSync('debug.log', JSON.stringify(logData, null, 2) + '\n', 'utf8');
}

// Function to handle debugging process
async function autoDebugger(code, executeFunction) {
    try {
        console.log('Running code...');
        executeFunction(code);

        console.log('Code executed successfully.');
    } catch (error) {
        console.log('Error detected:', error.message);

        const suggestions = classifyError(error.message, code);
        logErrorHistory(error.message, code, suggestions);

        // Prompt user to choose a fix
        const chosenFix = await promptUserToFix(error.message, suggestions, code);

        if (chosenFix) {
            // Apply the fix
            const fixedCode = chosenFix();
            
            // Display fixed code in the terminal
            console.log('\nAutoDebugger has fixed your code:');
            console.log(fixedCode);

            // Optionally, save the fixed code to a file
            fs.writeFileSync('fixedCode.js', fixedCode, 'utf8');
            console.log('Fixed code has been saved to fixedCode.js');

            // Re-run the fixed code
            console.log('\nRe-running fixed code...\n');
            try {
                executeFunction(fixedCode);
            } catch (err) {
                console.log('Error in fixed code:', err.message);
            }
        } else {
            console.log('No changes were made to the code.');
        }
    }
}

// Function to statically analyze code using a linter (e.g., ESLint)
function lintCode(code) {
    try {
        execSync('eslint --fix file.js', { stdio: 'inherit' });
        console.log('Linting complete. Code formatted.');
    } catch (err) {
        console.log('Linting failed:', err.message);
    }
}

module.exports = { autoDebugger, lintCode };
