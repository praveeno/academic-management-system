goog.provide('myApp.directive.timeline');

(function() {
  'use strict';
  myApp.directive.timeline =  function() {
    return {
      restrict: 'E',
      scope: {
        data:'='
      },
      templateUrl: '/static/templates/timeline-content.html',
      controller:  function($scope,$timeout)
      {
        
      }
    }
  };
  myApp.main.directive('timeline', myApp.directive.timeline);
})();
