module.exports = {
  
  //首页页面
  index: function (req, res) {
    if (req.session.admin) {
      res.view('admin/statistics', {
        layout: 'admin/layout'
      });
    } else {
      return res.redirect('/admin/login');
    }
  },
  //修改密码页面
  changepwd: function (req, res) {
    if (req.session.admin) {
      var id = req.session.admin.id;
      res.view('admin/changepwd', {
        layout: 'admin/layout',
        id: id,
      });
    } else {
      return res.redirect('/admin/login');
    }
  },
  //项目列表页面
  productList: function (req, res) {
    if (req.session.admin) {
      res.view('admin/productList', {
        layout: 'admin/layout'
      });
    } else {
      return res.redirect('/admin/login');
    }
  },
  //文章管理页面
  article: function (req, res) {
    if (req.session.admin) {
      res.view('admin/article', {
        layout: 'admin/layout'
      });
    } else {
      return res.redirect('/admin/login');
    }
  },
  //文章添加/编辑页面
  addArticle: function (req, res) {
    var id = req.param('id');
    if (req.session.admin) {
      res.view('admin/addArticle', {
        layout: 'admin/layout',
        id: id,
      });
    } else {
      return res.redirect('/admin/login');
    }
  },
  //banner管理页面
  flash: function (req, res) {
    if (req.session.admin) {
      res.view('admin/flash', {
        layout: 'admin/layout'
      });
    } else {
      return res.redirect('/admin/login');
    }
  },
  //banner添加/编辑页面
  addFlash: function (req, res) {
    var id = req.param('id');
    if (req.session.admin) {
      res.view('admin/addFlash', {
        layout: 'admin/layout',
        id: id
      });
    } else {
      return res.redirect('/admin/login');
    }
  },
  //交易对管理页面
  trade: function (req, res) {
    if (req.session.admin) {
      res.view('admin/trade', {
        layout: 'admin/layout'
      });
    } else {
      return res.redirect('/admin/login');
    }
  },
  //交易对添加/编辑页面
  addTrade: function (req, res) {
    var id = req.param('id');
    if (req.session.admin) {
      res.view('admin/addTrade', {
        layout: 'admin/layout',
        id: id
      });
    } else {
      return res.redirect('/admin/login');
    }
  },
  //授信管理页面
  credit: function (req, res) {
    if (req.session.admin) {
      res.view('admin/credit', {
        layout: 'admin/layout'
      });
    } else {
      return res.redirect('/admin/login');
    }
  },
  
  
  //订单管理
  order: function (req, res) {
    var id = req.param('id');
    if (req.session.admin) {
      res.view('admin/order', {
        layout: 'admin/layout',
        id: id
      });
    } else {
      return res.redirect('/admin/login');
    }
  },
  //平台账号管理
  usersAccount: function (req, res) {
    var id = req.param('id');
    if (req.session.admin) {
      res.view('admin/usersAccount', {
        layout: 'admin/layout',
        id: id
      });
    } else {
      return res.redirect('/admin/login');
    }
  },
  //登录页面
  login: function (req, res) {
    if (req.session.admin) {
      return res.redirect('/admin');
    } else {
      res.view('admin/login');
    }
  },
  /*
  * 管理员登录
  * @param req
  * @param res
  * */
  adminLogin: function (req, res) {
    var username = req.param('username');
    var password = req.param('password');
    if (!username || !password) {
      return res.json({
        code: 0,
        msg: '用户名或密码不能为空'
      });
    }
    Admin.findOne({ username: username }).exec(function (err, model) {
      if (err) {
        return res.json({
          code: 0,
          msg: '管理员登录失败' + err
        });
      } else if (!model) {
        return res.json({
          code: 0,
          msg: '管理员不存在'
        });
        
      } else if (password != model.password) {
        return res.json({
          code: 0,
          msg: '密码错误'

        });
      } else if (model.status != 1) {
        return res.json({
          code: 0,
          msg: '账号已被锁定'
        });
      }
      req.session.admin = model;
      return res.json({
        code: 1,
        msg: '登录成功',
      });
    });
  },
  /*
    *退出登录
    * @param req
    * @param res
    * */
  adminLogout: function (req, res) {
    delete req.session.admin;
    return res.redirect('/admin/login');
    /*return res.json({
      code:1,
      msg:'退出成功',
    });*/
  },
 
  /*
  * 获取管理员列表
  * @param req
  * @param res
  * */
  getAdminList: function (req, res) {
    var page = req.param('page') ? req.param('page') : 0;
    var cond = {};
    cond.limit = 10;
    cond.skip = 10 * page;
    cond.sort = 'createdAt DESC';
    Admin.find(cond).exec(function (err, _admins) {
      if (err) {
        sails.log.error('getAdminList-DB_find: ' + err);
        return res.feedback(ResultCode.ERR_ADMIN_LIST, {});
      }
      Admin.count({}).exec(function (err2, _count) {
        if (err2) {
          sails.log.error('getAdminList-DB_count: ' + err2);
          return res.feedback(ResultCode.ERR_ADMIN_LIST, {});
        }
        return res.feedback(ResultCode.OK_ADMIN_LIST, { data: _admins, count: _count });
      });
    });
  },
  
  /***
   * 管理端获取用户列表
   * @param req
   * @param res
   */
  getUserList: function (req, res) {
    var itemsPerPage = req.param("itemsPerPage") ? req.param("itemsPerPage") : 10;
    var skipCount = (req.param("page")) * itemsPerPage;//页面传值从0开始
    var text = req.param("text");//邮箱
    var condition = {};
    var countCon = {};
    if (text) {
      condition.email = { 'like': '%' + text + '%' };
      countCon.email = { 'like': '%' + text + '%' };
    }
    condition.limit = itemsPerPage;
    condition.skip = skipCount;
    condition.sort = 'createdAt DESC';
    User.find(condition, function (err, result) {
      if (err) {
        sails.log.error("getUserList-DB:" + err);
        return res.feedback(ResultCode.ERR_DB, {});
      }
      User.count(countCon, function (err2, count) {
        if (err2) {
          sails.log.error("getUserList-DB:" + err2);
          return res.feedback(ResultCode.ERR_DB, {});
        }
        var data = {
          'items': result,
          'totalPage': Math.ceil(count / itemsPerPage),
          'currentPage': skipCount
        };
        return res.feedback(ResultCode.OK_GET_USER_LIST, data);
      });
    });
  },
  

  
 
  
}
