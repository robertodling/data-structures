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

		it.skip('should have length 0 if 0 items inserted at index zero', function () {
			var list = new LinkedList();

			batcher(function (list, value) {
				list.insertAt(1, value);
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
