module.exports = {
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
