// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

require("dotenv").config({ path: "server.env" });
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const fromEmail = process.env.FROM_EMAIL;

function mailSender(msg) {
    msg = {
        to: msg.toMails,
        from: fromEmail,
        subject: msg.subject,
        html: msg.content,
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}

module.exports = mailSender;