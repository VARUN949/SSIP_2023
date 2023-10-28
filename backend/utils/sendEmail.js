require('dotenv').config();
const nodemail = require("nodemailer")
const sendEmail = async (options)=>{
    const transporter = nodemail.createTransport({
        host:"smtp.gmail.com",
        port:process.env.SMTP_PORT,
        service:process.env.SMTP_SERVICE,
        auth:{
            user:process.env.SMTP_EMAIL,
            pass:process.env.SMTP_PASSWORD,
        },
    });
    // console.log(options.message)
    
    const mailOptions = {
        from:process.env.SMTP_EMAIL,
        to:options.email,
        subject:options.subject,
        text:options.message
    }

    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail;
