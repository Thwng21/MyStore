const tableService = require("../services/table.service");
const { colorStatus } = require("../until/logger");

class TableController {
  // Lấy danh sách tất cả bàn
  async getAllTables(req, res) {
    try {
      console.log(`📋 [GET] /api/tables - Lấy danh sách tất cả bàn`);
      
      const tables = await tableService.getAllTables();

      console.log(`✅ ${colorStatus(200)} Lấy danh sách bàn thành công: ${tables.length} bàn`);
      
      res.status(200).json({
        success: true,
        data: tables,
      });
    } catch (error) {
      console.log(`❌ ${colorStatus(500)} Lỗi lấy danh sách bàn: ${error.message}`);
      
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Lấy thông tin bàn theo ID
  async getTableById(req, res) {
    try {
      const { id } = req.params;
      console.log(`📋 [GET] /api/tables/${id} - Lấy thông tin bàn theo ID`);
      
      const table = await tableService.getTableById(id);

      console.log(`✅ ${colorStatus(200)} Lấy thông tin bàn thành công: Bàn #${table.tableNumber}`);
      
      res.status(200).json({
        success: true,
        data: table,
      });
    } catch (error) {
      const statusCode = error.statusCode || 404;
      console.log(`❌ ${colorStatus(statusCode)} Lỗi lấy thông tin bàn: ${error.message}`);
      
      res.status(statusCode).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Tạo bàn mới
  async createTable(req, res) {
    try {
      const tableData = req.body;
      console.log(`🆕 [POST] /api/tables - Tạo bàn mới:`, tableData);
      
      const table = await tableService.createTable(tableData);

      console.log(`✅ ${colorStatus(201)} Tạo bàn thành công: Bàn #${table.tableNumber}`);
      
      res.status(201).json({
        success: true,
        message: "Tạo bàn thành công",
        data: table,
      });
    } catch (error) {
      const statusCode = error.statusCode || 400;
      console.log(`❌ ${colorStatus(statusCode)} Lỗi tạo bàn: ${error.message}`);
      
      res.status(statusCode).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Cập nhật trạng thái bàn
  async updateTableStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      console.log(`🔄 [PATCH] /api/tables/${id}/status - Cập nhật trạng thái: ${status}`);
      
      const table = await tableService.updateTableStatus(id, status);

      console.log(`✅ ${colorStatus(200)} Cập nhật trạng thái bàn thành công: Bàn #${table.tableNumber} -> ${status}`);
      
      res.status(200).json({
        success: true,
        message: "Cập nhật trạng thái bàn thành công",
        data: table,
      });
    } catch (error) {
      const statusCode = error.statusCode || 400;
      console.log(`❌ ${colorStatus(statusCode)} Lỗi cập nhật trạng thái: ${error.message}`);
      
      res.status(statusCode).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Cập nhật thông tin bàn
  async updateTable(req, res) {
    try {
      const { id } = req.params;
      const tableData = req.body;
      console.log(`✏️ [PUT] /api/tables/${id} - Cập nhật thông tin bàn:`, tableData);
      
      const table = await tableService.updateTable(id, tableData);

      console.log(`✅ ${colorStatus(200)} Cập nhật thông tin bàn thành công: Bàn #${table.tableNumber}`);
      
      res.status(200).json({
        success: true,
        message: "Cập nhật thông tin bàn thành công",
        data: table,
      });
    } catch (error) {
      const statusCode = error.statusCode || 400;
      console.log(`❌ ${colorStatus(statusCode)} Lỗi cập nhật thông tin bàn: ${error.message}`);
      
      res.status(statusCode).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Xóa bàn
  async deleteTable(req, res) {
    try {
      const { id } = req.params;
      console.log(`🗑️ [DELETE] /api/tables/${id} - Xóa bàn`);
      
      await tableService.deleteTable(id);

      console.log(`✅ ${colorStatus(200)} Xóa bàn thành công: ID ${id}`);
      
      res.status(200).json({
        success: true,
        message: "Xóa bàn thành công",
      });
    } catch (error) {
      const statusCode = error.statusCode || 400;
      console.log(`❌ ${colorStatus(statusCode)} Lỗi xóa bàn: ${error.message}`);
      
      res.status(statusCode).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Gán order cho bàn
  async assignOrderToTable(req, res) {
    try {
      const { id } = req.params;
      const { orderId } = req.body;
      console.log(`📝 [PATCH] /api/tables/${id}/assign-order - Gán order: ${orderId}`);
      
      const table = await tableService.assignOrderToTable(id, orderId);

      console.log(`✅ ${colorStatus(200)} Gán order thành công: Bàn #${table.tableNumber} -> Order ${orderId}`);
      
      res.status(200).json({
        success: true,
        message: "Gán order cho bàn thành công",
        data: table,
      });
    } catch (error) {
      const statusCode = error.statusCode || 400;
      console.log(`❌ ${colorStatus(statusCode)} Lỗi gán order: ${error.message}`);
      
      res.status(statusCode).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Hủy gán order khỏi bàn
  async removeOrderFromTable(req, res) {
    try {
      const { id } = req.params;
      console.log(`📝 [PATCH] /api/tables/${id}/remove-order - Hủy gán order`);
      
      const table = await tableService.removeOrderFromTable(id);

      console.log(`✅ ${colorStatus(200)} Hủy gán order thành công: Bàn #${table.tableNumber}`);
      
      res.status(200).json({
        success: true,
        message: "Hủy gán order khỏi bàn thành công",
        data: table,
      });
    } catch (error) {
      const statusCode = error.statusCode || 400;
      console.log(`❌ ${colorStatus(statusCode)} Lỗi hủy gán order: ${error.message}`);
      
      res.status(statusCode).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Lấy bàn theo trạng thái
  async getTablesByStatus(req, res) {
    try {
      const { status } = req.params;
      console.log(`📋 [GET] /api/tables/status/${status} - Lấy bàn theo trạng thái`);
      
      const tables = await tableService.getTablesByStatus(status);

      console.log(`✅ ${colorStatus(200)} Lấy bàn theo trạng thái thành công: ${tables.length} bàn ${status}`);
      
      res.status(200).json({
        success: true,
        data: tables,
      });
    } catch (error) {
      const statusCode = error.statusCode || 400;
      console.log(`❌ ${colorStatus(statusCode)} Lỗi lấy bàn theo trạng thái: ${error.message}`);
      
      res.status(statusCode).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Tạo nhiều bàn cùng lúc
  async createMultipleTables(req, res) {
    try {
      const { tableNumbers } = req.body;
      console.log(`🆕 [POST] /api/tables/bulk - Tạo nhiều bàn:`, tableNumbers);
      
      const tables = await tableService.createMultipleTables(tableNumbers);

      console.log(`✅ ${colorStatus(201)} Tạo ${tables.length} bàn thành công`);
      
      res.status(201).json({
        success: true,
        message: `Tạo ${tables.length} bàn thành công`,
        data: tables,
      });
    } catch (error) {
      const statusCode = error.statusCode || 400;
      console.log(`❌ ${colorStatus(statusCode)} Lỗi tạo nhiều bàn: ${error.message}`);
      
      res.status(statusCode).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new TableController();