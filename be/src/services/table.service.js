const Table = require("../models/table.model");
const mongoose = require("mongoose");
require("../models/order.model"); // Register Order model
require("../models/orderItem.model"); // Register OrderItem model
const { AppError } = require("../until/errorHandler");

class TableService {
  // Lấy danh sách tất cả bàn
  async getAllTables() {
    try {
      const tables = await Table.find()
        .populate('currentOrder', 'orderNumber totalAmount status')
        .sort({ tableNumber: 1 });

      return tables;
    } catch (error) {
      throw new AppError(`Lỗi khi lấy danh sách bàn: ${error.message}`, 500);
    }
  }

  // Lấy thông tin bàn theo ID hoặc Số bàn
  async getTableById(tableId) {
    try {
      let table;
      
      // Kiểm tra xem tableId có phải là ObjectId hợp lệ không
      if (mongoose.Types.ObjectId.isValid(tableId)) {
        table = await Table.findById(tableId)
          .populate('currentOrder', 'orderNumber totalAmount status items');
      } 
      // Nếu không phải ObjectId, thử tìm theo tableNumber
      else if (!isNaN(tableId)) {
        table = await Table.findOne({ tableNumber: Number(tableId) })
          .populate('currentOrder', 'orderNumber totalAmount status items');
      }

      if (!table) {
        throw new AppError("Không tìm thấy bàn", 404);
      }

      return table;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new AppError("ID bàn không hợp lệ", 400);
      }
      throw error;
    }
  }

  // Tạo bàn mới
  async createTable(tableData) {
    try {
      // Validate required fields
      if (!tableData.tableNumber) {
        throw new AppError("Số bàn là bắt buộc", 400);
      }

      // Check if table number already exists
      const existingTable = await Table.findOne({ 
        tableNumber: tableData.tableNumber 
      });

      if (existingTable) {
        throw new AppError(`Bàn số ${tableData.tableNumber} đã tồn tại`, 400);
      }

      // Validate table number
      if (tableData.tableNumber <= 0) {
        throw new AppError("Số bàn phải lớn hơn 0", 400);
      }

      const table = new Table({
        tableNumber: tableData.tableNumber,
        status: tableData.status || 'empty',
        currentOrder: tableData.currentOrder || null
      });

      const savedTable = await table.save();
      return await this.getTableById(savedTable._id); // Return populated table
    } catch (error) {
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        throw new AppError(`Dữ liệu không hợp lệ: ${messages.join(', ')}`, 400);
      }
      throw error;
    }
  }

  // Cập nhật trạng thái bàn
  async updateTableStatus(tableId, status) {
    try {
      // Validate status
      const validStatuses = ['empty', 'reserved', 'occupied'];
      if (!validStatuses.includes(status)) {
        throw new AppError(`Trạng thái không hợp lệ. Chỉ chấp nhận: ${validStatuses.join(', ')}`, 400);
      }

      const table = await Table.findById(tableId);
      if (!table) {
        throw new AppError("Không tìm thấy bàn", 404);
      }

      // Additional business logic validation
      if (status === 'empty' && table.currentOrder) {
        throw new AppError("Không thể đặt trạng thái empty khi bàn đang có order", 400);
      }

      const updatedTable = await Table.findByIdAndUpdate(
        tableId,
        { status },
        { new: true }
      ).populate('currentOrder', 'orderNumber totalAmount status');

      return updatedTable;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new AppError("ID bàn không hợp lệ", 400);
      }
      throw error;
    }
  }

  // Cập nhật thông tin bàn
  async updateTable(tableId, tableData) {
    try {
      const table = await Table.findById(tableId);
      if (!table) {
        throw new AppError("Không tìm thấy bàn", 404);
      }

      // Check if table number is being changed and if it already exists
      if (tableData.tableNumber && tableData.tableNumber !== table.tableNumber) {
        const existingTable = await Table.findOne({ 
          tableNumber: tableData.tableNumber,
          _id: { $ne: tableId }
        });

        if (existingTable) {
          throw new AppError(`Bàn số ${tableData.tableNumber} đã tồn tại`, 400);
        }

        if (tableData.tableNumber <= 0) {
          throw new AppError("Số bàn phải lớn hơn 0", 400);
        }
      }

      const updatedTable = await Table.findByIdAndUpdate(
        tableId,
        tableData,
        { new: true, runValidators: true }
      ).populate('currentOrder', 'orderNumber totalAmount status');

      return updatedTable;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new AppError("ID bàn không hợp lệ", 400);
      }
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        throw new AppError(`Dữ liệu không hợp lệ: ${messages.join(', ')}`, 400);
      }
      throw error;
    }
  }

  // Xóa bàn
  async deleteTable(tableId) {
    try {
      const table = await Table.findById(tableId);
      
      if (!table) {
        throw new AppError("Không tìm thấy bàn", 404);
      }

      // Check if table is occupied or has current order
      if (table.status === 'occupied' || table.currentOrder) {
        throw new AppError("Không thể xóa bàn đang được sử dụng", 400);
      }

      await Table.findByIdAndDelete(tableId);
      
      return { message: "Xóa bàn thành công" };
    } catch (error) {
      if (error.name === 'CastError') {
        throw new AppError("ID bàn không hợp lệ", 400);
      }
      throw error;
    }
  }

  // Gán order cho bàn
  async assignOrderToTable(tableId, orderId) {
    try {
      const table = await Table.findById(tableId);
      if (!table) {
        throw new AppError("Không tìm thấy bàn", 404);
      }

      // Check if table is already occupied
      if (table.status === 'occupied') {
        throw new AppError("Bàn đang được sử dụng, không thể gán order mới", 400);
      }

      const updatedTable = await Table.findByIdAndUpdate(
        tableId,
        { 
          currentOrder: orderId,
          status: 'occupied'
        },
        { new: true }
      ).populate('currentOrder', 'orderNumber totalAmount status items');

      return updatedTable;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new AppError("ID bàn không hợp lệ", 400);
      }
      throw error;
    }
  }

  // Hủy gán order khỏi bàn
  async removeOrderFromTable(tableId) {
    try {
      const table = await Table.findById(tableId);
      if (!table) {
        throw new AppError("Không tìm thấy bàn", 404);
      }

      const updatedTable = await Table.findByIdAndUpdate(
        tableId,
        { 
          currentOrder: null,
          status: 'empty'
        },
        { new: true }
      );

      return updatedTable;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new AppError("ID bàn không hợp lệ", 400);
      }
      throw error;
    }
  }

  // Lấy bàn theo trạng thái
  async getTablesByStatus(status) {
    try {
      const validStatuses = ['empty', 'reserved', 'occupied'];
      if (!validStatuses.includes(status)) {
        throw new AppError(`Trạng thái không hợp lệ. Chỉ chấp nhận: ${validStatuses.join(', ')}`, 400);
      }

      const tables = await Table.find({ status })
        .populate('currentOrder', 'orderNumber totalAmount status')
        .sort({ tableNumber: 1 });

      return tables;
    } catch (error) {
      throw new AppError(`Lỗi khi lấy bàn theo trạng thái: ${error.message}`, 500);
    }
  }

  // Tạo nhiều bàn cùng lúc
  async createMultipleTables(tableNumbers) {
    try {
      if (!Array.isArray(tableNumbers) || tableNumbers.length === 0) {
        throw new AppError("Danh sách số bàn là bắt buộc", 400);
      }

      // Check for duplicates in input
      const uniqueNumbers = [...new Set(tableNumbers)];
      if (uniqueNumbers.length !== tableNumbers.length) {
        throw new AppError("Danh sách số bàn chứa giá trị trùng lặp", 400);
      }

      // Check for existing table numbers
      const existingTables = await Table.find({ 
        tableNumber: { $in: tableNumbers } 
      });

      if (existingTables.length > 0) {
        const existingNumbers = existingTables.map(t => t.tableNumber);
        throw new AppError(`Các bàn số ${existingNumbers.join(', ')} đã tồn tại`, 400);
      }

      const tablesToCreate = tableNumbers.map(number => ({
        tableNumber: number,
        status: 'empty',
        currentOrder: null
      }));

      const createdTables = await Table.insertMany(tablesToCreate);
      return createdTables;
    } catch (error) {
      throw new AppError(`Lỗi khi tạo nhiều bàn: ${error.message}`, 500);
    }
  }
}

module.exports = new TableService();