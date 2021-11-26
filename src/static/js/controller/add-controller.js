goog.provide('myApp.ctrl.addController');

(function() {
  'use strict';
  myApp.ctrl.addController = function($scope,$location,$q, $firebaseObject, 
  	$firebaseAuth,$firebaseArray,$mdDialog,$mdSidenav,localStorageService,$window,$http)
  {
    $scope.selectweek = true;
    $scope.selectYear = true;
    $scope.teacher = angular.fromJson(localStorageService.get('userAuth'));
    console.log($scope.teacher)
    var nowDate = new Date();
    var today = nowDate.getTime();
    var sj = String(nowDate);
    $scope.Date= sj.slice(0,11);
    $scope.activity = {};
    $scope.assignment = {
      year:'',
      subject:'',
      lastDate:'',
      question:[]
    }
    $scope.timetableYear = '';
    $scope.checkYear = function() {
      console.log($scope.timetableYear)
      if($scope.timetableYear != '')
      {
        $scope.selectweek = false;
      }
      else
      {
        $scope.selectweek = true;
      }
    }
    $scope.checkWeek = function() {
      console.log($scope.timetableweekname)
      if($scope.timetableweekname != '')
      {
        $scope.selectYear = false;
      }
      else
      {
        $scope.selectYear = true;
      }
    }
    $scope.questionBank = [0]
    $scope.success = false;
    $scope.plzFillForm = false;
    $scope.error = false;
    var i=0;
    $scope.addQuestions = function() {
      $scope.questionBank.push(i);
      i++;
    }

    $scope.deleteQuestion = function(number) {
      $scope.questionBank.splice(number,1);
    }
    $scope.send = function() {
      var send = {
      method:'POST',
      url:'https://fcm.googleapis.com/fcm/send',
      headers:{
        'Content-Type':'application/json',
        common:{
          Authorization:{
            key:'x0sxUCLqWDiYWfeXV1KQmY7zsinzaoRNMjbXHp4OWw6b4JV7aSBX4PXej0n9e-AX'
          }
        }
      },
      data:{ 
        "data": 
        {
          "score": "5x1",
          "time": "15:10"
        },
        "to" : "bk3RNwTe3H0:CI2k_HHwgIpoDKCIZvvDMExUdFQ3P1..."
      }
    }
      $http.post(send).then(function(resp){console.log(resp)})
    }
    $scope.sendActivity = function()
    {
      var ref;
      $scope.$submitted = true;
      if($scope.activity.year == ''||$scope.activity.year == null || $scope.activity.year == undefined)
      {
        $scope.plzFillForm = true;
      }
      else if($scope.activity.year != '')
      {
        if($scope.activity.year != 'timeline' )
        {
          ref=firebase.database().ref().child("clgapp").child($scope.activity.year).child($scope.activity.type);
        }
        else if($scope.activity.year == 'timeline')
        {
          ref=firebase.database().ref().child("timeline").child($scope.activity.type);
        }
        $scope.messages = $firebaseArray(ref);
        $scope.messages.$loaded()
        .then(function() {
          $scope.messages.$add({
            title:$scope.activity.title,
            content:$scope.activity.content,
            when:$scope.activity.when.getTime(),
            where : $scope.activity.where,
            contact : {
              name:$scope.activity.contact.name,
              phone:$scope.activity.contact.phone,
            },
            Create : {
              date : today,
              who : {
                name:$scope.teacher.name,
                photo:$scope.teacher.photo,
                uid:$scope.teacher.uid
              }
            }
          });
          $scope.success = true;
          $scope.reset = angular.copy($scope.activity);
          $scope.activity = {};
          $scope.activityForm.$setPristine();
          $scope.activityForm.$setValidity();
          $scope.activityForm.$setUntouched();
        })
        .catch(function(err) {
          console.log(err);
        $scope.error = true;
        });
        // $scope.send();
      }
    }
    $scope.sendAssignment =  function() {
      $scope.$submitted = true;
      if($scope.assignment.year != '' &&  $scope.assignment.year != '' && $scope.assignment.question != [])
        {
          var ref=firebase.database().ref().child("clgapp").child($scope.assignment.year).child('assignment').child($scope.assignment.subject);
          $scope.messages = $firebaseArray(ref);
          var lastDate = $scope.assignment.lastDate.getTime();
          console.log($scope.assignment)
          $scope.messages.$loaded()
          .then(function() {
            $scope.messages.$add({
              question:$scope.assignment.question,
              lastdate:lastDate,
              Create : {
                date : today,
                who : {
                  name:$scope.teacher.name,
                  photo:$scope.teacher.photo,
                  uid:$scope.teacher.uid
                }
              }
            });
            $scope.success = true;
            $scope.reset = angular.copy($scope.assignment);
            $scope.assignment = {
              year:'',
              subject:'',
              question:[]
            };
            // $scope.assignmentForm.$setPristine();
            // $scope.assignmentForm.$setValidity();
            // $scope.assignmentForm.$setUntouched();
          })
          .catch(function(err) {
            console.log(err);
            $scope.error = true;
          });
        }
      } 
      var reference;
      $scope.timetable = {
        object:{}
      };
      $scope.timetableTemp = {};
      $scope.SearchTimeTable = function() {
        reference = firebase.database().ref().child("clgapp").child($scope.timetableYear).child("timetable");
        var messages = $firebaseObject(reference);

        messages.$bindTo($scope, "timetablearray");
        messages.$loaded().then(function() {
          var tempStore = angular.copy($scope.timetablearray);
          for(var x in tempStore.object)
          {
            var temp = tempStore.object[x];
            for(var y in tempStore.object[x])
            { 
              if(temp[y].time)
              {
                var nowDate = new Date(temp[y].time);
                console.log(nowDate);
                temp[y].time = nowDate;
              }
            }
          }
          $scope.timetable = tempStore
        })
      .catch(function(err) {
        console.error(err);
      }); 
    }
    $scope.SendTimeTable = function() {
      reference = firebase.database().ref().child("clgapp").child($scope.timetableYear).child("timetable");
        var messages = $firebaseObject(reference);
        messages.$bindTo($scope, "timetablearray");
        messages.$loaded().then(function() {
          $scope.timetablearray = angular.copy($scope.timetable);
          for(var x in $scope.timetablearray.object)
          {
            var temp = $scope.timetablearray.object[x];
            var object = {
              name:x
            }
            temp.push(object); 
            for(var y in temp)
            {
              console.log(temp[y].time);
              if(temp[y].time)
              {
                var nowDate = temp[y].time.getTime();
                temp[y].time = nowDate;
              }
            }
          }
          $scope.timetable = {};
          $scope.timetableweekname = "";
          $scope.timetableYear = "";
        })
      .catch(function(err) {
        console.error(err);
      }); 
       
       
       
    }

 	  $scope.openMenu = function($mdMenu, ev) {
      originatorEv = ev;
      $mdMenu.open(ev);
    }
     $scope.buildToggler = function(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }
    $scope.toggleLeft = $scope.buildToggler('left');
    
    }
    myApp.ctrl.addController.$inject= ['$scope','$location','$q','$firebaseObject', 
    '$firebaseAuth','$firebaseArray','$mdDialog','$mdSidenav','localStorageService','$window','$http'];
    myApp.main.controller('addController',myApp.ctrl.addController);
})();



