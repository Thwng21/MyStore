const express = require('express');
require('dotenv').config();
const connectDB = require('./src/config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const passMail = process.env.EMAIL_PASS;
// const nodemailer = require('nodemailer'); // Gửi mail
const app = express();

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
}));

app.use(express.json()); // QUAN TRỌNG: để đọc được body

// const studentRoutes = require('./src/Routes/student.route');
const authRoutes = require('./src/routes/auth.route');
const productRoutes = require('./src/routes/product.route');
const categoryRoutes = require('./src/routes/category.route');
const tableRoutes = require('./src/routes/table.route');
const orderRoutes = require('./src/routes/order.route');
const emailRoutes = require('./src/routes/email.route');
// const orderItemRoutes = require('./src/routes/orderItem.route');

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/email', emailRoutes);
// app.use('/api/order-items', orderItemRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server chạy ở http://localhost:${PORT}`));