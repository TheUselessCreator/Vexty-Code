const tokenDefinitions = require('./assets/tokens');
const userTypes = require('./assets/UserTypes');  // Import user-defined types

function lexer(code) {
    const tokens = [];
    let currentIndex = 0;

    const startTime = Date.now();
    const maxLexingTime = 20000; // 20 seconds in milliseconds

    // Error recovery: keep track of errors
    let errors = [];

    // Token logging for debugging purposes
    const logToken = (token) => {
        console.log(`Token [${token.type}] => ${token.value}`);
    };

    // Utility function to advance through the code based on a regex match
    function advanceRegex(regex) {
        const match = code.slice(currentIndex).match(regex);
        if (match && match.index === 0) {
            currentIndex += match[0].length;
            return match[0];
        }
        return null;
    }

    // Utility function to check if a word matches any user-defined types
    function checkUserType(word) {
        return userTypes.includes(word) ? word : null;
    }

    // Main lexing loop
    while (currentIndex < code.length) {
        // Check if lexing has exceeded the time limit
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime > maxLexingTime) {
            throw new Error("Lexing process exceeded the 20-second limit.");
        }

        let matched = false;

        // Iterate over the token definitions dynamically
        for (let def of tokenDefinitions) {
            const match = advanceRegex(def.regex);
            if (match) {
                if (def.type) {
                    const token = { type: def.type, value: match };
                    tokens.push(token);
                    logToken(token);  // Log matched token
                }
                matched = true;
                break;
            }
        }

        // If no predefined tokens match, check for user-defined types
        if (!matched) {
            // Extract the next word to see if it's a user-defined type
            const nextWordMatch = code.slice(currentIndex).match(/[a-zA-Z_]\w*/);
            if (nextWordMatch) {
                const nextWord = nextWordMatch[0];
                const userType = checkUserType(nextWord);
                if (userType) {
                    const token = { type: 'USER_TYPE', value: userType };
                    tokens.push(token);
                    logToken(token);  // Log matched user-defined type
                    currentIndex += nextWord.length;
                    matched = true;
                }
            }
        }

        // If still no match, handle unexpected tokens
        if (!matched) {
            const errorChar = code[currentIndex];
            errors.push(`Unexpected token at position ${currentIndex}: "${errorChar}"`);
            currentIndex++;  // Skip the unknown character
        }
    }

    // Report any errors encountered during lexing
    if (errors.length > 0) {
        console.warn("Lexing completed with errors:", errors);
    }

    return tokens;
}

module.exports = lexer;
