// assets/tokens.js
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

module.exports = tokenDefinitions;
