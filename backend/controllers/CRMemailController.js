//import 'nodemailer' package
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

exports.crmEmailController = (request, response, next) => {
  const email_to = request.body.recipientEmail;
  const email_subject = request.body.subject;
  const email_message = request.body.message;

  transporter
    .sendMail({
      to: email_to,
      from: "sapretailmanagementsystem@gmail.com",
      subject: email_subject,
      text: email_message,
      secure: true,
    })
    .then((result) => {
      console.log("Email Send Successfully!!!!!!");
      console.log(result);
      response.send("Email Send Successfully!!!");
    })
    .catch((error) => {
      console.log("Error occured when sending email!!!");
      console.log(error);
    });
};
