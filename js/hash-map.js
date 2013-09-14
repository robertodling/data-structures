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

	var HashMap = function (){
		this.map = {};
	};

	var proto = HashMap.prototype;

	proto.size = function (){
		var size = 0;
		for(var key in this.map){
			size++;
		}
		return size;
	};

	proto.put = function (key, value){
		this.map[key] = value;
	};

	// export HashMap constructor
	return HashMap;
})();