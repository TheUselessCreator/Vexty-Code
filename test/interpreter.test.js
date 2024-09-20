const interpreter = require('../compiler/interpreter');
const parser = require('../compiler/parser');
const lexer = require('../compiler/lexer');

describe('Interpreter Tests', () => {
    test('Evaluate variable declaration', () => {
        const input = 'VAR x = 10;';
        const tokens = lexer.tokenize(input);
        const ast = parser.parse(tokens);
        const result = interpreter.evaluate(ast);
        expect(result).toEqual({ x: 10 });
    });

    test('Evaluate simple function call', () => {
        const input = `
            FUNCTION greet() { PRINT "Hello"; }
            greet();
        `;
        const tokens = lexer.tokenize(input);
        const ast = parser.parse(tokens);
        const result = interpreter.evaluate(ast);
        expect(result).toContain('Hello');
    });

    test('Evaluate arithmetic operation', () => {
        const input = 'VAR sum = 5 + 3;';
        const tokens = lexer.tokenize(input);
        const ast = parser.parse(tokens);
        const result = interpreter.evaluate(ast);
        expect(result).toEqual({ sum: 8 });
    });
});
