'use strict';

angular.module('moac')
  .run(['$rootScope', '$state', function ($rootScope, $state) {
    // $rootScope.isLogin = localStorage.getItem('isLogin') === 'true' ;
    // $rootScope.isAdmin = localStorage.getItem('isAdmin')=== 'true';
    $rootScope.user = localStorage.getItem('user');
    //
    // $rootScope.effect = 'random';
    // if (!$rootScope.isLogin) {
    //   $state.go('index');
    // }
  }])

  .controller('IndexCtrl', ['$scope', '$rootScope', '$http', '$state',
    function ($scope, $rootScope, $http, $state) {

    }])

  .controller('DetailsCtrl', ['$scope', '$rootScope', '$http', '$state',
    function ($scope, $rootScope, $http, $state) {

    }])
  .controller('ForgotCtrl', ['$scope', '$rootScope', '$http', '$state',
    function ($scope, $rootScope, $http, $state) {

    }])
  .controller('PersonCtrl', ['$scope', '$rootScope', '$http', '$state',
    function ($scope, $rootScope, $http, $state) {
      $scope.personTab = 'account';//account账号信息；money提币；order我的单号
      $scope.recordTab = 'record1';//record1捐献记录；record2提币记录；record3中奖记录
    }])

;
