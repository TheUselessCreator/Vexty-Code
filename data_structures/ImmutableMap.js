class ImmutableMap {
    constructor(obj) {
        this._data = { ...obj }; // Store a copy of the object
    }

    // Method to get value by key
    get(key) {
        return this._data[key];
    }

    // Method to set a new value (returns a new instance)
    set(key, value) {
        return new ImmutableMap({ ...this._data, [key]: value });
    }

    // Method to delete a key (returns a new instance)
    delete(key) {
        const { [key]: _, ...rest } = this._data;
        return new ImmutableMap(rest);
    }
}

// Example Usage
const map = new ImmutableMap({ a: 1, b: 2 });
const newMap = map.set('c', 3);
console.log(map.get('a')); // 1
console.log(newMap.get('c')); // 3
