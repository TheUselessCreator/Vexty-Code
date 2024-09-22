class ImmutableList {
    constructor(elements) {
        this._elements = [...elements]; // Store a copy of the array
    }

    // Method to get elements
    getElements() {
        return [...this._elements]; // Return a copy to prevent mutation
    }

    // Method to add an element (returns a new instance)
    add(element) {
        return new ImmutableList([...this._elements, element]);
    }

    // Method to remove an element (returns a new instance)
    remove(element) {
        return new ImmutableList(this._elements.filter(el => el !== element));
    }

    // Method to insert an element at a specified index (returns a new instance)
    insert(index, element) {
        if (index < 0 || index > this._elements.length) {
            throw new RangeError('Index out of bounds');
        }
        return new ImmutableList([
            ...this._elements.slice(0, index),
            element,
            ...this._elements.slice(index)
        ]);
    }

    // Method to map over the elements (returns a new instance)
    map(callback) {
        return new ImmutableList(this._elements.map(callback));
    }

    // Method to filter the elements (returns a new instance)
    filter(callback) {
        return new ImmutableList(this._elements.filter(callback));
    }

    // Method to find an element (returns the element or undefined)
    find(callback) {
        return this._elements.find(callback);
    }

    // Method to get the size of the list
    size() {
        return this._elements.length;
    }

    // Method to check if the list contains an element
    contains(element) {
        return this._elements.includes(element);
    }

    // Method to concatenate another list (returns a new instance)
    concat(otherList) {
        if (!(otherList instanceof ImmutableList)) {
            throw new TypeError('Argument must be an instance of ImmutableList');
        }
        return new ImmutableList([...this._elements, ...otherList.getElements()]);
    }

    // Method to create a shallow copy of the list
    clone() {
        return new ImmutableList(this._elements);
    }

    // Method to convert to a string representation
    toString() {
        return `[${this._elements.join(', ')}]`;
    }

    // Method to reduce the elements (returns the reduced value)
    reduce(callback, initialValue) {
        return this._elements.reduce(callback, initialValue);
    }
}

// Example Usage
const list = new ImmutableList([1, 2, 3]);
const newList = list.add(4);
const insertedList = list.insert(1, 5);
const mappedList = list.map(x => x * 2);
const filteredList = list.filter(x => x > 1);
const concatenatedList = list.concat(new ImmutableList([5, 6]));

console.log(list.getElements()); // [1, 2, 3]
console.log(newList.getElements()); // [1, 2, 3, 4]
console.log(insertedList.getElements()); // [1, 5, 2, 3]
console.log(mappedList.getElements()); // [2, 4, 6]
console.log(filteredList.getElements()); // [2, 3]
console.log(concatenatedList.getElements()); // [1, 2, 3, 5, 6]
console.log(list.size()); // 3
console.log(list.contains(2)); // true
console.log(list.find(x => x === 2)); // 2
console.log(list.toString()); // [1, 2, 3]
