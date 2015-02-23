'use strict';

describe('MiniION controllers', function() {

	describe('SequenceListCtrl', function() {
		var scope, ctrl, $httpBackend;

		beforeEach(module('MinIONApp'));
		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      			$httpBackend = _$httpBackend_;
     		 	$httpBackend.expectGET('strands/strands.json').
	   		       respond([
			  	{
				"name": "Keratin",
				"structure": "GTCCTGAGA",
				"rate": 0.0532
				},
				{
				"name": "Collagen",
				"structure": "CCTGAGAGT",
				"rate": 0.1312
				},
				{
				"name": "Elastin",
				"structure": "TGAGAGTCC",
				"rate": 0.2513
			  	}
			  ]);

			scope = $rootScope.$new();
			ctrl = $controller('SequenceListCtrl', {$scope: scope});
		}));
					


		it('should create "sequence" model with 3 sequences from xhr', function() {
			expect(scope.sequences).toBeUndefined();
			$httpBackend.flush();

			expect(scope.sequences).toEqual([
			  	{
				"name": "Keratin",
				"structure": "GTCCTGAGA",
				"rate": 0.0532
				},
				{
				"name": "Collagen",
				"structure": "CCTGAGAGT",
				"rate": 0.1312
				},
				{
				"name": "Elastin",
				"structure": "TGAGAGTCC",
				"rate": 0.2513
			  	}
			]);


		});

	});
});
