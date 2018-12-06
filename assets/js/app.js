'use strict';

var moac = angular.module('moac', ['ui.router']);

moac.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/index/index");


    $stateProvider
      .state('index', {
        url: '/index',
        templateUrl: 'templates/index.html'
      })
      .state('index.index', {
        url: '/index',
        templateUrl: 'templates/index/tab1.html',
        controller:'IndexCtrl'
      })
      .state('index.prods', {
        url: '/prods',
        templateUrl: 'templates/index/tab2.html'
      })
      .state('index.active', {
        url: '/active',
        templateUrl: 'templates/index/tab3.html'
      })
      .state('index.intro', {
        url: '/intro',
        templateUrl: 'templates/index/tab4.html'
      })
      .state('details', {
        url: '/details',
        templateUrl: 'templates/details.html',
        controller:'DetailsCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller:'LoginCtrl'
      })
      .state('forgot', {
        url: '/forgot',
        templateUrl: 'templates/forgotPwd.html',
        controller:'ForgotCtrl'
      })
      .state('person', {
        url: '/person',
        templateUrl: 'templates/users/person.html',
        controller:'PersonCtrl'
      })
    ;
  }]);

