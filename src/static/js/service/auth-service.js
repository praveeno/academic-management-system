goog.provide('myApp.service.authService');

goog.require('myApp.main');
(function() {
    "use strict";
    myApp.service.authService = function($q, localStorageService) {
      var app = {};
      var localUser = localStorageService.get('userAuth');
      app.localData = function() {
        if(localUser != null) {
          return (function() {
            var vm = {};
            vm.goHome = function() {
              if(localUser === 'student') {
                $location.path('timeline');
              }
              else {
                $location.path('teacherHome');
              }
            }
            vm.data = localUser;
            return vm;
          })
        }
      }
    } 
    myApp.service.authService.$inject = ['$q', 'localStorageService']
    myApp.main.factory('authService', myApp.service.authService)
})();