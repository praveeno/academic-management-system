goog.provide('myApp.ctrl.notificationController');

(function() {
  'use strict';
  myApp.ctrl.notificationController = function($scope,$location,$q, $firebaseObject, 
  	$firebaseAuth,$firebaseArray,$mdDialog,$mdSidenav,localStorageService,$window)
  {
  	
    $scope.student = angular.fromJson(localStorageService.get('userAuth'));
    $scope.toggleLeft = buildToggler('left');
    $scope.allNotificationData = [];
    $scope.yearNotificationData = [];
    $scope.loadData = function() {
      var ref = firebase.database().ref("timeline").child("notification");
      var messages = $firebaseArray(ref);
        var reference = firebase.database().ref('clgapp').child($scope.student.year).child("notification");
        var studentBranchData = $firebaseArray(reference);
         messages.$loaded().then(function() {
          console.log(messages);
          $scope.allNotificationData = messages;
         })
        .catch(function(err) {
        console.error(err);
        });
        studentBranchData.$loaded().then(function() {
          console.log(studentBranchData);
          $scope.yearNotificationData = studentBranchData;
         })
        .catch(function(err) {
        console.error(err);
        });
    }
    $scope.loadData();

  }

    myApp.ctrl.notificationController.$inject= ['$scope','$location','$q','$firebaseObject', 
    '$firebaseAuth','$firebaseArray','$mdDialog','$mdSidenav','localStorageService','$window'];
    myApp.main.controller('notificationController',myApp.ctrl.notificationController);


})();









