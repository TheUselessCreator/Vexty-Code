// lexer.js

function lexer(code) {
    const tokens = [];
    let currentIndex = 0;

    // Combined regex patterns to match different types of tokens
    const tokenDefinitions = [
        { regex: /^\s+/, type: null },           // Ignore whitespace
        { regex: /^VAR\b/, type: 'VAR' },        // VAR keyword
        { regex: /^FUNCTION\b/, type: 'FUNCTION' }, // FUNCTION keyword
        { regex: /^RETURN\b/, type: 'RETURN' },  // RETURN keyword
        { regex: /^[a-zA-Z_][a-zA-Z0-9_]*/, type: 'IDENTIFIER' },  // Identifiers
        { regex: /^=/, type: 'ASSIGN' },         // Assignment operator
        { regex: /^\+/, type: 'PLUS' },          // Plus operator
        { regex: /^-/, type: 'MINUS' },          // Minus operator
        { regex: /^\*/, type: 'MULTIPLY' },      // Multiply operator
        { regex: /^\//, type: 'DIVIDE' },        // Divide operator
        { regex: /^\d+\.\d+/, type: 'FLOAT' },   // Floating point numbers
        { regex: /^\d+/, type: 'NUMBER' },       // Integer numbers
        { regex: /^"[^"]*"/, type: 'STRING' },   // Double-quoted strings
        { regex: /^'[^']*'/, type: 'STRING' },   // Single-quoted strings
        { regex: /^\(/, type: 'LPAREN' },        // Left parenthesis
        { regex: /^\)/, type: 'RPAREN' },        // Right parenthesis
        { regex: /^\{/, type: 'LBRACE' },        // Left brace
        { regex: /^\}/, type: 'RBRACE' },        // Right brace
        { regex: /^;/, type: 'SEMICOLON' },      // Semicolon
        { regex: /^,/, type: 'COMMA' },          // Comma
        { regex: /^==/, type: 'EQUALITY' },      // Equality check
        { regex: /^!=/, type: 'INEQUALITY' },    // Inequality check
        { regex: /^<=/, type: 'LESS_EQUAL' },    // Less than or equal
        { regex: /^>=/, type: 'GREATER_EQUAL' }, // Greater than or equal
        { regex: /^&&/, type: 'AND' },           // Logical AND
        { regex: /^\|\|/, type: 'OR' },          // Logical OR
        { regex: /^!/, type: 'NOT' },            // Logical NOT
        { regex: /^#.*$/, type: 'COMMENT' },     // Comments (single line)
    ];

    while (currentIndex < code.length) {
        let matched = false;

        for (const def of tokenDefinitions) {
            const remainingCode = code.slice(currentIndex);
            const match = remainingCode.match(def.regex);

            if (match && match.index === 0) {
                // Only push token if it's not null
                if (def.type) {
                    tokens.push({ type: def.type, value: match[0] });
                }
                currentIndex += match[0].length; // Move current index forward
                matched = true;
                break; // Exit the loop after a match is found
            }
        }

        if (!matched) {
            throw new SyntaxError(`Unexpected token at position ${currentIndex}: "${code[currentIndex]}"`);
        }
    }

    return tokens;
}

module.exports = lexer;
