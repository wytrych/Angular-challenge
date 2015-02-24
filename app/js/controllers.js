'use strict';

var MinIONApp = angular.module('MinIONApp', [
		'ngDialog',
		'dataSupplierService',
		'sequenceMatcherService',
		'MinIONAppFilters'
		]);

function SequenceListCtrl($scope, ngDialog, $http, DataChunk, $interval, transcriberFilter, SequenceMatcher, $window, $filter) {
	$scope.id = 0;
	$scope.buffer = 0;
	$scope.prevBuffer = 0;
	$scope.counter = 0;
	$scope.seqError = false;

	$scope.startDataCollection = function() {
		var rate = 10
		$scope.interval = $interval(function() {
			var bufferSize = 10000

			$scope.counter += bufferSize
			$scope.buffer = DataChunk.getBuffer(bufferSize)


			$scope.sequences.forEach(function(d) {
				d.rate += SequenceMatcher.count(transcriberFilter(d.structure),$scope.buffer)
			});
		},rate)
	}

	$scope.validate = function(input) {
		if (angular.isUndefined(input))
			return false;
		return true;
	}

	$scope.stopDataCollection = function() {
		$interval.cancel($scope.interval)
	}

	$scope.clear = function() {
		$scope.buffer = 0;
		$scope.counter = 0;
		$scope.sequences.forEach(function(d) {
			d.rate = 0;
		})
	}


	$http.get('strands/strands.json').success(function(data) {
		$scope.sequences = data;
	});

	$scope.save = function() {
		$scope.report = $scope.sequences.slice(0)
		$scope.report.push({samples:$scope.counter,date:$filter('date')(Date.now(),'medium')})
		$http.post('report.txt', $scope.report).success(function() {
			$window.location.href = '/report.txt'
		});
	}


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
		var REGEX = /\S{4,}|[^AGCT\s]|((^|\s)\S{1,2}($|\s))/;

		if (REGEX.test($scope.editSeq.structure)) {
			$scope.seqError = true;
			return false
		}

		if (editId === -1)
			$scope.sequences.push($scope.editSeq)
		else
			$scope.sequences[editId] = angular.copy($scope.editSeq)

		$scope.seqError = false
		return true
	}

	$scope.remove = function(removeId) {
		$scope.sequences.splice(removeId,1)
	}
}

//SequenceListCtrl.$inject = ['$scope','ngDialog','$http','DataChunk','ng','$interval'];
MinIONApp.controller('SequenceListCtrl', SequenceListCtrl);
