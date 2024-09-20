const parser = require('../compiler/parser');
const lexer = require('../compiler/lexer'); // You might need to tokenize before parsing

describe('Parser Tests', () => {
    test('Parse variable declaration', () => {
        const input = 'VAR x = 10;';
        const tokens = lexer.tokenize(input);
        const ast = parser.parse(tokens);
        expect(ast).toEqual({
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    name: 'x',
                    value: {
                        type: 'Literal',
                        value: 10
                    }
                }
            ]
        });
    });

    test('Parse function declaration', () => {
        const input = 'FUNCTION greet() { PRINT "Hello"; }';
        const tokens = lexer.tokenize(input);
        const ast = parser.parse(tokens);
        expect(ast).toEqual({
            type: 'Program',
            body: [
                {
                    type: 'FunctionDeclaration',
                    name: 'greet',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'PrintStatement',
                                argument: {
                                    type: 'Literal',
                                    value: 'Hello'
                                }
                            }
                        ]
                    }
                }
            ]
        });
    });
});
