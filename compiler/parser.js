// parser.js
const userTypes = require('../assets/userTypes');

function parse(tokens) {
    let index = 0;
    const ast = { type: 'Program', body: [] };

    function parseVariableDeclaration() {
        const varName = tokens[index + 1].value;
        let varValue;

        if (tokens[index + 3].type === 'NUMBER') {
            varValue = parseFloat(tokens[index + 3].value);
        } else if (tokens[index + 3].type === 'STRING') {
            varValue = tokens[index + 3].value;
        }

        ast.body.push({
            type: 'VariableDeclaration',
            identifier: varName,
            value: varValue,
        });

        index += 4; // Skip tokens processed
    }

    function parseFunctionDeclaration() {
        const funcName = tokens[index + 1].value;
        index += 3; // Skip "function name ("

        const params = [];
        while (tokens[index].type !== 'RPAREN') {
            params.push(tokens[index].value);
            index++;
            if (tokens[index].type === 'COMMA') index++; // Skip comma
        }

        index++; // Skip ')'
        const body = parseBlockStatement();

        ast.body.push({
            type: 'FunctionDeclaration',
            identifier: funcName,
            params,
            body,
        });
    }

    function parseBlockStatement() {
        const body = [];
        index++; // Skip '{'
        while (tokens[index].type !== 'RBRACE') {
            const statement = parseStatement();
            if (statement) {
                body.push(statement);
            }
        }
        index++; // Skip '}'
        return body;
    }

    function parseStatement() {
        const token = tokens[index];
        switch (token.type) {
            case 'VAR':
                return parseVariableDeclaration();
            case 'FUNCTION':
                return parseFunctionDeclaration();
            case 'TYPE':
                return parseTypeDeclaration();
            default:
                throw new Error(`Unknown statement at token ${token.value}`);
        }
    }

    function parseTypeDeclaration() {
        const typeName = tokens[index + 1].value;
        index += 3; // Skip "type name {"

        const fields = [];
        while (tokens[index].type !== 'RBRACE') {
            const fieldName = tokens[index].value;
            index++;
            const fieldType = tokens[index].value;
            index++;
            fields.push({ name: fieldName, type: fieldType });
        }

        userTypes.defineType(typeName, fields);
        index++; // Skip '}'

        return {
            type: 'TypeDeclaration',
            name: typeName,
            fields,
        };
    }

    while (index < tokens.length) {
        const statement = parseStatement();
        if (statement) {
            ast.body.push(statement);
        }
    }

    return ast;
}

// Advanced Error Handling
function logError(stage, error) {
    console.error(`Error during ${stage}: ${error.message}`);
    if (error.stack) {
        console.error(error.stack);
    }
}

// Enhanced Parsing with Error Handling and Recovery
function enhancedParse(tokens) {
    try {
        return parse(tokens);
    } catch (error) {
        logError('Parsing', error);
        process.exit(1); // Handle fatal error
    }
}

module.exports = enhancedParse;
