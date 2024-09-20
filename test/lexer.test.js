const lexer = require('../compiler/lexer'); // Adjust the path as needed

describe('Lexer Tests', () => {
    test('Tokenize simple variable declaration', () => {
        const input = 'VAR x = 10;';
        const tokens = lexer.tokenize(input);
        expect(tokens).toEqual([
            { type: 'VAR', value: 'VAR' },
            { type: 'IDENTIFIER', value: 'x' },
            { type: 'EQUALS', value: '=' },
            { type: 'NUMBER', value: '10' },
            { type: 'SEMICOLON', value: ';' }
        ]);
    });

    test('Tokenize function declaration', () => {
        const input = 'FUNCTION greet() { PRINT "Hello"; }';
        const tokens = lexer.tokenize(input);
        expect(tokens).toEqual([
            { type: 'FUNCTION', value: 'FUNCTION' },
            { type: 'IDENTIFIER', value: 'greet' },
            { type: 'LPAREN', value: '(' },
            { type: 'RPAREN', value: ')' },
            { type: 'LBRACE', value: '{' },
            { type: 'PRINT', value: 'PRINT' },
            { type: 'STRING', value: 'Hello' },
            { type: 'SEMICOLON', value: ';' },
            { type: 'RBRACE', value: '}' }
        ]);
    });
});
