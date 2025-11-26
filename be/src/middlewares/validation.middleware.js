const validateRegister = (req, res, next) => {
  const { username, fullname, phone, password } = req.body;

  // Kiểm tra các trường bắt buộc
  if (!username || !fullname || !phone || !password) {
    return res.status(400).json({
      success: false,
      message: "Vui lòng điền đầy đủ thông tin",
    });
  }

  // Kiểm tra username
  if (username.length < 3) {
    return res.status(400).json({
      success: false,
      message: "Username phải có ít nhất 3 ký tự",
    });
  }

  // Kiểm tra password
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password phải có ít nhất 6 ký tự",
    });
  }

  // Kiểm tra phone
  const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({
      success: false,
      message: "Số điện thoại không hợp lệ",
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Vui lòng nhập username và password",
    });
  }

  next();
};

const validateChangePassword = (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Vui lòng nhập đầy đủ thông tin",
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password mới phải có ít nhất 6 ký tự",
    });
  }

  if (oldPassword === newPassword) {
    return res.status(400).json({
      success: false,
      message: "Password mới phải khác password cũ",
    });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateChangePassword,
};
