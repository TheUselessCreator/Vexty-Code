// compiler/suggestions.js

const suggestions = {
    "SyntaxError": {
        severity: "High",
        messages: [
            "Check for missing semicolons or brackets.",
            "Ensure all variables are defined before use.",
            "Verify your function definitions and syntax structure.",
            "Consider using an IDE with syntax highlighting."
        ],
        actions: [
            "Review the lines above the error for potential issues.",
            "Run a linter to catch syntax mistakes."
        ]
    },
    "ReferenceError": {
        severity: "Medium",
        messages: [
            "Check if the variable you are using is defined.",
            "Ensure that you have imported all necessary packages.",
            "Look for typos in variable or function names.",
            "Check the scope of your variables."
        ],
        actions: [
            "Use console.log to trace variable values.",
            "Inspect your import statements for correctness."
        ]
    },
    "TypeError": {
        severity: "Medium",
        messages: [
            "Verify that the value you are working with is of the expected type.",
            "Check for null or undefined values before using them.",
            "Ensure you are using methods appropriate for the data type."
        ],
        actions: [
            "Add type checks to ensure the correct data type is used.",
            "Use console.log to inspect values before operations."
        ]
    },
    "RangeError": {
        severity: "Low",
        messages: [
            "Ensure you are not exceeding the limits of arrays or collections.",
            "Check for infinite recursion in your functions."
        ],
        actions: [
            "Review loop conditions to avoid infinite loops.",
            "Limit recursive function depth."
        ]
    },
    // Add more error types and suggestions as needed
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
