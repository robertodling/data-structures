data-structures
===============

## Linked list

Implementation of an abstract list as a double linked list inspired by Java Collections. Assumes ES5.

### Examples

Constructing:

```
var emptyList = new LinkedList();

var listFromArray = new LinkedList([1,2,3,4]);

var copiedList = new LinkedList(listFromArray);
```

Inserting and retrieving:

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

Removing:

```
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

Working with arrays:

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

Error handling:

```
var list = new LinkedList();

try {
	list.elementAt(-1);
} catch (err) {
	err.message; 		// 'OutOfBoundException';
}
```

Iterating:

```
// vanilla style
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
