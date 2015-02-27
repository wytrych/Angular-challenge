'use strict';

describe('big number filter', function() {
	beforeEach(module('MinIONAppFilters'));

		
	describe('test the filter', function() {

		it('should return 10.00 K when given 10 000', 
			inject(function(bigNumberFilter) {
				expect(bigNumberFilter(1)).toEqual(1);
				expect(bigNumberFilter(10)).toEqual(10);
				expect(bigNumberFilter(100)).toEqual(100);
				expect(bigNumberFilter(1000)).toEqual('1.00 K');
				expect(bigNumberFilter(10000)).toEqual('10.00 K');
				expect(bigNumberFilter(100000)).toEqual('0.10 M');
				expect(bigNumberFilter(1000000)).toEqual('1.00 M');
				expect(bigNumberFilter(8300000)).toEqual('8.30 M');
				expect(bigNumberFilter(10000000)).toEqual('10.00 M');
				expect(bigNumberFilter(100000000)).toEqual('0.01 G');
				expect(bigNumberFilter(1000000000)).toEqual('0.10 G');
				expect(bigNumberFilter(10000000000)).toEqual('1.00 G');

			})
		)
	})
			
})



describe('directives test', function() {
	var	$compile,
		$rootScope

	beforeEach(module('MinIONApp'))

	/*beforeEach(inject(function(_$compile_,_$rootScope_) {
		$compile = _$compile_
		$rootScope = _$rootScope_
	}))

	it ('Shows svg rectangles', function() {
		var element = $compile('<minion-rectangle />')($rootScope);

		$rootScope.$digest()
		expect(element.html()).toContain('<svg class="rect" viewBox="0 0 100 100" style="fill:{{sequence.color}}"><rect x="0" y="0" width="200" height="200" /></svg>')
	})*/

})	


describe('MinION controllers', function() {
	var 	scope,
		controller,
		element,
		svg
	


	var strands = 
[
	{
		"name": "Keratin",
		"structure": "AAA",
		"prob": 0,
		"rate": 0
	},
	{
		"name": "Something",
		"structure": "GGG",
		"prob": 0,
		"rate": 0
	},
	{
		"name": "Collagen",
		"structure": "TTT",
		"prob": 0,
		"rate": 0
	},
	{
		"name": "Elastin",
		"structure": "CCC",
		"prob": 0,
		"rate": 0
	}
]
	

	beforeEach(module('MinIONApp'));
	beforeEach(module('dataSupplierService'));
	beforeEach(module('sequenceMatcherService'));
	beforeEach(module('colorService'));
	beforeEach(module('sequenceDialogService'));
	beforeEach(module('backendService'));
	beforeEach(module('dataCollectionService'));
	beforeEach(module('ngResource'));

	beforeEach(inject(function($controller, $rootScope, ngDialog, $http, DataChunk, $interval, transcriberFilter, SequenceMatcher, $window, $filter, Color, SequenceEditor, BackendConnection, DataCollection, $compile, $httpBackend) {
		
			scope = $rootScope.$new()
			controller = $controller('SequenceListCtrl', { $scope: scope })  
			element = $compile('<minion-rectangle />')($rootScope);
			svg = $compile('<svg class="rect" viewBox="0 0 100 100" style="fill:{{sequence.color}}"><rect x="0" y="0" width="200" height="200" /></svg>')($rootScope)

      			$httpBackend.expectGET('strands/strands.json').respond(strands)

			$rootScope.$digest()
	}))

	describe('controler text', function() {
		it('does something', function() {

			
				expect(scope.validate()).toEqual(false);
			

		})

		it ('Shows svg rectangles', function() {

			expect(element.attr('class')).toContain('rect')
			expect(element.find('rect').attr('x')).toBe('0')
			expect(element.html()).toEqual(svg.html())
		})

	})
})


/*
describe('MiniION controllers', function() {

	describe('SequenceListCtrl', function() {
		var scope, ctrl, $httpBackend;

		beforeEach(module('MinIONApp'));
		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, BackendConnection) {
      			$httpBackend = _$httpBackend_;
     		 	$httpBackend.expectGET('strands/strands.json').
	   		       respond([
			  	{
				"name": "Keratin",
				"structure": "GTCCTGAGA",
				"rate": 0,
				"prob": 0
				},
				{
				"name": "Collagen",
				"structure": "CCTGAGAGT",
				"rate": 0,
				"prob": 0
				},
				{
				"name": "Elastin",
				"structure": "TGAGAGTCC",
				"rate": 0,
				"prob": 0
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
				"rate": 0,
				"prob": 0
				},
				{
				"name": "Collagen",
				"structure": "CCTGAGAGT",
				"rate": 0,
				"prob": 0
				},
				{
				"name": "Elastin",
				"structure": "TGAGAGTCC",
				"rate": 0,
				"prob": 0
			  	}
			]);


		});

	});
});
*/
