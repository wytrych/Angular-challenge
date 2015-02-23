'use strict';

var MinIONApp = angular.module('MinIONApp', ['ngDialog']);

function SequenceListCtrl($scope, ngDialog, $http) {
	$scope.id = 0;

	$http.get('strands/strands.json').success(function(data) {
		$scope.sequences = data;
	});


	$scope.dialog = function(seqId) {
		if (!angular.isUndefined(seqId)) {
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

SequenceListCtrl.$inject = ['$scope','ngDialog','$http'];
MinIONApp.controller('SequenceListCtrl', SequenceListCtrl);
