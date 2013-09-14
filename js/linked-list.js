/**
 * LinkedList, implementation of an abstract list as a double linked list.
 *
 * @license data-structures
 * Robert Ödling https://github.com/robertodling/data-structures
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

// 'LinkedList' will be added to global scope.
var LinkedList = (function () {

	'use strict';

	/**
	 * Returns node at specified number of steps after specified node.
	 * @param {number} node
	 * @param {number} steps
	 * @return {object} node
	 * @private
	 */
	function _nodeAfter(node, steps) {

		var i = 0;

		while (i < steps) {
			node = node.next;
			i++;
		}

		return node;
	}

	/**
	 * Inserts newBode after specified node. Assumes that 'this' is bound to LinkedList.
	 * @param {object} node
	 * @param {object} newNode
	 * @private
	 */
	function _insertAfter(node, newNode) {
		/* jshint validthis:true */
		newNode.prev = node;
		newNode.next = node.next;

		if (!node.next) {
			this.tail = newNode;
		} else {
			node.next.prev = newNode;
		}
		node.next = newNode;

		this._size++;
	}

	/**
	 * Inserts newBode before specified node. Assumes that 'this' is bound to LinkedList.
	 * @param {object} node
	 * @param {object} newNode
	 * @private
	 */
	function _insertBefore(node, newNode) {
		/* jshint validthis:true */
		newNode.prev = node.prev;
		newNode.next = node;

		if (!node.prev) {
			this.head = newNode;
		} else {
			node.prev.next = newNode;
		}

		node.prev = newNode;

		this._size++;
	}

	/**
	 * Inserts newBode after specified node. Assumes that 'this' is bound to LinkedList.
	 * @param {object} node
	 * @private
	 */
	function _insertEmpty(node) {
		/* jshint validthis:true */
		this.head = node;
		this.tail = node;

		this._size++;
	}

	/**
	 * Removes a node from list. Assumes that 'this' is bound to LinkedList.
	 * @param {object} node
	 * @private
	 */
	function _removeNode(node) {
		/* jshint validthis:true */
		if (!node.prev) {
			this.head = node.next;
		} else {
			node.prev.next = node.next;
		}

		if (!node.next) {
			this.tail = node.prev;
		} else {
			node.next.prev = node.prev;
		}

		this._size--;
	}

	function _isOutOfBounds(index) {
		/* jshint validthis:true */
		var outsideLowerBound = index < 0;
		var outsideHigherBound = index > this.size();
		return outsideLowerBound || outsideHigherBound;
	}


	/**
	 * Initialize list, can be constructed from array.
	 *
	 * @param {array}
	 * @constructor
	 */
	var LinkedList = function (elements) {
		this.clear();
		if (elements && elements instanceof Array) {
			this.insertArray(elements);
		} else if (elements && elements instanceof LinkedList) {
			this.insertList(elements);
		}

	};

	var proto = LinkedList.prototype;	// shorthand

	/**
	 * Clears list
	 */
	proto.clear = function () {
		this.head = this.tail = null;
		this._size = 0;
	};

	/**
	 * Returns number of elements in list.
	 * @param {number}
	 */
	proto.size = function () {
		return this._size;
	};

	/**
	 * Insert specified element first in list, will increment index of all other elements.
	 * @param {object} element
	 */
	proto.insertFirst = function (element) {

		var node = {element: element};

		if (this.isEmpty()) {
			_insertEmpty.call(this, node);
		} else {
			_insertBefore.call(this, this.head, node);
		}
	};

	/**
	 * Insert specified element last in list, will _NOT_ increment index of any elements.
	 * @param {object} element
	 */
	proto.insertLast = function (element) {

		var node = {element: element};

		if (this.isEmpty()) {
			_insertEmpty.call(this, node);
		} else {
			_insertAfter.call(this, this.tail, node);
		}

	};

	/**
	 * Insert specified element at specified index, will increment index of all following elements.
	 * @param {number} index
	 * @param {object} element
	 */
	proto.insertAt = function (index, element) {

		if (_isOutOfBounds.call(this, index)) {
			throw new Error("OutOfBoundException");
		}

		if (this.isEmpty()) {
			this.insertFirst(element);
		} else {
			var node = _nodeAfter(this.head, index);
			var newNode = {element: element};
			_insertBefore.call(this, node, newNode);
		}

	};

	/**
	 * Returns element at specified index.
	 * @param {number} index
	 * @return {object}
	 */
	proto.elementAt = function (index) {

		if (_isOutOfBounds.call(this, index)) {
			throw new Error("OutOfBoundException");
		}

		var node = _nodeAfter(this.head, index);
		return node.element;
	};


	/**
	 * Remove first element.
	 */
	proto.removeFirst = function () {
		_removeNode.call(this, this.head);
	};


	/**
	 * Remove last element.
	 */
	proto.removeLast = function () {
		_removeNode.call(this, this.tail);
	};

	/**
	 * Remove element at specified index.
	 * @param {number} index
	 */
	proto.removeAt = function (index) {
		if (_isOutOfBounds.call(this, index)) {
			throw new Error("OutOfBoundException");
		}
		var node = _nodeAfter(this.head, index);
		_removeNode.call(this, node);
	};

	/**
	 * Check if list is empty
	 * @return {boolean}
	 */
	proto.isEmpty = function () {
		return !this.tail;
	};

	/**
	 * Returns list as array
	 * @return {array}
	 */
	proto.toArray = function () {
		if (this.isEmpty()) {
			return [];
		}

		var arr = [];
		var node = this.head;

		arr.push(node.element);

		while (node.next) {
			node = node.next;
			arr.push(node.element);
		}

		return arr;
	};


	/**
	 * Add contents of array to list.
	 * @param {array}
	 * @return
	 */
	proto.insertArray = function (arr) {
		var self = this;
		if (arr && arr instanceof Array) {
			arr.forEach(function (element) {
				self.insertLast(element);
			});
		}

	};

	/**
	 * Add contents of specified list to list.
	 * @param {object}
	 * @return
	 */
	proto.insertList = function (list) {
		var self = this;
		if (list && list instanceof LinkedList) {
			list.forEach(function (element) {
				self.insertLast(element);
			});
		}
	};

	/**
	 * Return an iterator being backed up by this list.
	 * @return {object}
	 */
	proto.iterator = function () {
		// create special start node so first next() will point to head.
		var node = {next: this.head};

		// iterator
		return {
			hasNext: function () {
				return !!node.next;
			},
			next: function () {
				node = node.next;
				return node.element;
			}
		};
	};

	/**
	 * Invoke function on each element in list
	 * @param {function}
	 */
	proto.forEach = function (fn) {

		var index = 0;
		var node = this.head;
		do {
			fn(node.element, index++);
			node = node.next;
		} while (node);

	};

	// export LinkedList constructor
	return LinkedList;
})();