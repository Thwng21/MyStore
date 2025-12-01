const User = require("../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthService {
  // Đăng ký
  async register(userData) {
    const { username, fullname, phone, password, role } = userData;

    // Kiểm tra user đã tồn tại (username hoặc phone)
    const existingUser = await User.findOne({
      $or: [{ username }, { phone }],
    });
    
    if (existingUser) {
      if (existingUser.username === username) {
        throw new Error("Username đã tồn tại");
      }
      if (existingUser.phone === phone) {
        throw new Error("Số điện thoại đã được sử dụng");
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tạo user mới
    const user = await User.create({
      username,
      fullname,
      phone,
      password: hashedPassword,
      role: role || "customer",
    });

    // Tạo token
    const token = this.generateToken(user._id, user.role);

    return {
      user: {
        id: user._id,
        username: user.username,
        fullname: user.fullname,
        phone: user.phone,
        role: user.role,
      },
      token,
    };
  }

  // Đăng nhập
  async login(identifier, password) {
    // Tìm user theo username hoặc phone
    const user = await User.findOne({
      $or: [{ username: identifier }, { phone: identifier }],
    });
    
    if (!user) {
      throw new Error("Tài khoản hoặc mật khẩu không đúng");
    }

    // Kiểm tra password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Tài khoản hoặc mật khẩu không đúng");
    }

    // Tạo token
    const token = this.generateToken(user._id, user.role);

    return {
      user: {
        id: user._id,
        username: user.username,
        fullname: user.fullname,
        phone: user.phone,
        role: user.role,
      },
      token,
    };
  }

  // Lấy user theo ID
  async getUserById(userId) {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new Error("Không tìm thấy user");
    }
    return user;
  }

  // Đổi mật khẩu
  async changePassword(userId, oldPassword, newPassword) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Không tìm thấy user");
    }

    // Kiểm tra old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new Error("Mật khẩu cũ không đúng");
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    return true;
  }

  // Generate JWT token
  generateToken(userId, role) {
    return jwt.sign(
      { id: userId, role },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "30d" }
    );
  }

  // Verify token
  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    } catch (error) {
      throw new Error("Token không hợp lệ");
    }
  }
}

module.exports = new AuthService();