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

  .controller('AdminLoginCtrl', ['$scope', '$rootScope', '$http', '$state',
    function ($scope, $rootScope, $http, $state) {
      document.getElementsByTagName('header')[0].style.display = 'none';
      document.getElementsByTagName('footer')[0].style.display = 'none';
      $scope.adLogin = function(user) {
        if(!user || !user.username || !user.password){
          toastr.error("请完整填写表单！");
          return ;
        }
        user.password = hex_md5(user.password);
        $http.post('/adminLogin', user)
          .success(function(ret, status) {
            if (!ret.code || status !== 200) {
              return toastr.error(ret.msg);
            }
            $rootScope.admin = user.username;
            localStorage.setItem('admin', $rootScope.admin);
            toastr.success(ret.msg);
            $state.go('admin');
          });
      };
    }])
  .controller('AdminCtrl', ['$scope', '$rootScope', '$http', '$state',
    function ($scope, $rootScope, $http, $state) {
      document.getElementsByTagName('header')[0].style.display = 'none';
      document.getElementsByTagName('footer')[0].style.display = 'none';
      $scope.adTab = 'ad1';
      $scope.getAdprods = function(){
        $http.get('/admins/productList')
          .success(function(ret, status) {
            if (!ret.code || status !== 200) {
              return toastr.error(ret.msg);
            }
          $scope.adProds = ret.data;
          });
      };
      $scope.getAdprods();
      $scope.lottery = function (id) {
        $http.post('/admins/lottery',{id: id})
          .success(function(ret, status) {
            if (!ret.code || status !== 200) {
              return toastr.error(ret.msg);
            }
            return toastr.success(ret.msg);
          });
      }


    }])
  .filter('adStatus', function() {// 上线状态
    return function (adStatus) {
      switch(adStatus){
        case 0: return '未上线';
        case 1: return '已上线';
      }
    }
  })
  .filter('adStatus2', function() {// 放款状态
    return function (adStatus2) {
      switch(adStatus2){
        case 0: return '未放款';
        case 1: return '已放款';
      }
    }
  })
  ;
