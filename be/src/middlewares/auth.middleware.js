const authService = require("../services/auth.service");

// Middleware xác thực token
const authenticate = async (req, res, next) => {
  try {
    // Lấy token từ header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Không tìm thấy token xác thực",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = authService.verifyToken(token);

    // Lấy user từ database
    const user = await authService.getUserById(decoded.id);

    // Gắn user vào request
    req.user = {
      id: user._id,
      username: user.username,
      fullname: user.fullname,
      role: user.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token không hợp lệ hoặc đã hết hạn",
    });
  }
};

// Middleware kiểm tra user đã đăng nhập (optional)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = authService.verifyToken(token);
      const user = await authService.getUserById(decoded.id);

      req.user = {
        id: user._id,
        username: user.username,
        fullname: user.fullname,
        role: user.role,
      };
    }

    next();
  } catch (error) {
    // Nếu có lỗi, vẫn cho phép tiếp tục nhưng không có user
    next();
  }
};

module.exports = {
  authenticate,
  optionalAuth,
};