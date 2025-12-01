const getHtmlTemplate = (title, message, ctaLink, ctaText, logoUrl) => {
    return `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Open+Sans:wght@400;600&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Open Sans', sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #f9f9f9 100%);
            margin: 0;
            padding: 20px;
            color: #333333;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        .container {
            max-width: 650px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        /* Header với background gradient đẹp */
        .header {
            background: linear-gradient(135deg, 
                #c62828 0%, 
                #e53935 30%, 
                #ff6f00 100%);
            padding: 40px 30px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, 
                #ffd600 0%, 
                #ff6f00 50%, 
                #c62828 100%);
        }
        
        .logo-container {
            margin-bottom: 20px;
        }
        
        .logo {
            max-width: 180px;
            max-height: 100px;
            height: auto;
            object-fit: contain;
            filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2));
        }
        
        .header h1 {
            font-family: 'Montserrat', sans-serif;
            color: #ffffff;
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: 0.5px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .header-subtitle {
            color: rgba(255, 255, 255, 0.9);
            font-size: 16px;
            margin-top: 8px;
            font-weight: 400;
        }
        
        /* Nội dung chính */
        .content {
            padding: 40px 35px;
            line-height: 1.7;
        }
        
        .content-title {
            font-family: 'Montserrat', sans-serif;
            color: #c62828;
            font-size: 24px;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 2px solid #ffecb3;
            font-weight: 700;
        }
        
        .message-box {
            background-color: #fff8e1;
            border-left: 4px solid #ffb300;
            padding: 20px;
            border-radius: 0 8px 8px 0;
            margin-bottom: 30px;
            font-size: 16px;
            color: #5d4037;
            line-height: 1.8;
        }
        
        /* Nút CTA */
        .cta-container {
            text-align: center;
            margin: 35px 0;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #e53935 0%, #ff6f00 100%);
            color: #ffffff;
            text-decoration: none;
            padding: 16px 40px;
            border-radius: 50px;
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            font-size: 16px;
            letter-spacing: 0.5px;
            box-shadow: 0 6px 20px rgba(229, 57, 53, 0.3);
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        
        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(229, 57, 53, 0.4);
        }
        
        .cta-button:active {
            transform: translateY(-1px);
        }
        
        .cta-button::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.7s;
        }
        
        .cta-button:hover::after {
            left: 100%;
        }
        
        /* Phần signature */
        .signature {
            margin-top: 40px;
            padding-top: 25px;
            border-top: 1px dashed #ffcc80;
            text-align: center;
        }
        
        .signature-text {
            font-style: italic;
            color: #5d4037;
            font-size: 16px;
            margin-bottom: 8px;
        }
        
        .signature-name {
            font-family: 'Montserrat', sans-serif;
            font-weight: 700;
            color: #c62828;
            font-size: 18px;
        }
        
        /* Footer */
        .footer {
            background-color: #2c2c2c;
            padding: 30px 20px;
            text-align: center;
            color: #ffffff;
            font-size: 14px;
        }
        
        .footer-content {
            max-width: 500px;
            margin: 0 auto;
        }
        
        .footer-title {
            font-family: 'Montserrat', sans-serif;
            font-size: 16px;
            color: #ffb300;
            margin-bottom: 15px;
            font-weight: 600;
        }
        
        .footer-info {
            color: #bdbdbd;
            line-height: 1.6;
            margin-bottom: 20px;
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin: 25px 0;
        }
        
        .social-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background-color: #424242;
            color: #ffffff;
            text-decoration: none;
            font-weight: bold;
            transition: all 0.3s ease;
            font-size: 18px;
        }
        
        .social-link.facebook {
            background-color: #3b5998;
        }
        
        .social-link.zalo {
            background-color: #0068ff;
        }
        
        .social-link:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .copyright {
            color: #9e9e9e;
            font-size: 13px;
            margin-top: 25px;
            padding-top: 20px;
            border-top: 1px solid #424242;
        }
        
        /* Responsive */
        @media (max-width: 600px) {
            body {
                padding: 10px;
            }
            
            .header {
                padding: 30px 20px 25px;
            }
            
            .header h1 {
                font-size: 24px;
            }
            
            .content {
                padding: 30px 25px;
            }
            
            .content-title {
                font-size: 22px;
            }
            
            .cta-button {
                padding: 14px 30px;
                font-size: 15px;
                width: 100%;
                max-width: 280px;
            }
            
            .social-links {
                gap: 15px;
            }
        }
        
        @media (max-width: 400px) {
            .header h1 {
                font-size: 22px;
            }
            
            .content {
                padding: 25px 20px;
            }
            
            .message-box {
                padding: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo-container">
                ${logoUrl 
                    ? `<img src="${logoUrl}" alt="Logo Quán Nhậu Vân Xe" class="logo" />` 
                    : `<h1>Quán Nhậu Vân Xe</h1>`
                }
            </div>
            <p class="header-subtitle">Hương vị miền Trung - Ấm tình bè bạn</p>
        </div>
        
        <div class="content">
            <h2 class="content-title">${title}</h2>
            
            <div class="message-box">
                ${message}
            </div>
            
            ${ctaLink && ctaText ? `
            <div class="cta-container">
                <a href="${ctaLink}" class="cta-button">${ctaText}</a>
            </div>
            ` : ''}
            
            <div class="signature">
                <p class="signature-text">Trân trọng cảm ơn quý khách!</p>
                <p class="signature-name">Đội ngũ Quán Nhậu Vân Xe</p>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-content">
                <h3 class="footer-title">Liên hệ với chúng tôi</h3>
                
                <div class="footer-info">
                    <p><strong>Địa chỉ:</strong> 110 DH10 Hòa Giang, Gò Nổi, Đà Nẵng</p>
                    <p><strong>Điện thoại:</strong> 0903 129 370</p>
                    <p><strong>Giờ mở cửa:</strong> 10:00 - 23:00 (Tất cả các ngày trong tuần)</p>
                </div>
                
                <div class="social-links">
                    <a href="https://www.facebook.com/pham.huu.than.thuong" class="social-link facebook" target="_blank">
                   
                        FB
                    </a>
                    <a href="https://zalo.me/0903129370" class="social-link zalo" target="_blank">
                        ZL
                    </a>
                </div>
                
                <div class="copyright">
                    <p>&copy; ${new Date().getFullYear()} Quán Nhậu Vân Xe. Mọi quyền được bảo lưu.</p>
                    <p style="margin-top: 5px; font-size: 12px;">Email này được gửi tự động, vui lòng không trả lời.</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
    `;
};

module.exports = { getHtmlTemplate };