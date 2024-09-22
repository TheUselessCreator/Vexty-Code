// assets/userTypes.js

class UserDefinedType {
    constructor(name, fields) {
        this.name = name;
        this.fields = fields;
    }

    // Method to create a new instance of the type
    createInstance(data) {
        const instance = {};
        for (const field of this.fields) {
            if (data[field.name] !== undefined) {
                instance[field.name] = data[field.name];
            } else {
                throw new Error(`Missing field: ${field.name} for type ${this.name}`);
            }
        }
        return instance;
    }
}

// Registry to hold user-defined types
const userTypeRegistry = {};

// Function to define a new user-defined type
function defineType(name, fields) {
    if (userTypeRegistry[name]) {
        throw new Error(`Type ${name} is already defined.`);
    }
    userTypeRegistry[name] = new UserDefinedType(name, fields);
}

// Function to get a user-defined type by name
function getType(name) {
    return userTypeRegistry[name];
}

// Export the define and get functions
module.exports = {
    defineType,
    getType,
};
