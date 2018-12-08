/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },


  /**
   * 用户端请求接口
   * */

  //用户注册
  'POST /register': 'UserController.register',
  //用户登录
  'POST /login': 'UserController.login',
  //退出登录
  'POST /logout': 'UserController.logout',
  //个人中心
  'POST /userCenter': 'UserController.userCenter',

  //发送邮箱验证码
  'GET /util/email': 'UtilsController.sendEmailCode',

  //首页数据
  'POST /index': 'IndexController.index',
  //项目列表
  'POST /productList': 'ProductController.productList',
  //项目详情
  'POST /productDetail': 'ProductController.productDetail',
  //项目交易
  'POST /trade': 'ProductController.trade',
  //项目放款
  'POST /lottery': 'ProductController.lottery',
  //添加提币地址
  'POST /addTibiAddress': 'TibiController.addTibiAddress',
  //提币操作
  'POST /tibi': 'TibiController.tibi',


  /*后台管理界面 */
  //后台首页
  'GET /admin': 'admin/AdminController.index',
  //项目列表页面
  'GET /admin/productList': 'admin/AdminController.productList',



  /*后台请求接口 */
  //项目列表数据
  'POST /admins/productList': 'admin/ProductController.productList',



  //测试功能
  'GET /test': 'TestController.testList',
  //测试功能2
  'GET /test2': 'TestController.testList2',
  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
