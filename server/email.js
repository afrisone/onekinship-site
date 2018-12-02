const nodemailer = require("nodemailer");
const config = require("../config");

if (!config) {
  config = {
    e: process.env.e,
    ep: process.env.ep
  };
}

function sendEmail(emailParams) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: config.e,
      pass: config.ep
    }
  });

  // TODO: uncomment this for live / make sure appropriate smtp is used
  return transporter.sendMail({
    host: "smtp.gmail.com",
    port: "465",
    ssl: true,
    domain: "localhost",
    to: config.es,
    from: config.e,
    subject: "OneKinship Contact Request",
    html: `
            <p>Name: ${emailParams.name}</p>
            <p>Email: ${emailParams.email}</p>
            <p>Number: ${emailParams.number}</p>
            <p>Message:</p>
            <p>${emailParams.message}</p>
        `,
    authentication: "login"
  });
}

module.exports = sendEmail;
