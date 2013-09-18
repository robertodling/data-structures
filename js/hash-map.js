/**
 * HashMap
 *
 * @license data-structures
 * Robert Ödling https://github.com/robertodling/data-structures
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

// 'LinkedList' will be added to global scope.
var HashMap = (function () {

	'use strict';

	/**
	 * Initialize map
	 * @constructor
	 */
	var HashMap = function () {
		this.map = {};
	};

	var proto = HashMap.prototype;

	/**
	 * Returns size, the number of entries (or more correct number of keys) int the map.
	 * @return {number}
	 */
	proto.size = function () {
		var size = 0;

		this.forEach(function () {
			size++;
		});

		return size;
	};

	/**
	 * Checks if specified value is undefined or null, used because we want to allow falsy strings, numbers and booleans
	 * @param {*}
	 * @return {boolean}
	 * @private
	 */
	function _isSomeNullOrUndefined() {
		var args = [].slice.call(arguments);

		return args.some(function (value) {
			// NOTE: '==' instead of '===' as we want to include undefined also
			return value == null;
		});
	}

	proto.put = function (key, value) {

		if (_isSomeNullOrUndefined(key, value)) {
			return;
		}

		this.map[key] = value;
	};

	proto.get = function (key) {

		if (_isSomeNullOrUndefined(key)) {
			return;
		}

		// do not return values from prototype chain
		if (this.map.hasOwnProperty(key)) {
			return this.map[key];
		}
	};

	proto.remove = function (key) {

		if (_isSomeNullOrUndefined(key)) {
			return;
		}

		// do not allow removing from prototype chain
		if (this.map.hasOwnProperty(key)) {
			delete this.map[key];
		}
	};

	proto.values = function () {
		var values = [];
		this.forEach(function (key, value) {
			values.push(value);
		});
		return values;
	};

	proto.keys = function () {
		var keys = [];

		this.forEach(function (key) {
			keys.push(key);
		});

		return keys;
	};

	proto.isEmpty = function () {
		return this.size() === 0;
	};

	proto.clear = function () {

		// NOTE: It would have been enough with "this.map = {}"
		// but this approach should hopefully speed up garbage collecting
		this.forEach(function (key, value) {
			delete (this.map[key]);
		}.bind(this));
	};

	proto.forEach = function (cb) {

		for (var key in this.map) {
			if (this.map.hasOwnProperty(key)) {
				cb(key, this.map[key]);
			}
		}
	};


	// export HashMap constructor
	return HashMap;
})();