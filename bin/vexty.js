#!/usr/bin/env node

const fs = require('fs');
const lexer = require('../compiler/lexer');
const parser = require('../compiler/parser');
const interpreter = require('../compiler/interpreter');

const fileName = process.argv[2];

fs.readFile(fileName, 'utf8', (err, code) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const tokens = lexer(code);
    const ast = parser(tokens);
    interpreter(ast);
});
