// parser.js
function parse(tokens) {
    const ast = { type: 'Program', body: [] };

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (token.type === 'VAR') {
            const varName = tokens[i + 1].value;
            const varValue = tokens[i + 3].value;
            ast.body.push({
                type: 'VariableDeclaration',
                identifier: varName,
                value: parseFloat(varValue),
            });
            i += 3; // Skip tokens processed
        }
    }
    return ast;
}

module.exports = parse;
