const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (to, subject, text, html, senderName = "Quan Nhau Van Xe") => { /// tên người gửi mặc định
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "thuong21504@gmail.com",
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: `"${senderName}" <thuong21504@gmail.com>`,
            to: to,
            subject: subject,
            text: text,
            html: html,
        });
        console.log("Message sent:", info.messageId);
        return info;
    } catch (err) {
        console.error("Lỗi gửi mail:", err);
        throw err;
    }
};

module.exports = { sendEmail };
