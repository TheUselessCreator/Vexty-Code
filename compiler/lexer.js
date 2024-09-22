const tokenDefinitions = require('./assets/tokens');

function lexer(code) {
    const tokens = [];
    let currentIndex = 0;

    const startTime = Date.now();
    const maxLexingTime = 20000; // 20 seconds in milliseconds

    // Error recovery: keep track of errors
    let errors = [];

    const logToken = (token) => {
        console.log(`Token [${token.type}] => ${token.value}`);
    };

    function advanceRegex(regex) {
        const match = code.slice(currentIndex).match(regex);
        if (match && match.index === 0) {
            currentIndex += match[0].length;
            return match[0];
        }
        return null;
    }

    while (currentIndex < code.length) {
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime > maxLexingTime) {
            throw new Error("Lexing process exceeded the 20-second limit.");
        }

        let matched = false;

        // Iterate over the token definitions dynamically from the external file
        for (let def of tokenDefinitions) {
            const match = advanceRegex(def.regex);
            if (match) {
                if (def.type) {
                    const token = { type: def.type, value: match };
                    tokens.push(token);
                    logToken(token);
                }
                matched = true;
                break;
            }
        }

        if (!matched) {
            // Handle unexpected tokens
            const errorChar = code[currentIndex];
            errors.push(`Unexpected token at position ${currentIndex}: "${errorChar}"`);
            currentIndex++;  // Skip the unknown character
        }
    }

    // Report errors if any
    if (errors.length > 0) {
        console.warn("Lexing completed with errors:", errors);
    }

    return tokens;
}

module.exports = lexer;
