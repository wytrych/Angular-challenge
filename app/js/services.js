var dataSupplierService = angular.module('dataSupplierService', []);
var sequenceMatcherService = angular.module('sequenceMatcherService', []);
var colorService = angular.module('colorService', []);

dataSupplierService.factory('DataChunk', [
	function() {
		return {
		  getBuffer:
			function(bufferSize) {
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
				return Math.floor(Math.random() * 4)
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



