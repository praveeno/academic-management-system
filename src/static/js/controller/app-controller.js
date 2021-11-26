goog.provide('myApp.ctrl.loginController');

(function() {
  'use strict';
  myApp.ctrl.loginController = function(authService, $scope,$location,$q, $firebaseObject, $firebaseAuth,$firebaseArray,localStorageService){
    var user = authService.localData();
    if(user)
    {
      user.goHome();
    }
    $scope.click = function(siteName) {
      var auth = $firebaseAuth();
      $scope.user.loader = true;
      auth.$signInWithPopup(siteName).then(function(firebaseUser) {
          $scope.user.login = firebaseUser;
          console.log(firebaseUser)
          $location.path("details");
        }).catch(function(error) {
          $scope.user.error = error;
        });
      }
  }
    myApp.ctrl.loginController.$inject= ['authService', '$scope','$location','$q','$firebaseObject', '$firebaseAuth','$firebaseArray','localStorageService'];
    myApp.main.controller('loginController',myApp.ctrl.loginController);


})();