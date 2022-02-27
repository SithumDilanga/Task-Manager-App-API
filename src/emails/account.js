const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'sithum.9dilanga@gmail.com',
    subject: 'Thanks for joining us!',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app`
  });
}

const sendAccCancelEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'sithum.9dilanga@gmail.com',
    subject: 'Goodbye!',
    text: `Its so sad to see you go, ${name}. Could you tell us why you leave?`
  });
}

module.exports = {
  sendWelcomeEmail,
  sendAccCancelEmail
};