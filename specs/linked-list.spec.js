var LinkedList = (function () {


	/**
	 * Node represents a node in a linked list
	 *
	 * @param  element - the  element stored at this node
	 * @param next - a pointer to the next node in list
	 * @constructor
	 *
	 * */
	var Node = function (element, next) {
		this.element = element;
		this.next = next;
	};

	/**
	 * Linked List  element structure.
	 *
	 * @constructor
	 *
	 * */
	var LinkedList = function () {
		this.head = new Node();
	};


	var proto = LinkedList.prototype;	// shorthand


	/**
	 * return a node 'steps' positions away from another node
	 *
	 * @param node - the node to start from
	 * @param steps - step to take to find node
	 *
	 * @return node
	 * */
	function nodeAfter(node, steps) {

		var i = 0;

		while (node.next && i <= steps) {
			node = node.next;
			i++;
		}

		return node;
	}

	/**
	 * returns number of elements in list
	 *
	 * @param node - the node to start from
	 * @param steps - step to take to find node
	 *
	 * @return number - length of list
	 * */

	proto.length = function () {

		var length = 0;
		var node = this.head;

		while (node.next) {
			node = node.next;
			length++;
		}

		return length;
	};

	/**
	 * Insert element first in list, will increment index of all other nodes.
	 *
	 * @param element - the element to insert first
	 *
	 * */
	proto.insertFirst = function (element) {

		var newNode;
		var firstNode = this.head.next;

		// list is empty, insert after head
		if (!firstNode) {
			newNode = new Node(element, null);
			this.head.next = newNode;
		}
		// insert after head and before first node
		else {
			newNode = new Node(element, firstNode);
			this.head.next = newNode;
		}
	};

	/**
	 * Insert element last in list, will NOT increment index of any nodes.
	 *
	 * @param element - the element to insert last
	 *
	 * */
	proto.insertLast = function (element) {

		var newNode;
		var indexOfLastNode = this.length() - 1;
		var lastNode = nodeAfter(this.head, indexOfLastNode);

		newNode = new Node(element, null);

		//list is empty, insert after head
		if (!lastNode) {
			this.head.next = newNode;
		}
		//insert after last node
		else {
			lastNode.next = newNode;
		}

	};

	/**
	 * Insert element at specified index, will increment index of all following nodes.
	 *
	 * @param index - index to insert
	 * @param element - the element to insert
	 *
	 * */
	proto.insertAt = function (index, element) {

		var newNode;

		var currentNode = nodeAfter(this.head, index);

		// empty or at end
		if (!currentNode) {
			this.insertLast(element)
		}
		// insert before head and before first node
		else {
			var previousNode = nodeAfter(this.head, index - 1);
			newNode = new Node(element, currentNode);
			previousNode.next = newNode;
		}

	};

	/**
	 *
	 *
	 * */


	proto.elementAt = function (index) {
		var node = nodeAfter(this.head, index);
		return node.element;
	};


	/**
	 * Remove first element
	 *
	 * */
	proto.removeFirst = function () {

		var firstNode = this.head.next;

		// list is empty, return
		if (!firstNode) {
			return;
		}
		// point head to next node
		else {
			this.head.next = this.head.next.next;
		}
	};


	/**
	 * Remove last element
	 *
	 * */
	proto.removeLast = function () {

		var indexOfLastNode = this.length() - 1;
		var lastNode = nodeAfter(this.head, indexOfLastNode);
		// list is empty, return
		if (!lastNode) {
			return;
		} else {
			var previousNode = nodeAfter(this.head, indexOfLastNode - 1);
			previousNode.next = null;
		}
	};

	/**
	 * Remove element at
	 *
	 * */
	proto.removeAt = function (index) {


		var currentNode = nodeAfter(this.head, index);

		// empty
		if (!currentNode) {
			return;
		}
		// insert before head and before first node
		else {
			var previousNode = nodeAfter(this.head, index - 1);

			previousNode.next = currentNode.next;
		}
	};

	return LinkedList;
})();


/**
 * Helper functions to ease in setting up test cases
 *
 * */

function insertFirst(list, element) {
	list.insertFirst(element);
}

function insertLast(list, element) {
	list.insertLast(element);
}

function helper(fn, list) {
	var args = [].slice.call(arguments);
	args.shift();
	args.shift();
	args.forEach(function (element) {
		fn(list, element);
	});
}

function batcher(fn, list, element, count) {

	for (var i = 0; i < count; i++) {
		fn(list, element);
	}

}

/**
 * Specs below
 *
 * */
describe('Linked list', function () {

	describe('Length method', function () {

		it('should have zero length if empty', function () {
			var list = new LinkedList();
			expect(list.length()).to.equal(0);
		});

		it('should have length one if one item added', function () {
			var list = new LinkedList();
			list.insertFirst(1);
			expect(list.length()).to.equal(1);
		});

		it('should have length 10 if 10 items added', function () {
			var list = new LinkedList();

			helper(insertFirst, list, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

			expect(list.length()).to.equal(10);
		});

		it('should have length 2048 if 2048 items inserted first', function () {
			var list = new LinkedList();

			batcher(insertFirst, list, 'foo', 2048);

			expect(list.length()).to.equal(2048);
		});

		it('should have length 2048 if 2048 items inserted last', function () {
			var list = new LinkedList();

			batcher(insertLast, list, 'foo', 2048);

			expect(list.length()).to.equal(2048);
		});

		it('should have length 2048 if 2048 items inserted at index zero', function () {
			var list = new LinkedList();

			batcher(function (list, value) {
				list.insertAt(0, value);
			}, list, 'foo', 2048);

			expect(list.length()).to.equal(2048);
		});
	});

	describe('Element at position', function () {

		it('should return correct element at position 0', function () {
			var list = new LinkedList();
			list.insertFirst('one');
			expect(list.elementAt(0)).to.equal('one');
		});

		it('should return correct element at position 3', function () {
			var list = new LinkedList();
			helper(insertFirst, list, '10', '9', '8', '7', '6', '5', '4', '3', '2', '1');
			expect(list.elementAt(3)).to.equal('4');
		});

	});

	describe('Insert first', function () {

		it('should insert in correct order', function () {
			var list = new LinkedList();

			helper(insertFirst, list, '1', '2', '3', '4', '5', '6', '7', '8', '9', '10');

			expect(list.elementAt(0)).to.equal('10');
			expect(list.elementAt(1)).to.equal('9');
			expect(list.elementAt(2)).to.equal('8');
			expect(list.elementAt(3)).to.equal('7');
			expect(list.elementAt(4)).to.equal('6');
			expect(list.elementAt(5)).to.equal('5');
			expect(list.elementAt(6)).to.equal('4');
			expect(list.elementAt(7)).to.equal('3');
			expect(list.elementAt(8)).to.equal('2');
			expect(list.elementAt(9)).to.equal('1');
		});
	});

	describe('Insert last', function () {
		it('should insert in correct order', function () {
			var list = new LinkedList();

			helper(insertLast, list, '1', '2', '3', '4', '5', '6', '7', '8', '9', '10');

			expect(list.elementAt(9)).to.equal('10');
			expect(list.elementAt(8)).to.equal('9');
			expect(list.elementAt(7)).to.equal('8');
			expect(list.elementAt(6)).to.equal('7');
			expect(list.elementAt(5)).to.equal('6');
			expect(list.elementAt(4)).to.equal('5');
			expect(list.elementAt(3)).to.equal('4');
			expect(list.elementAt(2)).to.equal('3');
			expect(list.elementAt(1)).to.equal('2');
			expect(list.elementAt(0)).to.equal('1');
		});
	});

	describe('Inserting at ', function () {
		it('should insert node at correct position', function () {


			var list = new LinkedList();
			batcher(insertFirst, list, 'element', 12);

			list.insertAt(5, 'five');

			expect(list.length()).to.equal(13);
			expect(list.elementAt(5)).to.equal('five');
		});
	});
	describe('Remove first ', function () {

		it('it should remove first element', function () {

			var list = new LinkedList();
			helper(insertFirst, list, '1', '2', '3', '4', '5');
			list.removeFirst();

			expect(list.elementAt(0)).to.equal('4');
		});


	});

	describe('Remove last ', function () {

		it('it should remove last element', function () {

			var list = new LinkedList();
			helper(insertLast, list, '1', '2', '3', '4', '5');
			list.removeLast();

			expect(list.elementAt(list.length())).to.equal('4');
		});
	});

	describe('Remove at ', function () {

		it('it should remove item from correct position element', function () {

			var list = new LinkedList();
			helper(insertLast, list, '1', '2', '3', '4', '5');
			list.removeAt(2);

			expect(list.elementAt(2)).to.equal('4');
		});
	});


});