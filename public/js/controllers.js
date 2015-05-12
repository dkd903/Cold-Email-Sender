'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });

  }).
  controller('IndexCtrl', function ($scope, $http) {
    $http({
      method: 'GET',
      url: '/api/emails'
    }).
    success(function (data, status, headers, config) {
      $scope.emails = data.emails;
    }).
    error(function (data, status, headers, config) {
      $scope.emails = 'Error!';
    });

  }).  
  controller('AddEmailCtrl', function ($scope, $http, $location) {

    $http({
      method: 'GET',
      url: '/api/emails'
    }).
    success(function (data, status, headers, config) {
      $scope.emails = data.emails;
    }).
    error(function (data, status, headers, config) {
      $scope.emails = 'Error!';
    }); 

    $scope.form = {};
    $scope.submitEmail = function () {
    $http.post('/api/email', $scope.form).
      success(function(data) {
        window.location.reload();
      });
    }; 

  }).  
  controller('AddTemplateCtrl', function ($scope, $http, $location) {

    $http({
      method: 'GET',
      url: '/api/templates'
    }).
    success(function (data, status, headers, config) {
      $scope.templates = data.templates;
    }).
    error(function (data, status, headers, config) {
      $scope.templates = 'Error!';
    });  

    $scope.form = {};
    $scope.addTemplate = function () {
      $http.post('/api/template', $scope.form).
        success(function(data) {
          $location.path('/addTemplate');
          window.location.reload();
        });
    }

  }).   
  controller('AddScheduleCtrl', function ($scope, $http, $location) {

    $http({
      method: 'GET',
      url: '/api/templates'
    }).
    success(function (data, status, headers, config) {
      $scope.templates = data.templates;
      $scope.items = data.templates
      $scope.selectedItem = null;

    }).
    error(function (data, status, headers, config) {
      $scope.templates = 'Error!';
    });  

    $http({
      method: 'GET',
      url: '/api/emails'
    }).
    success(function (data, status, headers, config) {
      $scope.emails = data.emails;
    }).
    error(function (data, status, headers, config) {
      $scope.emails = 'Error!';
    });     

    $scope.form = {};
    $scope.newObject = {};
    $scope.sendEmail = function () {
      $scope.form.emails = $scope.newObject;
      $http.post('/api/sendemail', $scope.form).
        success(function(data) {
          //$location.path('/addTemplate');
          //window.location.reload();
        });
    };

  }).   
  controller('MyCtrl1', function ($scope) {
    // write Ctrl here

  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  });
