const authService = require("../services/auth.service");
const { colorStatus } = require("../until/logger");

class AuthController {
  async register(req, res) {
    try {
      const { username, fullname, phone, password, role } = req.body;

      const result = await authService.register({
        username,
        fullname,
        phone,
        password,
        role,
      });

      console.log(`POST /register => ${colorStatus(201)} | username: ${username}`);

      res.status(201).json({
        success: true,
        message: "Đăng ký thành công",
        data: result,
      });
    } catch (error) {
      console.log(`POST /register => ${colorStatus(400)} | Error: ${error.message}`);

      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;

      const result = await authService.login(username, password);

      console.log(`POST /login => ${colorStatus(200)} | username: ${username}`);

      res.status(200).json({
        success: true,
        message: "Đăng nhập thành công",
        data: result,
      });
    } catch (error) {
      console.log(`POST /login => ${colorStatus(401)} | Error: ${error.message}`);

      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getProfile(req, res) {
    try {
      const user = await authService.getUserById(req.user.id);

      console.log(`GET /profile => ${colorStatus(200)} | userId: ${req.user.id}`);

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.log(`GET /profile => ${colorStatus(404)} | userId: ${req.user?.id} | Error: ${error.message}`);

      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;

      await authService.changePassword(req.user.id, oldPassword, newPassword);

      console.log(`POST /change-password => ${colorStatus(200)} | userId: ${req.user.id}`);

      res.status(200).json({
        success: true,
        message: "Đổi mật khẩu thành công",
      });
    } catch (error) {
      console.log(`POST /change-password => ${colorStatus(400)} | userId: ${req.user?.id} | Error: ${error.message}`);

      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new AuthController();
