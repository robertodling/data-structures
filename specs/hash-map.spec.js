/* global describe, it, expect, HashMap*/
describe('HashMap', function () {

	'use strict';

	function batcher(map, count, fn) {
		for (var i = 0; i < count; i++) {
			fn(map, i);
		}
	}


	describe('Puting items to map', function () {
		it('should have size 0 if no item added', function () {
			var map = new HashMap();
			expect(map.size()).to.equal(0);
		});

		it('should have size 1 if 1 item added', function () {
			var map = new HashMap();
			map.put('one', 1);
			expect(map.size()).to.equal(1);
		});

		it('should have size 1024 if 1024 items added', function () {
			var map = new HashMap();
			batcher(map, 1024, function (map, count) {
				map.put("" + count, count);
			});
			expect(map.size()).to.equal(1024);
		});

		it('should not increase size if putting with same key', function () {
			var map = new HashMap();
			map.put('one', 1);
			map.put('one', 2);
			expect(map.size()).to.equal(1);
		});

		it('should not increase size if putting null', function () {
			var map = new HashMap();
			map.put('one', null);
			expect(map.size()).to.equal(0);
		});


		it('should not increase size if putting undefined', function () {
			var map = new HashMap();
			map.put('one', undefined);
			expect(map.size()).to.equal(0);
		});


	});

	describe('Getting from map', function () {

		it('should return added item', function () {
			var map = new HashMap();
			map.put('foo', 'bar');
			expect(map.get('foo')).to.equal('bar');
		});

		it('should return "falsy" string', function () {
			var map = new HashMap();
			map.put('falsy', '');
			expect(map.get('falsy')).to.equal('');
			expect(map.get('falsy')).to.be.an('string');
		});

		it('should return "falsy" number', function () {
			var map = new HashMap();
			map.put('falsy', 0);
			expect(map.get('falsy')).to.equal(0);
			expect(map.get('falsy')).to.be.an('number');
		});

		it('should return "falsy" boolean', function () {
			var map = new HashMap();
			map.put('falsy', false);
			expect(map.get('falsy')).to.equal(false);
			expect(map.get('falsy')).to.be.an('boolean');
		});

		it('should return last value added for key', function () {
			var map = new HashMap();
			map.put('foo', 'not_bar');
			map.put('foo', 'bar');
			expect(map.get('foo')).to.equal('bar');
		});

	});

	describe('Removing from map', function () {

		it('should correctly remove item', function () {
			var map = new HashMap();
			map.put('foo', 'bar');
			map.remove('foo');
			expect(map.get('foo')).to.not.exist;
		});

	});

	describe('Get values from map', function () {

		it('should return values as array', function () {

			var map = new HashMap();
			map.put('one', 1);
			map.put('two', 2);
			map.put('three', 3);
			var values = map.values();

			// order is not preserved
			expect(values.indexOf(1)).to.be.at.least(0);
			expect(values.indexOf(2)).to.be.at.least(0);
			expect(values.indexOf(3)).to.be.at.least(0);
		});

	});

	describe('Get keys from map', function () {

		it('should return keys as array', function () {

			var map = new HashMap();
			map.put('one', 1);
			map.put('two', 2);
			map.put('three', 3);
			var keys = map.keys();

			// order is not preserved
			expect(keys.indexOf('one')).to.be.at.least(0);
			expect(keys.indexOf('one')).to.be.at.least(0);
			expect(keys.indexOf('one')).to.be.at.least(0);
		});

	});

	describe('Testing isEmpty on map', function () {

		it('shold return true on newly created map', function () {
			var map = new HashMap();
			expect(map.isEmpty()).to.be.true;
		});

		it('shold return true after adding and removing', function () {

			var map = new HashMap();
			map.put('one', 1);
			map.put('two', 2);
			map.put('three', 3);
			map.remove('one');
			map.remove('one');
			map.remove('two');
			map.remove('three');

			expect(map.isEmpty()).to.be.true;
		});

		it('shold return true after adding and clearing', function () {
			var map = new HashMap();
			map.put('one', 1);
			map.put('two', 2);
			map.put('three', 3);
			map.clear();
			expect(map.isEmpty()).to.be.true;
		});

	});

	describe('Iterating items of map', function () {


		it('should run callback for each element', function () {
			var map = new HashMap();
			map.put('one', 1);
			map.put('two', 2);
			map.put('three', 3);
			var keys = [];
			var values = [];

			// Order is not preserved
			map.forEach(function (key, value) {

				keys.push(key);
				values.push(value);
			});

			expect(keys.indexOf('one')).to.be.at.least(0);
			expect(keys.indexOf('two')).to.be.at.least(0);
			expect(keys.indexOf('three')).to.be.at.least(0);
			expect(values.indexOf(1)).to.be.at.least(0);
			expect(values.indexOf(2)).to.be.at.least(0);
			expect(values.indexOf(3)).to.be.at.least(0);
		});
	});
});

