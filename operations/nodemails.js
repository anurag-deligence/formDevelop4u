const nodemailer = require('nodemailer');
//require('dotenv').config();
module.exports.nodeMail = (userObject, callback) => {

  nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      port: 25,
      auth: {
        user: 'anurag.deligence@gmail.com',
        pass: '*******'
      },
      tls: {
        rejectUnauthorized: false
      }
    })
    let mailOptions = {
      from: 'aky7503051815@gmail.com',
      to: userObject.email,
      subject: "classmate.com",
      html: '<p>The Details are :- </p><p>Project Type :- ' + userObject.projectType + '</p><p>Budget :- ' + userObject.budget + '</p><p>Timeline :- ' + userObject.timeline + '</p><p>Get Started :- ' + userObject.getStarted + '</p><p>Project Details :- ' + userObject.projectDetails + '</p>'
      // <p>Location Preference :- ' + userObject.locationPref + '</p>'
      //  html: '<p>Click <a href="http://localhost:4200/' + userObject + '">here</a> to reset your password</p>"'
    };
    transporter.sendMail(mailOptions, callback);
  })
}
