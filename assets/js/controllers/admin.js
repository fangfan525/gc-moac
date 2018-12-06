'use strict';

angular.module('moac')
  .run(['$rootScope', '$state', function($rootScope, $state){
    // $rootScope.isLogin = localStorage.getItem('isLogin') === 'true' ;
    // $rootScope.isAdmin = localStorage.getItem('isAdmin')=== 'true';
    // $rootScope.user = JSON.parse(localStorage.getItem('user'));
    //
    // $rootScope.effect = 'random';
    // if (!$rootScope.isLogin) {
    //   $state.go('index');
    // }
  }])

  .controller('IndexCtrl', ['$scope', '$rootScope', '$http', '$state',
    function ($scope, $rootScope, $http, $state) {

    }])

  ;
