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
    { regex: /^true\b|^false\b/, type: 'BOOLEAN' },  // Boolean values
    
    // New Tokens
    { regex: /^IF\b/, type: 'IF' },          // IF keyword
    { regex: /^ELSE\b/, type: 'ELSE' },      // ELSE keyword
    { regex: /^WHILE\b/, type: 'WHILE' },    // WHILE keyword
    { regex: /^FOR\b/, type: 'FOR' },        // FOR keyword
    { regex: /^DO\b/, type: 'DO' },          // DO keyword
    { regex: /^SWITCH\b/, type: 'SWITCH' },  // SWITCH keyword
    { regex: /^CASE\b/, type: 'CASE' },      // CASE keyword
    { regex: /^DEFAULT\b/, type: 'DEFAULT' },// DEFAULT keyword
    { regex: /^BREAK\b/, type: 'BREAK' },    // BREAK keyword
    { regex: /^CONTINUE\b/, type: 'CONTINUE' }, // CONTINUE keyword
    { regex: /^CONST\b/, type: 'CONST' },    // CONST keyword
    { regex: /^LET\b/, type: 'LET' },        // LET keyword
    { regex: /^TRY\b/, type: 'TRY' },        // TRY keyword
    { regex: /^CATCH\b/, type: 'CATCH' },    // CATCH keyword
    { regex: /^FINALLY\b/, type: 'FINALLY' },// FINALLY keyword
    { regex: /^THROW\b/, type: 'THROW' },    // THROW keyword
    { regex: /^NEW\b/, type: 'NEW' },        // NEW keyword
    { regex: /^INSTANCEOF\b/, type: 'INSTANCEOF' }, // INSTANCEOF keyword
    { regex: /^TYPEOF\b/, type: 'TYPEOF' },  // TYPEOF keyword
    { regex: /^THIS\b/, type: 'THIS' },      // THIS keyword
    { regex: /^IN\b/, type: 'IN' },          // IN keyword (for iterating)
    { regex: /^DELETE\b/, type: 'DELETE' },  // DELETE keyword
    { regex: /^EXTENDS\b/, type: 'EXTENDS' },// EXTENDS keyword (inheritance)
    { regex: /^SUPER\b/, type: 'SUPER' },    // SUPER keyword
    { regex: /^AWAIT\b/, type: 'AWAIT' },    // AWAIT keyword
    { regex: /^ASYNC\b/, type: 'ASYNC' },    // ASYNC keyword
    { regex: /^IMPORT\b/, type: 'IMPORT' },  // IMPORT keyword
    { regex: /^EXPORT\b/, type: 'EXPORT' },  // EXPORT keyword
    { regex: /^\.\.\./, type: 'SPREAD' },    // Spread operator (...)
    { regex: /^\./, type: 'DOT' },           // Dot operator (.)
    { regex: /^\[/, type: 'LBRACKET' },      // Left Bracket
    { regex: /^\]/, type: 'RBRACKET' },      // Right Bracket
    { regex: /^<\//, type: 'CLOSE_TAG' },    // Closing tag for HTML/XML-like code
    { regex: /^</, type: 'LT' },             // Less than
    { regex: /^>/, type: 'GT' },             // Greater than
    { regex: /^<=/, type: 'LTE' },           // Less than or equal
    { regex: /^>=/, type: 'GTE' },           // Greater than or equal
    { regex: /^\?/, type: 'TERNARY_Q' },     // Ternary question mark
    { regex: /^:/, type: 'TERNARY_COLON' },  // Ternary colon
    { regex: /^MOD\b/, type: 'MOD' }         // MOD keyword
];

module.exports = tokenDefinitions;
