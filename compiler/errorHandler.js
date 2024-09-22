const fs = require('fs');

// Custom Error Class to categorize and provide additional context
class CustomError extends Error {
    constructor(type, message, token, codeSnippet, position) {
        super(message);
        this.name = this.constructor.name;
        this.type = type;
        this.token = token;
        this.codeSnippet = codeSnippet; // Small snippet of the code where the error occurred
        this.position = position; // Line and column number
        this.timestamp = new Date().toISOString();
        Error.captureStackTrace(this, this.constructor); // Capture stack trace
    }

    // Display detailed error information
    getErrorDetails() {
        return `
Error Type: ${this.type}
Message: ${this.message}
Token: ${JSON.stringify(this.token)}
Position: Line ${this.position.line}, Column ${this.position.column}
Code Snippet: ${this.codeSnippet}
Timestamp: ${this.timestamp}
Stack Trace: ${this.stack}
`;
    }
}

// Function to log errors to a file
function logErrorToFile(error) {
    const logData = error.getErrorDetails();
    fs.appendFileSync('error.log', logData + '\n', 'utf8');
}

// Function to throw a detailed error
function throwError(type, message, token, code, position = { line: 0, column: 0 }) {
    const codeSnippet = code.split('\n')[position.line] || ''; // Extract line where the error occurred
    const error = new CustomError(type, message, token, codeSnippet, position);

    // Log the error to a file
    logErrorToFile(error);

    // Throw the error
    throw error;
}

module.exports = throwError;
