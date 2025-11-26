const productService = require("../services/product.service");

class ProductController {
  // Lấy danh sách sản phẩm
  async getAllProducts(req, res) {
    try {
      const { category, type, isAvailable, page = 1, limit = 20 } = req.query;
      
      const result = await productService.getAllProducts({
        category,
        type,
        isAvailable,
        page,
        limit,
      });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Lấy chi tiết sản phẩm
  async getProductById(req, res) {
    try {
      const product = await productService.getProductById(req.params.id);

      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Tạo sản phẩm mới (admin/staff)
  async createProduct(req, res) {
    try {
      const productData = req.body;
      
      const product = await productService.createProduct(productData);

      res.status(201).json({
        success: true,
        message: "Tạo sản phẩm thành công",
        data: product,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Cập nhật sản phẩm (admin/staff)
  async updateProduct(req, res) {
    try {
      const productData = req.body;
      const product = await productService.updateProduct(
        req.params.id,
        productData
      );

      res.status(200).json({
        success: true,
        message: "Cập nhật sản phẩm thành công",
        data: product,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Xóa sản phẩm (admin)
  async deleteProduct(req, res) {
    try {
      await productService.deleteProduct(req.params.id);

      res.status(200).json({
        success: true,
        message: "Xóa sản phẩm thành công",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Cập nhật trạng thái available (staff)
  async updateAvailability(req, res) {
    try {
      const { isAvailable } = req.body;
      
      const product = await productService.updateAvailability(
        req.params.id,
        isAvailable
      );

      res.status(200).json({
        success: true,
        message: "Cập nhật trạng thái thành công",
        data: product,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new ProductController();