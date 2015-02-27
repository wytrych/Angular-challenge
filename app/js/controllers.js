'use strict';

var MinIONApp = angular.module('MinIONApp', [
		'ngDialog',
		'dataSupplierService',
		'sequenceMatcherService',
		'sequenceDialogService',
		'colorService',
		'backendService',
		'ngResource',
		'dataCollectionService',
		'MinIONAppFilters'
		]);

MinIONApp.controller('SequenceListCtrl', ['$scope', 'ngDialog', '$http', 'DataChunk', '$interval', 'transcriberFilter', 'SequenceMatcher', '$window', '$filter', 'Color', 'SequenceEditor', 'BackendConnection', 'DataCollection',
	       	function($scope, ngDialog, $http, DataChunk, $interval, transcriberFilter, SequenceMatcher, $window, $filter, Color, SequenceEditor, BackendConnection, DataCollection) {
	$scope.id = 0;
	$scope.buffer = 0;
	$scope.prevBuffer = 0;
	$scope.global = {'counter' : 0,
			'seqError': false};
	$scope.dialogOpen = false
	$scope.showWeights = false

	$scope.weights = [.25,.25,.25]

	$scope.startDataCollection = function() {
		var rate = 200
		var bufferSize = 10000

		DataCollection.start(rate,
				bufferSize,
				$scope.global,
				$scope.buffer,
				$scope.sequences,
				$scope.weights)

	}

	$scope.validate = function(input) {
		if (angular.isUndefined(input))
			return false

		return true
	}

	$scope.stopDataCollection = function() {
	       	DataCollection.stop()
	}

	$scope.clear = function() {
		$scope.buffer = 0
		$scope.global.counter = 0
		$scope.sequences.forEach(function(d) {
			d.rate = 0
			d.prob = 0
		})
	}


	$scope.sequences = BackendConnection.get()

	$scope.save = function() {
		BackendConnection.save($scope.sequences,$scope.global.counter)
	}


	$scope.dialog = function(seqId) {
		$scope.global.seqError = false
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

		$scope.global.seqError = !SequenceEditor.editSequence(editId,$scope.editSeq,$scope.sequences)

		return !$scope.global.seqError

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

}])

