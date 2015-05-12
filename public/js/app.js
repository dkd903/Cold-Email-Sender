'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'partials/index',
      controller: 'IndexCtrl'
    }).  
    when('/addSchedule', {
      templateUrl: 'partials/addschedule',
      controller: 'AddScheduleCtrl'
    }). 
    when('/addEmail', {
      templateUrl: 'partials/addemail',
      controller: 'AddEmailCtrl'
    }). 
    when('/addTemplate', {
      templateUrl: 'partials/addtemplate',
      controller: 'AddTemplateCtrl'
    }).        
    when('/view1', {
      templateUrl: 'partials/partial1',
      controller: 'MyCtrl1'
    }).
    when('/view2', {
      templateUrl: 'partials/partial2',
      controller: 'MyCtrl2'
    }).
    otherwise({
      redirectTo: '/view1'
    });

  $locationProvider.html5Mode(true);
});
