/**
 * 200 (Feedback) Response
 *
 * Usage:
 * return res.feedback(success, data, msg);
 *
 * @param  {Boolean} success
 * @param  {Object} data
 * @param  {String} msg
 *
 */

module.exports = function feedback(success, data, msg) {
  // Get access to `req`, `res`, & `sails`
  var res = this.res;
  res.status(200);
  res.end(JSON.stringify({'success': success, 'data': data, 'msg': msg}));
};
