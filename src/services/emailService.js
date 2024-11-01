// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

dotenv.config({ path: 'server.env' });
const sgMail = require('@sendgrid/mail')
const dotenv = require('dotenv');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const fromEmail = process.env.FROM_EMAIL;
const sendGridApiKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(sendGridApiKey);

function mailSender(msg) {
    const msg = {
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