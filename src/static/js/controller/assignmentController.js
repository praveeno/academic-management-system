goog.provide('myApp.ctrl.assignmentController');

(function() {
  'use strict';
  myApp.ctrl.assignmentController = function($scope,$location,$q, $firebaseObject, 
  	$firebaseAuth,$firebaseArray,$mdDialog,$mdSidenav,localStorageService,$window)
  {
 	
    $scope.student = angular.fromJson(localStorageService.get('userAuth'));
    if(localStorageService.get('userAuth') != null)
    {
      $scope.student = angular.fromJson(localStorageService.get('userAuth'));
      console.log($scope.student)
    }
    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }
    $scope.assignment = '';
    $scope.loadData = function() {
      var ref = firebase.database().ref("clgapp").child($scope.student.year).child("assignment");
      var messages = $firebaseArray(ref);
         messages.$loaded().then(function() {
          console.log(messages);
          $scope.assignment = messages;
         })
        .catch(function(err) {
        console.error(err);
        });
    }
    $scope.loadData();
  }
    myApp.ctrl.assignmentController.$inject= ['$scope','$location','$q','$firebaseObject', 
    '$firebaseAuth','$firebaseArray','$mdDialog','$mdSidenav','localStorageService','$window'];
    myApp.main.controller('assignmentController',myApp.ctrl.assignmentController);


})();









