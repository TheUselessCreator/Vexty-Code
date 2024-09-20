// errorHandler.js
function throwError(message, token) {
    throw new Error(`Error: ${message} at token: ${JSON.stringify(token)}`);
}

module.exports = throwError;
