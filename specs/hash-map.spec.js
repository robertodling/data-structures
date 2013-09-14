describe('HashMap', function () {


	function batcher(map, count, fn) {
		for (var i = 0; i < count; i++) {
			fn(map, i);
		}
	}


	describe('size', function () {
		it('should have size 0 if empty', function () {
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
	});
});

