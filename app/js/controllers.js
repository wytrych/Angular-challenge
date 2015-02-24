'use strict';

var MinIONApp = angular.module('MinIONApp', [
		'ngDialog',
		'dataSupplierService',
		'MinIONAppFilters'
		]);

function SequenceListCtrl($scope, ngDialog, $http, DataChunk, $interval, transcriberFilter) {
	$scope.id = 0;
	$scope.buffer = 0;
	$scope.prevBuffer = 0;
	$scope.counter = 0;


	console.log(transcriberFilter("AAG AGA AAC"))
	
	$scope.startDataCollection = function() {
		$scope.interval = $interval(function() {
			$scope.counter += 500;
			$scope.buffer = DataChunk.getChunk()
		},10)
	}

	$scope.stopDataCollection = function() {
		$interval.cancel($scope.interval)
	}

	$scope.clear = function() {
		$scope.buffer = 0;
		$scope.counter = 0;
	}


	$http.get('strands/strands.json').success(function(data) {
		$scope.sequences = data;
	});


	$scope.dialog = function(seqId) {
		if (angular.isDefined(seqId)) {
			$scope.id = seqId
			$scope.editSeq = angular.copy($scope.sequences[$scope.id])

		} else {
			$scope.editSeq = {'name': "", "structure": "", 'rate':0}
			$scope.id = -1
		}

		ngDialog.open({ template: 'popup.html',className: 'ngdialog-theme-default',scope: $scope });
	}

	$scope.editSequence = function(editId) {
		if (editId === -1)
			$scope.sequences.push($scope.editSeq)
		else
			$scope.sequences[editId] = angular.copy($scope.editSeq)
	}

	$scope.remove = function(removeId) {
		$scope.sequences.splice(removeId,1)
	}
}

//SequenceListCtrl.$inject = ['$scope','ngDialog','$http','DataChunk','ng','$interval'];
MinIONApp.controller('SequenceListCtrl', SequenceListCtrl);
