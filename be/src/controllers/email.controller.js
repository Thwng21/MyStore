const emailService = require('../services/email.service');
const { getHtmlTemplate } = require('../templates/email.template');

const sendMail = async (req, res) => {
    const { email, subject, message, ctaLink, ctaText, senderName, logoUrl } = req.body;
    
    // Tạo nội dung HTML từ template
    const htmlContent = getHtmlTemplate(
        subject || "Thông báo từ Quán Nhậu Vân Xe",
        message || "Xin chào, đây là email từ hệ thống Quán Nhậu Vân Xe.",
        ctaLink,
        ctaText,
        logoUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaOA47HDvEIEHB5B0rhnpf7NiwG1chbGpwiw&s'
    );

    try {
        await emailService.sendEmail(
            email,
            subject || "Thông báo từ Quán Nhậu Vân Xe",
            message || "Xin chào, đây là email từ hệ thống.", // Fallback text version
            htmlContent,
            senderName // Tên người gửi tùy chỉnh
        );
        res.status(200).send("Email sent successfully");
    } catch (err) {
        if (err.code === 'EAUTH') {
            console.error("Lỗi EAUTH: Google yêu cầu sử dụng 'App Password' (Mật khẩu ứng dụng).");
            console.error("1. Bật xác thực 2 bước cho Gmail.");
            console.error("2. Tạo App Password tại https://myaccount.google.com/apppasswords");
            console.error("3. Dán mật khẩu 16 ký tự vào file .env biến EMAIL_PASS");
        }
        res.status(500).send("Lỗi khi gửi email: " + err.message);
    }
};

module.exports = { sendMail };
