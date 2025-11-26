const Category = require("../models/category.model");
const Product = require("../models/product.model");
const { AppError } = require("../until/errorHandler");

class CategoryService {
  // Lấy danh sách tất cả categories
  async getAllCategories() {
    try {
      const categories = await Category.find()
        .sort({ name: 1 })
        .select('name slug createdAt');

      return categories;
    } catch (error) {
      throw new AppError(`Lỗi khi lấy danh sách danh mục: ${error.message}`, 500);
    }
  }

  // Lấy chi tiết category theo ID
  async getCategoryById(categoryId) {
    try {
      const category = await Category.findById(categoryId);

      if (!category) {
        throw new AppError("Không tìm thấy danh mục", 404);
      }

      return category;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new AppError("ID danh mục không hợp lệ", 400);
      }
      throw error;
    }
  }

  // Tạo category mới
  async createCategory(name) {
    try {
      // Validate input
      if (!name || name.trim() === '') {
        throw new AppError("Tên danh mục là bắt buộc", 400);
      }

      // Tạo slug từ name
      const slug = this.generateSlug(name);

      // Kiểm tra category đã tồn tại chưa
      const existingCategory = await Category.findOne({
        $or: [
          { name: name.trim() },
          { slug: slug }
        ]
      });

      if (existingCategory) {
        throw new AppError("Danh mục đã tồn tại", 400);
      }

      // Tạo category mới
      const category = new Category({
        name: name.trim(),
        slug: slug
      });

      const savedCategory = await category.save();
      return savedCategory;
    } catch (error) {
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        throw new AppError(`Dữ liệu không hợp lệ: ${messages.join(', ')}`, 400);
      }
      throw error;
    }
  }

  // Cập nhật category
  async updateCategory(categoryId, name) {
    try {
      // Validate input
      if (!name || name.trim() === '') {
        throw new AppError("Tên danh mục là bắt buộc", 400);
      }

      // Kiểm tra category có tồn tại không
      const existingCategory = await Category.findById(categoryId);
      if (!existingCategory) {
        throw new AppError("Không tìm thấy danh mục", 404);
      }

      // Tạo slug từ name mới
      const newSlug = this.generateSlug(name);

      // Kiểm tra tên/slug mới có trùng với category khác không
      const duplicateCategory = await Category.findOne({
        $and: [
          { _id: { $ne: categoryId } },
          { $or: [
            { name: name.trim() },
            { slug: newSlug }
          ]}
        ]
      });

      if (duplicateCategory) {
        throw new AppError("Tên danh mục đã tồn tại", 400);
      }

      // Cập nhật category
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        {
          name: name.trim(),
          slug: newSlug
        },
        { new: true, runValidators: true }
      );

      return updatedCategory;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new AppError("ID danh mục không hợp lệ", 400);
      }
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        throw new AppError(`Dữ liệu không hợp lệ: ${messages.join(', ')}`, 400);
      }
      throw error;
    }
  }

  // Xóa category
  async deleteCategory(categoryId) {
    try {
      // Kiểm tra category có tồn tại không
      const category = await Category.findById(categoryId);
      if (!category) {
        throw new AppError("Không tìm thấy danh mục", 404);
      }

      // Kiểm tra xem category có sản phẩm nào không
      const productsCount = await Product.countDocuments({ category: categoryId });
      if (productsCount > 0) {
        throw new AppError(
          `Không thể xóa danh mục vì có ${productsCount} sản phẩm đang thuộc danh mục này. Hãy di chuyển hoặc xóa các sản phẩm trước.`,
          400
        );
      }

      // Xóa category
      await Category.findByIdAndDelete(categoryId);

      return { message: "Xóa danh mục thành công" };
    } catch (error) {
      if (error.name === 'CastError') {
        throw new AppError("ID danh mục không hợp lệ", 400);
      }
      throw error;
    }
  }

  // Lấy products theo category
  async getProductsByCategory(categoryId) {
    try {
      // Kiểm tra category có tồn tại không
      const category = await Category.findById(categoryId);
      if (!category) {
        throw new AppError("Không tìm thấy danh mục", 404);
      }

      // Lấy sản phẩm theo category
      const products = await Product.find({ 
        category: categoryId,
        isAvailable: true 
      })
      .populate('category', 'name slug')
      .select('name slug price image description type isAvailable')
      .sort({ name: 1 });

      return {
        category: {
          _id: category._id,
          name: category.name,
          slug: category.slug
        },
        products: products
      };
    } catch (error) {
      if (error.name === 'CastError') {
        throw new AppError("ID danh mục không hợp lệ", 400);
      }
      throw new AppError(`Lỗi khi lấy sản phẩm theo danh mục: ${error.message}`, 500);
    }
  }

  // Lấy products theo category với pagination (mở rộng)
  async getProductsByCategoryWithPagination(categoryId, page = 1, limit = 20) {
    try {
      // Kiểm tra category có tồn tại không
      const category = await Category.findById(categoryId);
      if (!category) {
        throw new AppError("Không tìm thấy danh mục", 404);
      }

      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const skip = (pageNum - 1) * limitNum;

      const [products, total] = await Promise.all([
        Product.find({ 
          category: categoryId,
          isAvailable: true 
        })
        .populate('category', 'name slug')
        .select('name slug price image description type isAvailable')
        .sort({ name: 1 })
        .skip(skip)
        .limit(limitNum)
        .exec(),
        Product.countDocuments({ 
          category: categoryId,
          isAvailable: true 
        })
      ]);

      const totalPages = Math.ceil(total / limitNum);

      return {
        category: {
          _id: category._id,
          name: category.name,
          slug: category.slug
        },
        products: products,
        pagination: {
          currentPage: pageNum,
          totalPages: totalPages,
          totalProducts: total,
          hasNext: pageNum < totalPages,
          hasPrev: pageNum > 1
        }
      };
    } catch (error) {
      if (error.name === 'CastError') {
        throw new AppError("ID danh mục không hợp lệ", 400);
      }
      throw new AppError(`Lỗi khi lấy sản phẩm theo danh mục: ${error.message}`, 500);
    }
  }

  // Utility function: Tạo slug từ name
  generateSlug(name) {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, '') // Remove invalid chars
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  }

  // Tạo nhiều categories mặc định (cho seeding data)
  async createDefaultCategories() {
    try {
      const defaultCategories = [
        { name: "Cà Phê", slug: "ca-phe" },
        { name: "Trà", slug: "tra" },
        { name: "Nước Ép", slug: "nuoc-ep" },
        { name: "Sinh Tố", slug: "sinh-to" },
        { name: "Bánh Ngọt", slug: "banh-ngot" },
        { name: "Bánh Mì", slug: "banh-mi" },
        { name: "Snack", slug: "snack" }
      ];

      const results = [];
      for (const categoryData of defaultCategories) {
        try {
          const existingCategory = await Category.findOne({
            $or: [
              { name: categoryData.name },
              { slug: categoryData.slug }
            ]
          });

          if (!existingCategory) {
            const category = new Category(categoryData);
            const savedCategory = await category.save();
            results.push({
              success: true,
              data: savedCategory
            });
          } else {
            results.push({
              success: false,
              message: `Danh mục "${categoryData.name}" đã tồn tại`
            });
          }
        } catch (error) {
          results.push({
            success: false,
            message: `Lỗi khi tạo danh mục "${categoryData.name}": ${error.message}`
          });
        }
      }

      return results;
    } catch (error) {
      throw new AppError(`Lỗi khi tạo danh mục mặc định: ${error.message}`, 500);
    }
  }
}

module.exports = new CategoryService();