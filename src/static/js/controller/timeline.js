goog.provide('myApp.ctrl.timelineController');

(function() {
  'use strict';
  myApp.ctrl.timelineController = function($scope,$location,$q, $firebaseObject, 
  	$firebaseAuth,$firebaseArray,$mdDialog,$mdSidenav,localStorageService,$window)
  {
  	
    $scope.student = angular.fromJson(localStorageService.get('userAuth'));
    
    
    const messaging = firebase.messaging();
    messaging.onTokenRefresh(function() {
    messaging.getToken()
    .then(function(refreshedToken) {
      console.log('Token refreshed.');
      // Indicate that the new Instance ID token has not yet been sent to the
      // app server.
      setTokenSentToServer(false);
      // Send Instance ID token to app server.
      sendTokenToServer(refreshedToken);
      // ...
    })
    .catch(function(err) {
      console.log('Unable to retrieve refreshed token ', err);
      showToken('Unable to retrieve refreshed token ', err);
    });
  });
    messaging.onMessage(function(payload) {
      console.log("Message received. ", payload);
      // ...
    });
    
    messaging.requestPermission()
    .then(function() {
      console.log('Notification permission granted.');
        messaging.getToken()
        .then(function(currentToken) {
          if (currentToken) {
            sendTokenToServer(currentToken);
            updateUIForPushEnabled(currentToken);
          } else {
            // Show permission request.
            console.log('No Instance ID token available. Request permission to generate one.');
            // Show permission UI.
            updateUIForPushPermissionRequired();
            setTokenSentToServer(false);
          }
        })
        .catch(function(err) {
          console.log('An error occurred while retrieving token. ', err);
          showToken('Error retrieving Instance ID token. ', err);
          setTokenSentToServer(false);
        });
      })
    .catch(function(err) {
      console.log('Unable to get permission to notify.', err);
    });
    $scope.activityAll = [];
    $scope.activityClass = [];
    $scope.loadData = function() {
    	var ref = firebase.database().ref("timeline").child("activity");
      var messages = $firebaseArray(ref);
      var reference = firebase.database().ref('clgapp').child('csfour').child("activity");
      var studentBranchData = $firebaseArray(reference);
      
      messages.$loaded().then(function() {
        $scope.activityAll = messages;
      })
      .catch(function(err) {
        console.error(err);
      });
      studentBranchData.$loaded().then(function() {
          $scope.activityClass = studentBranchData;
      })
      .catch(function(err) {
        console.error(err);
      });
    }
    $scope.loadData();
    $window.delete = function() {
		localStorageService.clearAll();
		return "TASK DONE";
	}
	$scope.signOut = function() {
		localStorageService.clearAll();
		$location.path('/')
	}

  }

    myApp.ctrl.timelineController.$inject= ['$scope','$location','$q','$firebaseObject', 
    '$firebaseAuth','$firebaseArray','$mdDialog','$mdSidenav','localStorageService','$window'];
    myApp.main.controller('timelineController',myApp.ctrl.timelineController);


})();









