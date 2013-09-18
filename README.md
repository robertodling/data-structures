data-structures
===============

Implementations of various classical data structures in JavaScript. Lightly inspired by Java Collections. Assumes Ecma5.

## Run tests

Install dependencies:
```
npm install
```

Run file watcher and test runner:

```
./node_modules/karma/bin/karma start
```

## Linked list

Implementation of an abstract list as a double linked list.



### Constructing list

```
var emptyList = new LinkedList();

var listFromArray = new LinkedList([1,2,3,4]);

var copiedList = new LinkedList(listFromArray);
```

### Inserting and retrieving elements

```
var list = new LinkedList();

list.insertFirst('b');
list.insertFirst('a');

list.insertLast('d');

list.insertAt(2, 'c');

list.elementAt(0);	// 'a'
list.elementAt(1);	// 'b'
list.elementAt(2);	// 'c'
list.elementAt(3);	// 'd'

list.size();		// 4

var secondList = new LinkedList();

secondList.insertLast('e');

list.addList(secondList);

list.elementAt(4);	// 'e'

```

### Removing elements

```
var list = new LinkedList();

list.insertLast('a');
list.insertLast('b');
list.insertLast('c');
list.insertLast('d');
list.insertLast('e');

list.removeAt(2);
list.removeFirst();
list.removeLast();

list.size();			// 2
list.elementAt(0);		// 'b'
list.elementAt(1);		// 'd'

list.clear();
list.size();			// 0
```

### Working with arrays

```
var list = new LinkedList(["1", "2", "3", "4"]);

list.elementAt(0);		// '1'
list.elementAt(1);		// '2'
list.elementAt(2);		// '3'
list.elementAt(3);		// '4'

list.clear();

list.addArray(['foo', 'bar']);

list.elementAt(0);		// 'foo'
list.elementAt(1);		// 'bar'

var arr = list.toArray();
arr[0];					// 'foo'
arr[1];					// 'bar'
```

### Error handling

```
var list = new LinkedList();

try {
	list.elementAt(-1);
} catch (err) {
	err.message; 		// 'OutOfBoundException';
}
```

### Iterating over elements

```
// vanilla style
// NOTE: not performant
var list = new LinkedList([0, 1, 2]);
for (var i = 0, size = list.size(); i < size; i++) {
	list.elementAt(i) === i;	//true
}

// javascript style
var list = new LinkedList([0, 1, 2]);
list.forEach(function (element, index) {
	element === index;			// true
});

// iterator style
var list = new LinkedList([0, 1, 2]);
var iterator = list.iterator();
var i=0;
while (iterator.hasNext()) {
	iterator.next() === i);		// true
	i++;
}

```

### Finding elements

```
var list = new LinkedList(['one', 'two', 'three]);

list.indexOf('two');		// 1
list.indexOf('unknown');	// -1
```

## HashMap

Implementation of an abstract map.

* Does not allow _null_ or _undefined_ as keys or values.
* Does not preserve order when retrieving values or keys.

### Examples

```
var map = new HashMap();

map.put('foo', 'bar');
map.put('hello', 'world');

map.isEmpty();		// false

map.size();			// 2

map.get('foo');		// 'bar'

map.remove('foo');

// note: order nor preserved
map.keys();			// ['hello'];
map.values();		// ['world'];

map.forEach(function (key, value) {
	//
});

```

