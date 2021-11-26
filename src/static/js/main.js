goog.provide('myApp.main');
goog.provide('myApp.directive');
goog.provide('myApp.service');
goog.provide('myApp.ctrl');
(function() {
	"use strict";
    myApp.ctrl = {}
    myApp.directive = {}
    myApp.service = {}
    myApp.filter = {}
    myApp.main = angular.module('myApp.main', ['ngAria','ngAnimate','ngMaterial',
        'ngRoute','firebase','LocalStorageModule','smartTime']);

    myApp.main.config(['$routeProvider','$locationProvider','localStorageServiceProvider','$mdThemingProvider', function($routeProvider, $locationProvider,localStorageServiceProvider,$mdThemingProvider) {
        $locationProvider.hashPrefix('');
        $mdThemingProvider.theme('default')
        .primaryPalette('grey')
        .accentPalette('teal');
    $routeProvider
    .when("/", {
        templateUrl : "static/templates/login.html",
        controller : "loginController"
    })
    .when("/details", {
        templateUrl : "static/templates/details.html",
        controller : 'detailsController'
    })
    .when("/timeline", {
        templateUrl : "static/templates/timeline.html",
        controller : "timelineController"
    })
    .when("/add", {
        templateUrl : "static/templates/add.html",
        controller : "addController"
    })
    .when("/notification", {
        templateUrl : "static/templates/notification.html",
        controller : "notificationController"
    })
    .when("/timetable", {
        templateUrl : "static/templates/timetable.html",
        controller : "timetableController"
    })
    .when("/assignment", {
        templateUrl : "static/templates/assignment.html",
        controller : "assignmentController"
    })
    .when("/about", {
        templateUrl : "static/templates/aboutme.html"
        // controller : "assignmentController"
    })
    // .otherwise({redirectTo: '/'});
    localStorageServiceProvider.setPrefix('myApp.main');
    // .otherwise({
    //     templateUrl : "<h1>None</h1><p>Nothing has been selected,</p>"
    // });
    // use the HTML5 History API
    // $locationProvider.html5Mode(true);
    }]);
})();
