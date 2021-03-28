require("dotenv").config();

const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
export default function Mail(data) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail", // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = transporter.sendMail({
    from: process.env.EMAIL, // sender address
    to: data.email, // list of receivers
    subject: data.subject, // Subject line
    text: data.message, // plain text body
    // html: "<b>Hello world?</b>", // html body
  });
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account\
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

Mail().catch(console.error);
