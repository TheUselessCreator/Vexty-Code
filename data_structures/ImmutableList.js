class ImmutableList {
    constructor(elements) {
        this._elements = [...elements]; // Store a copy of the array
    }

    // Method to get elements
    getElements() {
        return this._elements;
    }

    // Method to add an element (returns a new instance)
    add(element) {
        return new ImmutableList([...this._elements, element]);
    }

    // Method to remove an element (returns a new instance)
    remove(element) {
        return new ImmutableList(this._elements.filter(el => el !== element));
    }
}

// Example Usage
const list = new ImmutableList([1, 2, 3]);
const newList = list.add(4);
console.log(list.getElements()); // [1, 2, 3]
console.log(newList.getElements()); // [1, 2, 3, 4]
