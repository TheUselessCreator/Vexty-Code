function lexer(code) {
    const tokens = [];
    let currentIndex = 0;
    const tokenDefinitions = [
        { regex: /^\s+/, type: null },           // Ignore whitespace
        { regex: /^VAR\b/, type: 'VAR' },        // VAR keyword
        { regex: /^FUNCTION\b/, type: 'FUNCTION' }, // FUNCTION keyword
        { regex: /^RETURN\b/, type: 'RETURN' },  // RETURN keyword
        { regex: /^[a-zA-Z_][a-zA-Z0-9_]*/, type: 'IDENTIFIER' },  // Identifiers (variable names, function names)
        { regex: /^=/, type: 'ASSIGN' },         // Assignment operator
        { regex: /^\+/, type: 'PLUS' },          // Plus operator
        { regex: /^-/, type: 'MINUS' },          // Minus operator
        { regex: /^\*/, type: 'MULTIPLY' },      // Multiply operator
        { regex: /^\//, type: 'DIVIDE' },        // Divide operator
        { regex: /^\d+/, type: 'NUMBER' },       // Numbers
        { regex: /^"[^"]*"/, type: 'STRING' },   // Strings (double quotes)
        { regex: /^'[^']*'/, type: 'STRING' },   // Strings (single quotes)
        { regex: /^\(/, type: 'LPAREN' },        // Left Parenthesis
        { regex: /^\)/, type: 'RPAREN' },        // Right Parenthesis
        { regex: /^\{/, type: 'LBRACE' },        // Left Brace
        { regex: /^\}/, type: 'RBRACE' },        // Right Brace
        { regex: /^;/, type: 'SEMICOLON' },      // Semicolon
        { regex: /^,/, type: 'COMMA' },          // Comma
        { regex: /^==/, type: 'EQUALITY' },      // Equality check
        { regex: /^!=/, type: 'INEQUALITY' },    // Inequality check
        { regex: /^&&/, type: 'AND' },           // Logical AND
        { regex: /^\|\|/, type: 'OR' },          // Logical OR
        { regex: /^!/, type: 'NOT' },            // Logical NOT
        { regex: /^PRINT\b/, type: 'PRINT' },    // PRINT keyword
        { regex: /^true\b|^false\b/, type: 'BOOLEAN' }  // Boolean values
    ];

    const startTime = Date.now();
    const maxLexingTime = 20000; // 20 seconds in milliseconds

    const logToken = (token) => {
        console.log(`Token [${token.type}] => ${token.value}`);
    };

    while (currentIndex < code.length) {
        // Check if the lexing time has exceeded 20 seconds
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime > maxLexingTime) {
            throw new Error("Lexing process exceeded the 20-second limit.");
        }

        let matched = false;

        for (let def of tokenDefinitions) {
            const remainingCode = code.slice(currentIndex);
            const match = remainingCode.match(def.regex);

            if (match && match.index === 0) {
                if (def.type) {
                    const token = { type: def.type, value: match[0] };
                    tokens.push(token);
                    logToken(token);
                }

                currentIndex += match[0].length;
                matched = true;
                break;
            }
        }

        if (!matched) {
            throw new SyntaxError(`Unexpected token at position ${currentIndex}: "${code[currentIndex]}"`);
        }
    }

    return tokens;
}

module.exports = lexer;
