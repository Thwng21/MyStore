const express = require('express');
require('dotenv').config();
const connectDB = require('./src/config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const passMail = process.env.EMAIL_PASS;
const nodemailer = require('nodemailer'); // Gửi mail
const app = express();

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json()); // QUAN TRỌNG: để đọc được body

// const studentRoutes = require('./src/Routes/student.route');
const authRoutes = require('./src/routes/auth.route');
const productRoutes = require('./src/routes/product.route');
const categoryRoutes = require('./src/routes/category.route');
const tableRoutes = require('./src/routes/table.route');
const orderRoutes = require('./src/routes/order.route');
// const orderItemRoutes = require('./src/routes/orderItem.route');

connectDB();

app.post('/sendMail', async (req, res) => {
    const {email} = req.body;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "thanthuong21504@gmail.com",
            pass: passMail,
        },
    });

    // Wrap in an async IIFE so we can use await.
    (async () => {
        try {
            const info = await transporter.sendMail({
                from: '"thanthuong21504@gmail.com',
                to: email, // Không cần template string ở đây
                subject: "Hello ✔",
                text: "Hello world?", // plain‑text body
                html: "<b>Hello world?</b>", // HTML body
            });
            console.log("Message sent:", info.messageId);
            res.status(200).send("Email sent successfully");
        } catch (err) {
            console.error("Lỗi gửi mail:", err);
            if (err.code === 'EAUTH') {
                console.error("Lỗi xác thực: Vui lòng kiểm tra lại App Password trong file .env. Đảm bảo bạn đã bật xác thực 2 bước và tạo mật khẩu ứng dụng.");
            }
            res.status(500).send("Lỗi khi gửi email: " + err.message);
        }
    })()
});

// app.use('/api/students', studentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/orders', orderRoutes);
// app.use('/api/order-items', orderItemRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server chạy ở http://localhost:${PORT}`));