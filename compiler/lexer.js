// lexer.js
function lexer(code) {
    const tokens = [];
    const tokenDefinitions = [
        { regex: /\s+/, type: null }, // Ignore whitespace
        { regex: /VAR/, type: 'VAR' },
        { regex: /FUNCTION/, type: 'FUNCTION' },
        { regex: /RETURN/, type: 'RETURN' },
        { regex: /\w+/, type: 'IDENTIFIER' },  // Identifiers (variable names, function names)
        { regex: /=/, type: 'ASSIGN' },
        { regex: /\+/, type: 'PLUS' },
        { regex: /-/, type: 'MINUS' },
        { regex: /\d+/, type: 'NUMBER' },      // Numbers
        { regex: /"[^"]*"/, type: 'STRING' },  // Strings
        // Add more tokens here (e.g., (), {}, operators)
    ];
    
    while (code.length > 0) {
        for (let def of tokenDefinitions) {
            const match = code.match(def.regex);
            if (match && match.index === 0) {
                if (def.type) {
                    tokens.push({ type: def.type, value: match[0] });
                }
                code = code.slice(match[0].length);
                break;
            }
        }
    }
    return tokens;
}

module.exports = lexer;
