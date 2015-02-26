'use strict';

var MinIONApp = angular.module('MinIONApp', [
		'ngDialog',
		'dataSupplierService',
		'sequenceMatcherService',
		'sequenceDialogService',
		'colorService',
		'backendService',
		'ngResource',
		'MinIONAppFilters'
		]);

function SequenceListCtrl($scope, ngDialog, $http, DataChunk, $interval, transcriberFilter, SequenceMatcher, $window, $filter, Color, SequenceEditor, BackendConnection) {
	$scope.id = 0;
	$scope.buffer = 0;
	$scope.prevBuffer = 0;
	$scope.counter = 0;
	$scope.seqError = false;
	$scope.dialogOpen = false
	$scope.showWeights = false

	$scope.weights = [.25,.25,.25]

	$scope.startDataCollection = function() {
		var rate = 200
		$scope.interval = $interval(function() {
			var bufferSize = 10000

			$scope.counter += bufferSize
			$scope.buffer = DataChunk.getBuffer(bufferSize,$scope.weights)


			$scope.sequences.forEach(function(d) {
				d.rate += SequenceMatcher.count(transcriberFilter(d.structure),$scope.buffer)
				d.prob = d.rate*100/$scope.counter;
			});
		},rate)
	}

	$scope.validate = function(input) {
		if (angular.isUndefined(input))
			return fal
		return true;
	}

	$scope.stopDataCollection = function() {
		$interval.cancel($scope.interval)
	}

	$scope.clear = function() {
		$scope.buffer = 0
		$scope.counter = 0
		$scope.sequences.forEach(function(d) {
			d.rate = 0
			d.prob = 0
		})
	}


	$scope.sequences = BackendConnection.get()

	/*	$http.get('strands/strands.json').success(function(data) {
		$scope.sequences = data;
		$scope.sequences.forEach(function(el,i) {
			el.color = Color.get(i)
		})
	});*/

	$scope.save = function() {
		BackendConnection.save($scope.sequences,$scope.counter)
	}


	$scope.dialog = function(seqId) {
		$scope.seqError = false
		$scope.dialogOpen = true

		if (angular.isDefined(seqId)) {
			$scope.id = seqId
			$scope.editSeq = angular.copy($scope.sequences[$scope.id])

		} else {
			$scope.editSeq = {'name': "", "structure": "", 'prob':0, 'rate':0}
			$scope.id = -1
		}

		$scope.openedDialog = ngDialog.open({ template: 'popup.html',className: 'ngdialog-theme-default',scope: $scope });
	}

	$scope.dialogClose = function() {
		$scope.openedDialog.close()
		$scope.dialogOpen = false

		return true
	}

	$scope.editSequence = function(editId) {

		$scope.seqError = !SequenceEditor.editSequence(editId,$scope.editSeq,$scope.sequences)

		return !$scope.seqError

	}

	$scope.remove = function(removeId) {
		$scope.sequences.splice(removeId,1)
		$scope.dialogClose()
	}

	$scope.enterKey = function(keyEvent,editId) {
 	 	if (keyEvent.which === 13)
			return $scope.editSequence(editId)

		return false
	}
}

		

//SequenceListCtrl.$inject = ['$scope','ngDialog','$http','DataChunk','ng','$interval'];
MinIONApp.controller('SequenceListCtrl', SequenceListCtrl);
