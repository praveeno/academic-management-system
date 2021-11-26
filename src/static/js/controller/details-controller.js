goog.provide('myApp.ctrl.detailsController');

(function() {
  'use strict';
  myApp.ctrl.detailsController = function($scope,$q, $location,$firebaseObject, 
    $firebaseAuth,$firebaseArray,localStorageService){
      $scope.user.loader = false;
      var ref = firebase.database().ref();
      //set the data in local object
      var syncObject = $firebaseObject(ref);
      $scope.details = {
        subjectData : [],
        form:[]
      }
    //Add Three-Way, Object Bindings
    syncObject.$bindTo($scope, "data");
    console.log($scope.user.login)
    var storeLocally = function(auth)
    {
      var setThisData = {
        credential:$scope.user.login.credential.accessToken,
        name:$scope.user.login.user.providerData[0].displayName,
        email:$scope.user.login.user.providerData[0].email,
        photo:$scope.user.login.user.providerData[0].photoURL,
        uid:$scope.user.login.user.providerData[0].uid,
        loop:[],

      }
      if(auth == 'student')
      {
        setThisData.about = auth;
        setThisData.year = $scope.user.year;
        localStorageService.set('userAuth',angular.toJson(setThisData));
      }
      if(auth == 'teacher')
      {
        for(var i=0;i<$scope.details.subjectData.length;i++)
        {
          setThisData.about = auth;
          var object = {
            year : $scope.details.subjectData[i].year,
            subject : $scope.details.subjectData[i].subject
          }
          setThisData.loop.push(object);
        }
        console.log(setThisData);
        localStorageService.set('userAuth',angular.toJson(setThisData));
      }
    }
    $scope.showError = false;
    $scope.isFormValid = function() 
    { var j = 0;
      var i = 0;
      for(var i = 0; i < $scope.details.subjectData.length;i++)
      {
        var teacher = $scope.details.subjectData[i];
        if(teacher.year && teacher.branch && teacher.subject)
        {
          j++
        }
        if(j == $scope.details.subjectData.length)
        {
          $scope.showError = false;
          return true;
        }
        else
        {
          $scope.showError = true;
        }
      }
    }
    
    var i=0;
    $scope.dataset = [0];
    $scope.addSubject = function() {
      debugger;
      if($scope.isFormValid())
      {
        $scope.dataset.push(i);
        i++
      }
    }

     // syncObject.$loaded()
    // .then(function() {
    // $scope.data.clgapp.csfour = "kiran soni"
    // })
    // .catch(function(err) {
    // console.error(err);
    // });


    $scope.data ={
      cb2 : ''
    }
    $scope.send = function() {
      if($scope.isstudent == 'yes')
      {
        if($scope.user.year)
        {
         var ref = firebase.database().ref().child("clgapp").child($scope.user.year).child("student");
        
          $scope.messages = $firebaseArray(ref);
          $scope.messages.$add({
            name:$scope.user.login.user.providerData[0].displayName,
            email:$scope.user.login.user.providerData[0].email,
            photo:$scope.user.login.user.providerData[0].photoURL,
            uid : $scope.user.login.user.providerData[0].uid
          });
          storeLocally('student');
          $location.path("timeline");
        }
      }
      else if($scope.isteacher == 'yes' && $scope.secret == 'collegeadmin')
      {
        if($scope.isFormValid())
        {
          for(var i=0; i< $scope.details.subjectData.length; i++)
          {
            var teacher = $scope.details.subjectData[i];
            // $scope.data.clgapp.csfour.subject..teacher.name = "kiran soni"
            var ref = firebase.database().ref().child("clgapp").child(teacher.year).child("subject")
            .child(teacher.subject);
            var messages = $firebaseObject(ref);
            $scope.senddata = {};
            messages.$bindTo($scope, "senddata");
            messages.$loaded().then(function() {
                console.log(messages);
                $scope.senddata.name = $scope.user.login.user.providerData[0].displayName;
                $scope.senddata.email = $scope.user.login.user.providerData[0].email;
                $scope.senddata.photo = $scope.user.login.user.providerData[0].photoURL;
                $scope.senddata.uid  = $scope.user.login.user.providerData[0].uid;
            })
            .catch(function(err) {
            console.error(err);
            });
          }
          storeLocally('teacher');
          $location.path("add");
        }
      }
    }
  };

    myApp.ctrl.detailsController.$inject= ['$scope','$q','$location','$firebaseObject',
     '$firebaseAuth','$firebaseArray','localStorageService'];
    myApp.main.controller('detailsController',myApp.ctrl.detailsController);


})();