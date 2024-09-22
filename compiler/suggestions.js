const suggestions = {
    "SyntaxError": {
        severity: "High",
        messages: [
            "Check for missing semicolons or brackets.",
            "Ensure all variables are defined before use.",
            "Verify your function definitions and syntax structure.",
            "Consider using an IDE with syntax highlighting.",
            "Look for misplaced or extra characters."
        ],
        actions: [
            "Review the lines above the error for potential issues.",
            "Run a linter to catch syntax mistakes.",
            "Use online syntax checkers to validate your code."
        ]
    },
    "ReferenceError": {
        severity: "Medium",
        messages: [
            "Check if the variable you are using is defined.",
            "Ensure that you have imported all necessary packages.",
            "Look for typos in variable or function names.",
            "Check the scope of your variables.",
            "Make sure to initialize your variables before use."
        ],
        actions: [
            "Use console.log to trace variable values.",
            "Inspect your import statements for correctness.",
            "Consider wrapping the code in try-catch to handle potential errors gracefully."
        ]
    },
    "TypeError": {
        severity: "Medium",
        messages: [
            "Verify that the value you are working with is of the expected type.",
            "Check for null or undefined values before using them.",
            "Ensure you are using methods appropriate for the data type.",
            "Confirm that you are not trying to access properties of undefined or null."
        ],
        actions: [
            "Add type checks to ensure the correct data type is used.",
            "Use console.log to inspect values before operations.",
            "Utilize TypeScript or JSDoc to enforce type checking."
        ]
    },
    "RangeError": {
        severity: "Low",
        messages: [
            "Ensure you are not exceeding the limits of arrays or collections.",
            "Check for infinite recursion in your functions.",
            "Make sure the values you provide for functions like Array() or String() are within valid ranges."
        ],
        actions: [
            "Review loop conditions to avoid infinite loops.",
            "Limit recursive function depth.",
            "Utilize debugger tools to step through your code."
        ]
    },
    "EvalError": {
        severity: "Medium",
        messages: [
            "Avoid using eval() when possible; it can lead to security risks.",
            "Check the syntax and structure of the evaluated expression."
        ],
        actions: [
            "Refactor your code to eliminate the need for eval().",
            "Consider alternative methods for executing dynamic code."
        ]
    },
    "URIError": {
        severity: "Medium",
        messages: [
            "Ensure that URI functions receive a properly formatted string.",
            "Check for invalid characters in the URI you are trying to process."
        ],
        actions: [
            "Validate your input before passing it to URI-related functions.",
            "Use try-catch to handle exceptions when parsing URIs."
        ]
    },
    "AssertionError": {
        severity: "High",
        messages: [
            "Review the conditions you are asserting.",
            "Make sure your assumptions about the data are correct."
        ],
        actions: [
            "Log the actual values being asserted to understand the mismatch.",
            "Consider adding more detailed assertions to catch specific conditions."
        ]
    },
    "NetworkError": {
        severity: "High",
        messages: [
            "Check your internet connection and ensure the server is reachable.",
            "Inspect your API endpoint URLs for correctness.",
            "Review your authentication tokens and headers."
        ],
        actions: [
            "Use tools like Postman to test API calls independently.",
            "Add retry logic for network requests."
        ]
    },
    // More error types can be added here
};

function getSuggestions(error) {
    const errorType = error.name; // Get the type of the error
    const suggestionDetails = suggestions[errorType];

    if (suggestionDetails) {
        return {
            severity: suggestionDetails.severity,
            messages: suggestionDetails.messages,
            actions: suggestionDetails.actions
        };
    } else {
        return {
            severity: "Unknown",
            messages: ["No suggestions available for this error."],
            actions: []
        };
    }
}

module.exports = getSuggestions;
