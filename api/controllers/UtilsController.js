/**
 * UtilsController
 *
 * @description :: Server-side logic for managing deposits
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

// 产生6位随机整数
function rndNum(n) {
  var rnd = "";
  var arr_number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  for (var i = 0; i < n; i++) {
    var id = Math.floor(Math.random() * 10);
    if (i === 0 && id === 0) id = 1;
    rnd += arr_number[id];
  }
  return Number(rnd);
}

module.exports = {
  sendEmailCode: function (req, res) {
    var email = req.param('email');
    if (!email) {
      return res.feedback(false, null, CONST.ERR_MISS_PARAMETERS);
    }
    var code = rndNum(6);
    var content = '您正在绑定邮箱，您的验证码是：'
      + code + CONST.MSG_CODE_TAIL;
    EmailUtil.sendmail(email, CONST.MSG_CODE_TITLE, content, function (success, msg) {
      if (false === success) {
        return res.feedback(success, null, msg.code === 'EMESSAGE' ? CONST.ERR_SEND_CODE_FREQUENTLY : msg);
      }
      req.session.verifyCode = '' + code;
      req.session.verifyCodeTime = new Date().getTime();
      req.session.checkInfo = email;
      return res.feedback(success, null, success ? CONST.OK_SEND_CODE : msg);
    });
  }
};

