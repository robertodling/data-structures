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
		if (!node.prev) {
			this.head = node.next;
		} else {
			node.prev.next = node.next;
		}

		if (!this.next) {
			this.tail = node.prev;
		} else {
			node.next.prev = node.prev;
		}

		this._size--;
	}

	function _isOutOfBounds(index) {
		return index < 0 || index >= this.size();
	}


	/**
	 * Initialize list.
	 * @constructor
	 */
	var LinkedList = function () {
		this.clear();	// set head and tail to null;
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

	// export LinkedList constructor
	return LinkedList;
})();