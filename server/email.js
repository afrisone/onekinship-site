const nodemailer = require('nodemailer')
const config = require('../config')

function sendEmail(emailParams) {
    const transporter = nodemailer.createTransport({
        host : "smtp.gmail.com",
        auth: {
            user: config.email,
            pass: config.password
        }
    })

    return transporter.sendMail({
        host : "smtp.gmail.com",
        port : "465",
        ssl: true,
        domain : "localhost",
        to : config.email,
        from : config.email,
        subject : 'OneKinship Contact Request',
        html: `
            <p>Name: ${emailParams.name}</p>
            <p>Email: ${emailParams.email}</p>
            <p>Number: ${emailParams.number}</p>
            <p>Message:</p>
            <p>${emailParams.message}</p>
        `,
        authentication : "login"
    })
}

module.exports = sendEmail
