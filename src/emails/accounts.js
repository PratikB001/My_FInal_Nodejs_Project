const sgmail = require('@sendgrid/mail');

sgmail.setApiKey(sgApiKey);

const sendWelcomeEmail = (email, name) => {
    sgmail.send({
        to: email,
        from: 'sumalybajra@gmail.com',
        subject: 'Welcome to the application',
        text: `Thank you for joining us, ${name}`
    })
}

const sendCancellationEmail = (email, name) => {
    sgmail.send({
        to: email,
        from: 'sumalybajra@gmail.com',
        subject: 'Thank you for being with us',
        text: `We hope to see you again, ${name}`
    })
}


module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}