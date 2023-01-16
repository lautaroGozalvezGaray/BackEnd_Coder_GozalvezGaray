const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'lura.haag87@ethereal.email',
        pass: 'kRzkpCHeUTFTacG4rk'
    }
});

sendMail = async (subject, data, extra = '') => {
    const content = JSON.stringify(data)
    const mailOptions = {
        from: 'Ecommerce NodeJS',
        to: process.env.NODEMAILER_EMAIL_TO,
        subject: subject,
        html: `<h2>Datos recibidos:</h2><pre>${content}</pre><p>${extra}</p>`
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
    } catch (err) {
        console.log(err)
    }
}

module.exports = sendMail;