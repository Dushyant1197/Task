const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  requireTLS: true,
  auth: {
    user: "shubhamparmar027@gmail.com",
    pass: "wlveryhtsfddmlme",
  },
});

const sendConfirmationMail = async (name, email, id) => {
  const verificationLink = `http://localhost:4000/verify/${id}`;
  try {
    const info = await transporter.sendMail({
      from: "shubhamparmar027@gmail.com", // sender address
      to: email, // list of receivers
      subject: "For Verification", // Subject line
      html: `<p>Hello ${name} , Please Click here for <a href=${verificationLink}>Verify</a> You're Mail  </p>`, // html body
    });

    console.log("Message sent: %s", info);
  } catch (error) {
    console.log("ERROR : ", error);
  }
};

module.exports = { sendConfirmationMail };
