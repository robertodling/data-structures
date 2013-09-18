/* global describe, it, expect, LinkedList*/
describe('Linked list', function () {

	'use strict';

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

	function insertList(list, listTwo) {
		list.insertLast(listTwo);
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

	describe('Getting size of list', function () {

		it('should have zero size if empty', function () {
			var list = new LinkedList();
			expect(list.size()).to.equal(0);
		});

		it('should have size one if one item added', function () {
			var list = new LinkedList();
			list.insertFirst(1);
			expect(list.size()).to.equal(1);
		});

		it('should have size 10 if 10 items added', function () {
			var list = new LinkedList();

			helper(insertFirst, list, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

			expect(list.size()).to.equal(10);
		});

		it('should have size 2048 if 2048 items inserted first', function () {
			var list = new LinkedList();

			batcher(insertFirst, list, 'foo', 2048);

			expect(list.size()).to.equal(2048);
		});

		it('should have size 2048 if 2048 items inserted last', function () {
			var list = new LinkedList();

			batcher(insertLast, list, 'foo', 2048);

			expect(list.size()).to.equal(2048);
		});

		it('should have size 112 if 122 items inserted at index zero', function () {
			var list = new LinkedList();

			batcher(function (list, value) {
				list.insertAt(0, value);
			}, list, 'foo', 2048);

			expect(list.size()).to.equal(2048);
		});
	});

	describe('Finding element at position', function () {

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


	describe('Inserting elements', function () {


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

		describe('Inserting at', function () {
			it('should insert node at correct position', function () {


				var list = new LinkedList();
				batcher(insertFirst, list, 'element', 12);

				list.insertAt(5, 'five');

				expect(list.size()).to.equal(13);
				expect(list.elementAt(5)).to.equal('five');
			});
		});

		describe('Inserting list', function () {
			it('should add all elements from list', function () {


				var listOne = new LinkedList();
				helper(insertList, listOne, '1', '2', '3');

				var listTwo = new LinkedList();
				helper(insertList, listTwo, '4', '5', '6');

				var list = new LinkedList();
				list.insertList(listOne);
				list.insertList(listTwo);

				expect(list.elementAt(0)).to.equal('1');
				expect(list.elementAt(1)).to.equal('2');
				expect(list.elementAt(2)).to.equal('3');
				expect(list.elementAt(3)).to.equal('4');
				expect(list.elementAt(4)).to.equal('5');
				expect(list.elementAt(5)).to.equal('6');
			});

		});

	});

	describe('Removing elements', function () {


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

				expect(list.elementAt(list.size() - 1)).to.equal('4');
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

		describe('Empty', function () {
			it('should return true on newly created list', function () {
				var list = new LinkedList();
				expect(list.isEmpty()).to.equal(true);
			});
			it('should return false on list with items', function () {
				var list = new LinkedList();
				list.insertFirst('value');
				expect(list.isEmpty()).to.equal(false);
			});
			it('should return true on list that has been cleared', function () {
				var list = new LinkedList();
				list.insertFirst('value');
				list.clear();
				expect(list.isEmpty()).to.equal(true);
			});
		});
	});


	describe('Error handling', function () {

		describe('Out of bounds', function () {


			it('should throw OutOfBoundException when inserting outsize of higher bound ', function () {
				var list = new LinkedList();

				expect(function () {
					list.insertAt(1);
				}).to.throw("OutOfBoundException");
			});

			it('should throw OutOfBoundException when inserting outsize of lower bound ', function () {
				var list = new LinkedList();
				expect(function () {
					list.insertAt(-1);
				}).to.throw("OutOfBoundException");
			});

			it('should throw OutOfBoundException when retrieving outsize of higher bound ', function () {
				var list = new LinkedList();
				expect(function () {
					list.elementAt(1);
				}).to.throw("OutOfBoundException");
			});

			it('should throw OutOfBoundException when retrieving outsize of lower bound ', function () {
				var list = new LinkedList();
				expect(function () {
					list.elementAt(-1);
				}).to.throw("OutOfBoundException");
			});

			it('should throw OutOfBoundException when removing outsize of higher bound ', function () {
				var list = new LinkedList();
				expect(function () {
					list.removeAt(1);
				}).to.throw("OutOfBoundException");
			});

			it('should throw OutOfBoundException when removing outsize of lower bound ', function () {
				var list = new LinkedList();
				expect(function () {
					list.removeAt(-1);
				}).to.throw("OutOfBoundException");
			});
		});


		describe('Working with arrays', function () {


			describe('Creating from array', function () {
				it('should add all elements from array', function () {
					var arr = ["1", "2", "3", "4"];
					var list = new LinkedList(arr);
					expect(list.elementAt(0)).to.equal('1');
					expect(list.elementAt(1)).to.equal('2');
					expect(list.elementAt(2)).to.equal('3');
					expect(list.elementAt(3)).to.equal('4');
				});
			});

			describe('Adding array', function () {
				it('should add all elements from array', function () {
					var arr = ["1", "2", "3", "4"];
					var list = new LinkedList();
					list.insertArray(arr);
					expect(list.elementAt(0)).to.equal('1');
					expect(list.elementAt(1)).to.equal('2');
					expect(list.elementAt(2)).to.equal('3');
					expect(list.elementAt(3)).to.equal('4');
				});
			});

			describe('To array', function () {

				it('should return empty array on empty list', function () {
					var list = new LinkedList();
					var arr = list.toArray();
					expect(arr).to.be.an('array');
					expect(arr.length).to.equal(0);
				});

				it('should return array with correct element', function () {
					var list = new LinkedList();
					helper(insertLast, list, '1', '2', '3', '4', '5');
					var arr = list.toArray();

					expect(arr[0]).to.equal('1');
					expect(arr[1]).to.equal('2');
					expect(arr[2]).to.equal('3');
					expect(arr[3]).to.equal('4');
					expect(arr[4]).to.equal('5');
				});

			});
		});

		describe('Iterating over elements', function () {

			it('should run callback for each element', function () {
				var list = new LinkedList([0, 1, 2]);
				list.forEach(function (element, index) {

					expect(element).to.equal(index);
				});
			});

			it('should iterate correctly with for loop', function () {
				var list = new LinkedList([0, 1, 2]);
				for (var i = 0, size = list.size(); i < size; i++) {
					expect(list.elementAt(i)).to.equal(i);
				}
			});

			it('should iterate correctly with iterator', function () {
				var list = new LinkedList([0, 1, 2]);
				var iterator = list.iterator();
				var i = 0;
				while (iterator.hasNext()) {
					expect(iterator.next()).to.equal(i);
					i++;
				}
			});
		});

		describe('Finding elements', function () {
			it('should return index of existing item', function () {
				var list = new LinkedList(['one', 'two', 'three']);
				var result = list.indexOf('two');
				expect(result).to.equal(1);
			});

			it('should return -1 if item does not exist', function () {
				var list = new LinkedList(['one', 'two', 'three']);
				expect(list.indexOf('unknown')).to.equal(-1);
			});
			it('should return -1 when trying to find item on empty list', function () {
				var list = new LinkedList();
				expect(list.indexOf('unknown')).to.equal(-1);
			});
		});

		describe('Compound tests', function () {
			var list = new LinkedList();

			//Inserting and retrieving

			list.insertFirst('b');
			list.insertFirst('a');

			list.insertLast('d');

			list.insertAt(2, 'c');

			expect(list.elementAt(0)).to.equal('a');
			expect(list.elementAt(1)).to.equal('b');
			expect(list.elementAt(2)).to.equal('c');
			expect(list.elementAt(3)).to.equal('d');

			expect(list.size()).to.equal(4);

			list.clear();

			// removing
			list.insertLast('a');
			list.insertLast('b');
			list.insertLast('c');
			list.insertLast('d');
			list.insertLast('e');

			expect(list.size()).to.equal(5);

			list.removeAt(2);
			expect(list.size()).to.equal(4);
			expect(list.elementAt(2)).to.equal('d');

			list.removeFirst();
			expect(list.size()).to.equal(3);
			expect(list.elementAt(0)).to.equal('b');

			list.removeLast();
			expect(list.size()).to.equal(2);
			expect(list.elementAt(1)).to.equal('d');

			list.clear();

			// working with arrays

			arr = ["1", "2", "3", "4"];

			list = new LinkedList(arr);

			expect(list.elementAt(0)).to.equal('1');
			expect(list.elementAt(1)).to.equal('2');
			expect(list.elementAt(2)).to.equal('3');
			expect(list.elementAt(3)).to.equal('4');

			list.clear();

			list.insertArray(arr);
			expect(list.elementAt(0)).to.equal('1');
			expect(list.elementAt(1)).to.equal('2');
			expect(list.elementAt(2)).to.equal('3');
			expect(list.elementAt(3)).to.equal('4');

			var arr = list.toArray();
			expect(arr[0]).to.equal('1');
			expect(arr[1]).to.equal('2');
			expect(arr[2]).to.equal('3');
			expect(arr[3]).to.equal('4');

			list = new LinkedList();


			try {
				list.elementAt(-1);
			} catch (err) {
				expect(err.message).to.equal('OutOfBoundException');
			}

		});

	});
});

