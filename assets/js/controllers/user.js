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
      //发送验证码
      $scope.sendEmail = function(user){
        var pattern = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
        if(!user || !user.email){
          toastr.warning("请填写邮箱地址！");
          return ;
        }
        if(!pattern.test(user.email)){
          toastr.warning('请输入合法的邮箱地址');
          return;
        }
        $http({
          method: "GET",
          url: '/util/email?email='+ user.email
        }).success(function (result, status) {
          if (!result.success) {
            toastr.error(result.msg);
          }else{
            toastr.success(result.msg);
          }
        });
      };
      //重置密码
      $scope.resetPwd = function (user) {
        if(!user || !user.pwd || !user.pwd2 || !user.email || !user.verify_code){
          toastr.warning('请将注册信息填写完整');
          return;
        }
        if(user.pwd !== user.pwd2){
          toastr.warning('两次密码不一致');
          return;
        }
        $http({
          method: "POST",
          url: "/reset",
          dataType: 'json',
          data: {
            'email': user.email,
            'pwd': hex_md5(user.pwd)
          }
        }).success(function (result, status) {
          if (!result.code) {
            toastr.error(result.msg);
          }else{
            toastr.success(result.msg);
          }
        });
      };
    }])
  .controller('PersonCtrl', ['$scope', '$rootScope', '$http', '$state',
    function ($scope, $rootScope, $http, $state) {
      $scope.personTab = 'account';//account账号信息；money提币；order我的单号
      $scope.recordTab = 'record1';//record1捐献记录；record2提币记录；record3中奖记录
      $scope.logout = function() {
        $http.get('/logout')
          .success(function(ret, status) {
            if (!ret.code || status !== 200) {
              return toastr.error(ret.msg);
            }
            $rootScope.isLogin = false;
            $rootScope.user = null;
            localStorage.clear();
            toastr.success(ret.msg);
            $state.go('login');
          });
      };

      $scope.getUserInfo = function() {
        $http.get('/userCenter')
          .success(function(ret, status) {
            if (!ret.code || status !== 200) {
              if(ret.msg === '你还没有登录'){
                toastr.error(ret.msg);
                $state.go('login');
                return;
              }
              return toastr.error(ret.msg);
            }
            $scope.userInfo = ret.user;
            $scope.userCurrency = ret.userCurrency;
            $scope.trade = ret.trade;
            $scope.reward = ret.reward;
            $scope.balance = ret.balance;
            $scope.tibi = ret.tibi;
            $scope.order = ret.order;
          });
      };
      $scope.getUserInfo();

      $scope.submitTibi = function (tibi) {
        if(!tibi || !tibi.addr || !tibi.amount){
          toastr.warning('请将信息填写完整');
          return;
        }

      }

    }])

 .filter('status', function() {// 提币状态
    return function (status) {
      switch(status){
        case 0: return '提币中';
        case 1: return '提币成功';
      }
    }
  })
;
