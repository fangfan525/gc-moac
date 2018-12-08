var nodemailer = require("nodemailer");

//smtp options
var transport = nodemailer.createTransport(sails.config.email);

function sendmail(ToEmail, Subject, Content, callback) {
  var mailoptions = {
    from: sails.config.email.auth.user,
    to: ToEmail,
    subject: Subject,
    text: Content
  };

  transport.sendMail(mailoptions, function (error, response) {
    transport.close();
    if (error) {
      sails.log.error('fail to send email to ' + ToEmail + ', error: ' + JSON.stringify(error));
    }
    callback(error ? false : true, error);
  });
}

module.exports = {
  sendmail: sendmail
};
