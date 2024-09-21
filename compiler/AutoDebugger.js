const fs = require('fs');
const readline = require('readline');

// Function to display the error and get user input for auto-debugging
async function promptUserToFix(errorMessage, code) {
    console.log('AutoDebugger has detected an issue:');
    console.log(errorMessage);
    console.log('\nDebugger can fix this issue.');
    console.log('Type Y to allow the debugger to fix your code: ');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question('> ', (answer) => {
            rl.close();
            resolve(answer.toUpperCase() === 'Y');
        });
    });
}

// Function to apply fixes to the code based on the error type
function fixCode(errorMessage, code) {
    // Basic example of fixing errors; you can expand these rules
    if (errorMessage.includes('Unexpected token')) {
        console.log('Fixing syntax error...');
        // Example of fixing a missing semicolon or similar issues
        return code.replace(/(\w+)\n/g, '$1;\n');
    } else if (errorMessage.includes('ReferenceError')) {
        console.log('Fixing undefined variable...');
        // Example of declaring a missing variable
        const missingVar = errorMessage.split(' ')[1];
        return `let ${missingVar};\n` + code;
    }
    
    // Add more rules for different types of errors here
    
    return code; // Return original code if no specific fix
}

// Function to handle debugging process
async function autoDebugger(code, executeFunction) {
    try {
        console.log('Running code...');
        executeFunction(code);  // This will be the function that runs your code
        
        console.log('Code executed successfully.');
    } catch (error) {
        console.log('Error detected:', error.message);
        
        // Prompt the user if they want to auto-fix the error
        const userConsent = await promptUserToFix(error.message, code);

        if (userConsent) {
            // Fix the code
            const fixedCode = fixCode(error.message, code);
            
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

module.exports = autoDebugger;
