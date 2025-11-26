const Product = require("../models/product.model");
const { AppError } = require("../until/errorHandler");
const { paginate } = require("../until/pagination");
class ProductService {
  // Lấy danh sách sản phẩm với filter và pagination
  async getAllProducts({ category, type, isAvailable, page = 1, limit = 20 }) {
    try {
      const filter = {};

      // Build filter object
      if (category) {
        filter.category = category;
      }

      if (type) {
        filter.type = type;
      }

      if (isAvailable !== undefined) {
        filter.isAvailable = isAvailable === 'true';
      }

      // Pagination options
      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { createdAt: -1 },
        populate: [
          { path: 'category', select: 'name description' }
        ]
      };

      const products = await Product.paginate(filter, options);

      return {
        products: products.docs,
        pagination: {
          currentPage: products.page,
          totalPages: products.totalPages,
          totalProducts: products.totalDocs,
          hasNext: products.hasNextPage,
          hasPrev: products.hasPrevPage
        }
      };
    } catch (error) {
      throw new AppError(`Lỗi khi lấy danh sách sản phẩm: ${error.message}`, 500);
    }
  }

  // Lấy chi tiết sản phẩm theo ID
  async getProductById(productId) {
    try {
      const product = await Product.findById(productId)
        .populate('category', 'name description');

      if (!product) {
        throw new AppError("Không tìm thấy sản phẩm", 404);
      }

      return product;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new AppError("ID sản phẩm không hợp lệ", 400);
      }
      throw error;
    }
  }

  // Tạo sản phẩm mới
  async createProduct(productData) {
    try {
      // Validate required fields
      const requiredFields = ['name', 'price', 'category', 'description'];
      const missingFields = requiredFields.filter(field => !productData[field]);

      if (missingFields.length > 0) {
        throw new AppError(`Thiếu các trường bắt buộc: ${missingFields.join(', ')}`, 400);
      }

      // Check if product name already exists
      const existingProduct = await Product.findOne({ name: productData.name });
      if (existingProduct) {
        throw new AppError("Tên sản phẩm đã tồn tại", 400);
      }

      // Validate price
      if (productData.price <= 0) {
        throw new AppError("Giá sản phẩm phải lớn hơn 0", 400);
      }

      // Set default values
      const product = new Product({
        ...productData,
        isAvailable: productData.isAvailable !== undefined ? productData.isAvailable : true,
        stock: productData.stock || 0,
        images: productData.images || [],
        tags: productData.tags || [],
        specifications: productData.specifications || {}
      });

      const savedProduct = await product.save();
      return await this.getProductById(savedProduct._id); // Return populated product
    } catch (error) {
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        throw new AppError(`Dữ liệu không hợp lệ: ${messages.join(', ')}`, 400);
      }
      throw error;
    }
  }

  // Cập nhật sản phẩm
  async updateProduct(productId, productData) {
    try {
      // Check if product exists
      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        throw new AppError("Không tìm thấy sản phẩm", 404);
      }

      // Check if name is being changed and if it already exists
      if (productData.name && productData.name !== existingProduct.name) {
        const productWithSameName = await Product.findOne({ 
          name: productData.name, 
          _id: { $ne: productId } 
        });
        
        if (productWithSameName) {
          throw new AppError("Tên sản phẩm đã tồn tại", 400);
        }
      }

      // Validate price if provided
      if (productData.price !== undefined && productData.price <= 0) {
        throw new AppError("Giá sản phẩm phải lớn hơn 0", 400);
      }

      // Update product
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { 
          ...productData,
          updatedAt: new Date()
        },
        { new: true, runValidators: true }
      ).populate('category', 'name description');

      return updatedProduct;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new AppError("ID sản phẩm không hợp lệ", 400);
      }
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        throw new AppError(`Dữ liệu không hợp lệ: ${messages.join(', ')}`, 400);
      }
      throw error;
    }
  }

  // Xóa sản phẩm
  async deleteProduct(productId) {
    try {
      const product = await Product.findById(productId);
      
      if (!product) {
        throw new AppError("Không tìm thấy sản phẩm", 404);
      }

      // Check if product has associated orders (soft delete implementation)
      // You might want to add additional checks here based on your business logic

      await Product.findByIdAndDelete(productId);
      
      return { message: "Xóa sản phẩm thành công" };
    } catch (error) {
      if (error.name === 'CastError') {
        throw new AppError("ID sản phẩm không hợp lệ", 400);
      }
      throw error;
    }
  }

  // Cập nhật trạng thái available
  async updateAvailability(productId, isAvailable) {
    try {
      const product = await Product.findById(productId);
      
      if (!product) {
        throw new AppError("Không tìm thấy sản phẩm", 404);
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { 
          isAvailable,
          updatedAt: new Date()
        },
        { new: true }
      ).populate('category', 'name description');

      return updatedProduct;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new AppError("ID sản phẩm không hợp lệ", 400);
      }
      throw error;
    }
  }

  // Additional utility methods

  // Tìm kiếm sản phẩm
  async searchProducts(query, page = 1, limit = 20) {
    try {
      const searchFilter = {
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { tags: { $in: [new RegExp(query, 'i')] } }
        ],
        isAvailable: true
      };

      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { createdAt: -1 },
        populate: 'category'
      };

      const products = await Product.paginate(searchFilter, options);

      return {
        products: products.docs,
        pagination: {
          currentPage: products.page,
          totalPages: products.totalPages,
          totalProducts: products.totalDocs,
          hasNext: products.hasNextPage,
          hasPrev: products.hasPrevPage
        }
      };
    } catch (error) {
      throw new AppError(`Lỗi khi tìm kiếm sản phẩm: ${error.message}`, 500);
    }
  }

  // Cập nhật số lượng tồn kho
  async updateStock(productId, newStock) {
    try {
      if (newStock < 0) {
        throw new AppError("Số lượng tồn kho không thể âm", 400);
      }

      const product = await Product.findByIdAndUpdate(
        productId,
        { 
          stock: newStock,
          updatedAt: new Date()
        },
        { new: true }
      );

      if (!product) {
        throw new AppError("Không tìm thấy sản phẩm", 404);
      }

      return product;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new AppError("ID sản phẩm không hợp lệ", 400);
      }
      throw error;
    }
  }

  // Lấy sản phẩm theo danh mục
  async getProductsByCategory(categoryId, page = 1, limit = 20) {
    try {
      const filter = { 
        category: categoryId,
        isAvailable: true 
      };

      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { createdAt: -1 },
        populate: 'category'
      };

      const products = await Product.paginate(filter, options);

      return {
        products: products.docs,
        pagination: {
          currentPage: products.page,
          totalPages: products.totalPages,
          totalProducts: products.totalDocs,
          hasNext: products.hasNextPage,
          hasPrev: products.hasPrevPage
        }
      };
    } catch (error) {
      throw new AppError(`Lỗi khi lấy sản phẩm theo danh mục: ${error.message}`, 500);
    }
  }
}

module.exports = new ProductService();