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

    // Method to check if a key exists
    has(key) {
        return key in this._data;
    }

    // Method to get the size of the map
    size() {
        return Object.keys(this._data).length;
    }

    // Method to get all keys
    keys() {
        return Object.keys(this._data);
    }

    // Method to get all values
    values() {
        return Object.values(this._data);
    }

    // Method to map over the entries (returns a new instance)
    map(callback) {
        const newObj = Object.fromEntries(
            Object.entries(this._data).map(([key, value]) => [key, callback(value, key)])
        );
        return new ImmutableMap(newObj);
    }

    // Method to filter the entries (returns a new instance)
    filter(callback) {
        const newObj = Object.fromEntries(
            Object.entries(this._data).filter(([key, value]) => callback(value, key))
        );
        return new ImmutableMap(newObj);
    }

    // Method to merge with another ImmutableMap (returns a new instance)
    merge(otherMap) {
        if (!(otherMap instanceof ImmutableMap)) {
            throw new TypeError('Argument must be an instance of ImmutableMap');
        }
        return new ImmutableMap({ ...this._data, ...otherMap._data });
    }

    // Method to convert to a plain object
    toObject() {
        return { ...this._data }; // Return a copy to prevent mutation
    }

    // Method to create a shallow copy of the map
    clone() {
        return new ImmutableMap(this._data);
    }

    // Method to convert to a string representation
    toString() {
        return JSON.stringify(this._data);
    }
}

// Example Usage
const map = new ImmutableMap({ a: 1, b: 2 });
const newMap = map.set('c', 3);
const filteredMap = map.filter(value => value > 1);
const mappedMap = map.map(value => value * 2);
const mergedMap = map.merge(new ImmutableMap({ b: 3, d: 4 }));

console.log(map.get('a')); // 1
console.log(newMap.get('c')); // 3
console.log(filteredMap.get('b')); // 2
console.log(mappedMap.get('a')); // 2
console.log(mergedMap.get('b')); // 3
console.log(mergedMap.get('d')); // 4
console.log(map.size()); // 2
console.log(map.keys()); // ['a', 'b']
console.log(map.values()); // [1, 2]
console.log(map.toObject()); // { a: 1, b: 2 }
console.log(map.toString()); // '{"a":1,"b":2}'
