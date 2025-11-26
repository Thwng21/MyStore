const categoryService = require("../services/category.service");

class CategoryController {
  // Lấy danh sách categories
  async getAllCategories(req, res) {
    try {
      const categories = await categoryService.getAllCategories();

      res.status(200).json({
        success: true,
        data: categories,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Lấy chi tiết category
  async getCategoryById(req, res) {
    try {
      const category = await categoryService.getCategoryById(req.params.id);

      res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Tạo category mới (admin)
  async createCategory(req, res) {
    try {
      const { name } = req.body;
      
      const category = await categoryService.createCategory(name);

      res.status(201).json({
        success: true,
        message: "Tạo danh mục thành công",
        data: category,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Cập nhật category (admin)
  async updateCategory(req, res) {
    try {
      const { name } = req.body;
      
      const category = await categoryService.updateCategory(
        req.params.id,
        name
      );

      res.status(200).json({
        success: true,
        message: "Cập nhật danh mục thành công",
        data: category,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Xóa category (admin)
  async deleteCategory(req, res) {
    try {
      await categoryService.deleteCategory(req.params.id);

      res.status(200).json({
        success: true,
        message: "Xóa danh mục thành công",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Lấy products theo category
  async getProductsByCategory(req, res) {
    try {
      const products = await categoryService.getProductsByCategory(
        req.params.id
      );

      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new CategoryController();