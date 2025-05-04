const nodeMailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodeMailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: title,
      html: body
    });

    return info;
  } catch (e) {
    console.log(e);
  }
};

module.exports = mailSender;
