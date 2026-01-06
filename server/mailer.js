const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "mail.southernlabs.com",
  port: 587,
  secure: false,
  auth: {
    user: "idah@southernlabs.com",
    pass: "EMAIL_PASSWORD" // replace with your actual password
  }
});

module.exports = async (to, subject, text) => {
  await transporter.sendMail({
    from: '"SouthernLabs" <idah@southernlabs.com>',
    to,
    subject,
    text
  });
};

