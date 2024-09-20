// interpreter.js
function interpret(ast) {
    const env = {};  // Environment for variables

    ast.body.forEach(statement => {
        if (statement.type === 'VariableDeclaration') {
            env[statement.identifier] = statement.value;
        }
    });

    console.log(env);  // Print the current environment (variables)
}

module.exports = interpret;
