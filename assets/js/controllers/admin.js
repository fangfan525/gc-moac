'use strict';

angular.module('moac')
  .run(['$rootScope', '$state', function($rootScope, $state){
    $rootScope.admin = localStorage.getItem('admin');
    if (!$rootScope.admin) {
      $state.go('adLogin');
    }
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
      if (!$rootScope.admin) {
        $state.go('adLogin');
        return;
      }
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
      $scope.lottery = function (id) {//项目放款
        $http.post('/admins/lottery',{id: id})
          .success(function(ret, status) {
            if (!ret.code || status !== 200) {
              return toastr.error(ret.msg);
            }
            $scope.getAdprods();
            return toastr.success(ret.msg);
          });
      };
      $scope.getPtradeList = function () {
        $http.get('/admins/ptradeList')
          .success(function(ret, status) {
            if (!ret.code || status !== 200) {
              return toastr.error(ret.msg);
            }
            $scope.ptradeList = ret.list;
          });
      };
      $scope.getRewardList = function () {
        $http.get('/admins/rewardList')
          .success(function(ret, status) {
            if (!ret.code || status !== 200) {
              return toastr.error(ret.msg);
            }
            console.log(JSON.stringify(ret.list));
            $scope.rewardList = ret.list;
          });
      };

      $scope.lotterySjr = function (id) { //给受捐人打款
        $http.post('/admins/lotterySjr',{id: id})
          .success(function(ret, status) {
            if (!ret.code || status !== 200) {
              return toastr.error(ret.msg);
            }
              $scope.getPtradeList();
            return toastr.success(ret.msg);
          });
      };
      $scope.lotteryZjr = function (id) {//给中奖人打款
        $http.post('/admins/lotteryZjr',{id: id})
          .success(function(ret, status) {
            if (!ret.code || status !== 200) {
              return toastr.error(ret.msg);
            }
              $scope.getRewardList();
            return toastr.success(ret.msg);
          });
      };


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
  .filter('adStatus3', function() {// 放款状态
    return function (adStatus3) {
      switch(adStatus3){
        case 0: return '未打款';
        case 1: return '已打款';
      }
    }
  })
  ;
