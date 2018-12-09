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
        if(!user || !user.name || !user.pwd){
          toastr.error("请完整填写表单！");
          return ;
        }
        user.pwd = hex_md5(user.pwd);
        $http.post('/adminLogin', user)
          .success(function(ret, status) {
            if (!ret.code || status !== 200) {
              return toastr.error(ret.msg);
            }
            $rootScope.admin = user.name;
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

    }])

  ;
