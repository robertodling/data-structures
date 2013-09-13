data-structures
===============

## Linked list

Implementation of abstract list as double linked list.

```

var list = new LinkedList();

list.insertFirst('b');
list.insertFirst('a');

list.insertLast('d');

list.insertAt(2,'c');

list.elementAt(0);  // a
list.elementAt(1);  // b
list.elementAt(2);  // c
list.elementAt(3);  // d

list.size();        // 4

```
