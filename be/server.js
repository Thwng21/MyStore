const express = require('express');
require('dotenv').config();
const connectDB = require('./src/config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();
// const studentRoutes = require('./src/Routes/student.route');
 const authRoutes = require('./src/routes/auth.route');

connectDB();

app.use(cors({
    origin: 'http://localhost:3000', // Thay đổi theo địa chỉ frontend của bạn
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json()); // QUAN TRỌNG: để đọc được body

// app.use('/api/students', studentRoutes);
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server chạy ở http://localhost:${PORT}`));