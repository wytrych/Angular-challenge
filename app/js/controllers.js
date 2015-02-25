'use strict';

var MinIONApp = angular.module('MinIONApp', [
		'ngDialog',
		'dataSupplierService',
		'sequenceMatcherService',
		'colorService',
		'MinIONAppFilters'
		]);

function SequenceListCtrl($scope, ngDialog, $http, DataChunk, $interval, transcriberFilter, SequenceMatcher, $window, $filter, Color) {
	$scope.id = 0;
	$scope.buffer = 0;
	$scope.prevBuffer = 0;
	$scope.counter = 0;
	$scope.seqError = false;
	$scope.dialogOpen = false

	$scope.startDataCollection = function() {
		var rate = 1000
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
		$scope.sequences.forEach(function(el,i) {
			el.color = Color.get(i)
		})
	});

	$scope.save = function() {
		$scope.report = $scope.sequences.slice(0)
		$scope.report.push({samples:$scope.counter,date:$filter('date')(Date.now(),'medium')})
		$http.post('report.txt', $scope.report).success(function() {
			$window.location.href = '/report.txt'
		});
	}


	$scope.dialog = function(seqId) {
		$scope.dialogOpen = true

		if (angular.isDefined(seqId)) {
			$scope.id = seqId
			$scope.editSeq = angular.copy($scope.sequences[$scope.id])

		} else {
			$scope.editSeq = {'name': "", "structure": "", 'rate':0}
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
		var REGEX = /\S{4,}|[^AGCT\s]|((^|\s)\S{1,2}($|\s))/;
console.log($scope.editSeq)

		if ($scope.editSeq.structure === "" || $scope.editSeq.name === "") {
			$scope.seqError = true;
			return false;
		}

		if (REGEX.test($scope.editSeq.structure)) {
			$scope.seqError = true;
			return false
		}


		if (editId === -1) {
			$scope.editSeq.color = Color.get($scope.sequences.length)
			$scope.sequences.push($scope.editSeq)
		} else
			$scope.sequences[editId] = angular.copy($scope.editSeq)

		$scope.seqError = false
		return true
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

MinIONApp.
   //camel cased directive name
   //in your HTML, this will be named as bars-chart
   directive('barsChart', function ($parse) {
     //explicitly creating a directive definition variable
     //this may look verbose but is good for clarification purposes
     //in real life you'd want to simply return the object {...}
     var directiveDefinitionObject = {
         //We restrict its use to an element
         //as usually  <bars-chart> is semantically
         //more understandable
         restrict: 'E',
         //this is important,
         //we don't want to overwrite our directive declaration
         //in the HTML mark-up
         replace: false,
	 scope: {data: '=chartData'},
         link: function (scope, element, attrs) {
           //converting all data passed thru into an array
           //var data = attrs.chartData.split(',');
           //in D3, any selection[0] contains the group
           //selection[0][0] is the DOM node
           //but we won't need that this time
           //to our original directive markup bars-chart
           //we add a div with out chart stling and bind each
           //data entry to the chart
           	var chart = d3.select(element[0]).append("svg").attr("class", "chart").attr("viewBox","0 0 400 400");
		var width = 400;
		var height = 400;

		var y = d3.scale.linear()
    			.range([height, 0]);

		var gap = 10

		chart.append("rect")
		    .attr("x",0)
		    .attr("y",0)
		    .attr("width",500)
		    .attr("height",500)
		    .attr("style","fill:white")

	    scope.$watch('data',function() {
		    console.log('pipa')
		if (angular.isUndefined(scope.data))
		    return;
		var data = scope.data

		console.log(data)


		y.domain([0, d3.max(data, function(d) { return d.rate; })]);

  		var barWidth = (width-gap) / data.length;


  		var bar = chart.selectAll("g")
		    .data(data)


		bar
		    .transition().ease("linear")
		    .attr("transform", function(d, i) { return "translate(" + ( gap + i * barWidth )  + ",0)"; })

		bar
	    	    .select("rect")
			.attr("style",function(d) {return "fill:"+d.color})
      			.attr("y", function(d) { return y(d.rate); })
      			.attr("width", barWidth - gap)
			//.transition()
			//.attr("height", function(d) { return height - y(d.rate); })

  		bar
		    .enter().append("g")
		    .attr("transform", function(d, i) { return "translate(" + ( gap + i * barWidth ) + ",0)"; })
  			.append("rect")
      			.attr("y", function(d) { return y(d.rate); })
			.attr("height", 1000) //function(d) {  return height - y(d.rate); })
      			.attr("width", barWidth - gap)
			.attr("style",function(d) {return "fill:"+d.color})

	    	bar
			.exit().remove()

  		/*bar.append("text")
      			.attr("x", barWidth / 2)
      			.attr("y", function(d) { return y(d.value) + 3; })
      			.attr("dy", ".75em")
      			.text(function(d) { return d.value; });*/
            /*var bars = chart.selectAll('div')
             	.data(scope.data)
		    
            bars
             .transition().duration(1000)
             .style("width", function(d) { return d + "%"; })
             .text(function(d) { return d + "%"; });

	    bars.enter().append("div")
             .style("width", function(d) { return d + "%"; })
             .text(function(d) { return d + "%"; });*/

	    },true)

           //a little of magic: setting it's width based
           //on the data value (d) 
           //and text all with a smooth transition
         } 
      };
      return directiveDefinitionObject;
   });

MinIONApp.directive('minionRectangle', ['Color', function(Color) {
return {
    restrict: 'AE',
    replace: true,
    template:function(elem, attrs) { return  '<svg class="rect" viewBox="0 0 100 100" style="fill:{{sequence.color}}"><rect x="0" y="0" width="200" height="200" /></svg>' },
  };
}]);
//return
