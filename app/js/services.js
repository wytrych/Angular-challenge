var dataSupplierService = angular.module('dataSupplierService', []);
var sequenceMatcherService = angular.module('sequenceMatcherService', []);
var colorService = angular.module('colorService', []);
var sequenceDialogService = angular.module('sequenceDialogService', ['colorService']);
var backendService = angular.module('backendService', ['ngResource']);

dataSupplierService.factory('DataChunk', [
	function() {
		return {
		  weights: [],
		  getBuffer:
			function(bufferSize,weights) {
				this.weights = weights
				var i
				var buffer = " "
				for (i = 0; i<bufferSize; i++)
					buffer += this.getChunk()
				return buffer
			},
		  getChunk:
			function() {
				//var bit = this.getBit();
				//return bit*16+bit*4+bit*1+" ";
				return this.getBit()*16+this.getBit()*4+this.getBit()*1+" ";
			},
		  getBit:
			function() {
				return this.weight(Math.random())
			},
		  weight:
			function(randomNumber) {
				//var weights = [.25,.25,.25] // Sum must be < 1!
				var range = this.weights[0]
				var i = 1

				do {
					if (randomNumber < range)
						return i-1

					range += this.weights[i]
					i++

				} while (i <= this.weights.length)

				return i-1
			}
		}
	}	
]);

sequenceMatcherService.factory('SequenceMatcher', [
	function() {
		return {
		  count:
		    function(needle, haystack) {
			var count = 0;
			var pos = haystack.indexOf(needle);

			while (pos !== -1) {
			  count++;
			  pos = haystack.indexOf(needle, pos + 1);
			}
			
			return count;
		  }
		}
	}
]);

colorService.factory('Color', [
	function() {
		return {
			get: d3.scale.category20()
		}
	}
]);

sequenceDialogService.factory('SequenceEditor', ['Color',
	function(Color) {
		return {
			counter: -1,

			editSequence: function(editId,editSeq,sequences) {

				if (this.counter === -1)
					this.counter = sequences.length
		 
				var REGEX = /\S{4,}|[^AGCT\s]|((^|\s)\S{1,2}($|\s))/;

				if (editSeq.structure === "" || editSeq.name === "") 
					return false;

				if (REGEX.test(editSeq.structure)) 
					return false


				if (editId === -1) {
					editSeq.color = Color.get(this.counter++)
					sequences.push(editSeq)
				} else
					sequences[editId] = angular.copy(editSeq)

				return true
			}
		}
	}
]);

backendService.factory('BackendConnection', ['$resource','$filter','$window','Color','$http',
	function($resource,$filter,$window,Color,$http) {
		return {
			Data: $resource('strands/strands.json'),
			save: function(sequences,counter) {
				
				var report = sequences.slice(0)

				report.push({samples:counter,date:$filter('date')(Date.now(),'medium')})
				$http.post('report.txt', report).success(function() {
					$window.location.href = '/report.txt'
				})
			},
			get: function() {
				var data = this.Data.query(function(data) {
						data.forEach(function(el,i) {
							el.color = Color.get(i)
						})
						
					})

				return data
					
			}
	
		}
	}
]);
