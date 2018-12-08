'use strict';
toastr.options.positionClass = "toast-bottom-right";
var moac = angular.module('moac', ['ui.router']);
function dateFormat(fmt, date) {
  var o = {
    "M+": date.getMonth() + 1,                 //月份
    "d+": date.getDate(),                    //日
    "h+": date.getHours(),                   //小时
    "m+": date.getMinutes(),                 //分
    "s+": date.getSeconds(),                 //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
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
  }])
  .filter('time', function () {
    return function (value) {
      var date = new Date(value * 1000);
      return dateFormat("yyyy-MM-dd hh:mm:ss", date);
    };
  });

