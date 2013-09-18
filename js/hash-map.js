/**
 * HashMap, implementation of abstract map.
 * Does not allow null or undefined as keys or values.
 * Does not preserve order when retrieving values or keys.
 *
 * @license data-structures
 * (c) Robert Ödling https://github.com/robertodling/data-structures
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

// 'HashMap' will be added to global scope.
var HashMap = (function () {

	'use strict';


	/**
	 * Checks if any of the provided arguments are undefined or null,
	 * used to allow "falsy" strings, numbers and booleans in a map.
	 * @param {*...}
	 * @return {boolean}
	 * @private
	 */
	function _isSomeNullOrUndefined() {
		var args = [].slice.call(arguments);

		return args.some(function (value) {
			// NOTE: '==' instead of '===' as we want to include undefined also
			/* jshint eqnull:true*/
			return value == null;
		});
	}

	/**
	 * HashMap constructor.
	 * @constructor
	 */
	var HashMap = function () {
		this.map = {};
	};

	var proto = HashMap.prototype;	// shorthand

	/**
	 * Returns the size, the number of entries (or more correct number of keys), in this map.
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
	 * Associates specified value under specified key in this map.
	 * Does no allow key or value to be undefined or null.
	 * @param {*} key
	 * @param {*} value
	 */
	proto.put = function (key, value) {
		if (_isSomeNullOrUndefined(key, value)) {
			return;
		}

		// associate
		this.map[key] = value;
	};

	/**
	 * Returns the value associated to specified key in this map.
	 * Does no allow key to be undefined or null.
	 * @param {*} key
	 * @param {*} value
	 * @return {*}
	 */
	proto.get = function (key) {
		if (_isSomeNullOrUndefined(key)) {
			return;
		}

		// do not return values from prototype chain
		if (this.map.hasOwnProperty(key)) {
			// return associated
			return this.map[key];
		}
	};

	/**
	 * Removes the mapping for the specified key from this map.
	 * Does no allow key to be undefined or null.
	 * @param {*} key
	 * @param {*} value
	 */
	proto.remove = function (key) {
		if (_isSomeNullOrUndefined(key)) {
			return;
		}

		// do not allow removing from prototype chain
		if (this.map.hasOwnProperty(key)) {
			// remove mapping
			delete this.map[key];
		}
	};

	/**
	 * Returns all the values associated to a key in this map.
	 * Does not preserve order.
	 * @return {array}
	 */
	proto.values = function () {
		var values = [];

		this.forEach(function (key, value) {
			values.push(value);
		});

		return values;
	};

	/**
	 * Returns all the keys in this map.
	 * Does not preserve order.
	 * @return {array}
	 */
	proto.keys = function () {
		var keys = [];

		this.forEach(function (key) {
			keys.push(key);
		});

		return keys;
	};

	/**
	 * Checks if map is empty.
	 * @return {boolean}
	 */
	proto.isEmpty = function () {
		return this.size() === 0;
	};

	/**
	 * Removes all key-value mappings from this map.
	 */
	proto.clear = function () {

		// NOTE: It would have been enough with "this.map = {}"
		// but this approach should hopefully speed up garbage collecting
		this.forEach(function (key) {
			delete this.map[key];
		}.bind(this));
	};

	/**
	 * Applies provided function on each key value mapping in this map.
	 * @param {function} cb
	 */
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