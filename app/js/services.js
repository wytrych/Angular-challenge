var dataSupplierService = angular.module('dataSupplierService', []);

dataSupplierService.factory('DataChunk', [
	function() {
		return {
		  getChunk:
			function() {
				return this.getBit()*16+this.getBit()*4+this.getBit()*1;
			},
		  getBit:
			function() {
				return Math.floor(Math.random() * 3)
			}
		}
	}	
]);


