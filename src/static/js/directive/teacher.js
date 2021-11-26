goog.provide('myApp.directive.teacher');

(function() {
	'use strict';
	myApp.directive.teacher =  function() {
		return {
			restrict: 'E',
			scope: {
				data:'=',
				number:'@'
			},
			templateUrl: '/static/templates/teacher.html',
			controller:  function($scope,$timeout)
			{
				$scope.data.subjectData[$scope.number] = {
					branch:'',
					year:'',
					subject:''
				}
			}
		}
	};
	myApp.main.directive('teacher', myApp.directive.teacher);
})();
