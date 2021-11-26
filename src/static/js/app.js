goog.provide('myApp.ctrl.mainctrl');
(function() {
    "use strict";
    myApp.ctrl.mainctrl =   function($scope,$mdDialog,$mdSidenav,$location){
	    var config = {
	      apiKey: "AIzaSyBOMjaTJlNK9fVm7TvQWQs7xLh7htzK6yg",
	      authDomain: "test-7ffb9.firebaseapp.com",
	      databaseURL: "https://test-7ffb9.firebaseio.com",
	      storageBucket: "test-7ffb9.appspot.com",
	      messagingSenderId: "275472224162"
	    };
	    firebase.initializeApp(config);
	    $scope.user = {
	    	login : "",
	    	error:"",
				loader : false
	    }
	    var originatorEv;
	 		$scope.openMenu = function($mdMenu, ev) {
	      originatorEv = ev;
	      $mdMenu.open(ev);
	    };
	    $scope.toggleLeft = buildToggler('left');
	    function buildToggler(componentId) {
      		return function() {
	        $mdSidenav(componentId).toggle();
	      };
    	}
    	$scope.$on('$locationChangeSuccess', function(next, current) { 
            var whereAmINow = $location.url();
            if(whereAmINow == "/")
            {
            	$scope.title = "SSCE College App";
            	$scope.showBeforeAuth = false;
            }
            if(whereAmINow == "/details")
            {
            	$scope.title = "A Warm Greeting";
            	$scope.showBeforeAuth = false;
            }
            if(whereAmINow == "/timeline")
            {
            	$scope.title = "Your Timeline";
            	$scope.showBeforeAuth = true;
            }
            if(whereAmINow == "/add")
            {
            	$scope.title = "Add";
            	$scope.showBeforeAuth = true;
            }
            if(whereAmINow == "/assignment")
            {
            	$scope.title = "SSCE College App";
            	$scope.showBeforeAuth = true;
            }
            if(whereAmINow == "/timetable")
            {
            	$scope.title = "SSCE College App";
            	$scope.showBeforeAuth = true;
            }
            if(whereAmINow == "/notification")
            {
            	$scope.title = "SSCE College App";
            	$scope.showBeforeAuth = true;
            }
            
         });
    }

    myApp.ctrl.mainctrl.$inject= ['$scope','$mdDialog','$mdSidenav','$location'];
    myApp.main.controller('mainctrl',myApp.ctrl.mainctrl);
})();
