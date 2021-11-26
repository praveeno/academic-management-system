goog.provide('myApp.ctrl.timetableController');

(function() {
  'use strict';
  myApp.ctrl.timetableController = function($scope,$location,$q, $firebaseObject, 
  	$firebaseAuth,$firebaseArray,$mdDialog,$mdSidenav,localStorageService,$window)
  {
    $scope.student = angular.fromJson(localStorageService.get('userAuth'));

    if(localStorageService.get('userAuth') != null)
    {
      $scope.student = angular.fromJson(localStorageService.get('userAuth'));
      console.log($scope.student)
    }	
    $scope.timetable = {};
    $scope.loadData = function() {
        var reference = firebase.database().ref('clgapp').child($scope.student.year).child("timetable");
        var studentBranchData = $firebaseObject(reference);
        studentBranchData.$loaded().then(function() {
          console.log(studentBranchData);
          // $scope.yearNotificationData = studentBranchData;
          studentBranchData.$bindTo($scope, "timetable");
         })
        .catch(function(err) {
        console.error(err);
        });
    }
    $scope.loadData();
  }

    myApp.ctrl.timetableController.$inject= ['$scope','$location','$q','$firebaseObject', 
    '$firebaseAuth','$firebaseArray','$mdDialog','$mdSidenav','localStorageService','$window'];
    myApp.main.controller('timetableController',myApp.ctrl.timetableController);


})();









