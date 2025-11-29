// app/admin/tables/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Table2, 
  Users, 
  Plus, 
  Trash2, 
  Edit3,
  Beer as BeerIcon,
  Clock,
  CheckCircle
} from "lucide-react";
import { 
  getAllTables, 
  updateTableStatus, 
  createMultipleTables, 
  deleteTable,
  Table as TableType,
  TableStatus
} from "@/lib/api/table";
import { getOrderById, Order } from "@/lib/api/order";
import { useToast } from "@/components/ui/toast-provider";

export default function TableAdmin() {
  const [tables, setTables] = useState<TableType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTableCount, setNewTableCount] = useState(5);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const { toast } = useToast();

  // Load bàn khi vào trang
  useEffect(() => {
    loadTables();
  }, []);

  const loadTables = async () => {
    try {
      const data = await getAllTables();
      setTables(data.sort((a, b) => a.tableNumber - b.tableNumber));
    } catch (err: any) {
      toast("error", "Lỗi tải dữ liệu", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật trạng thái bàn (click để đổi)
  const handleTableClick = async (table: TableType) => {
    // Nếu bàn đang nhậu và có order -> Xem chi tiết
    if (table.status === "occupied") {
      if (table.currentOrder) {
        try {
          const orderId = typeof table.currentOrder === 'string' 
            ? table.currentOrder 
            : table.currentOrder._id;

          const order = await getOrderById(orderId);
          setSelectedOrder(order);
          setShowOrderModal(true);
        } catch (err: any) {
          toast("error", "Lỗi tải order", err.message);
        }
      } else {
        // Nếu bàn đang occupied mà không có order -> Chuyển về empty
        if (confirm(`Bàn #${table.tableNumber} đang trống order. Chuyển về trạng thái TRỐNG?`)) {
          try {
            const updated = await updateTableStatus(table._id, "empty");
            setTables(prev => prev.map(t => t._id === table._id ? updated : t));
            toast("success", "Đã cập nhật", `Bàn #${table.tableNumber} đã trống`);
          } catch (err: any) {
            toast("error", "Lỗi cập nhật", err.message);
          }
        }
      }
      return;
    }

    // Logic cũ: Đổi trạng thái
    const statusMap: Record<TableStatus, TableStatus> = {
      "empty": "occupied",
      "occupied": "empty",
      "reserved": "occupied"
    };

    const newStatus = statusMap[table.status] || "occupied";

    try {
      const updated = await updateTableStatus(table._id, newStatus);
      setTables(prev => prev.map(t => t._id === table._id ? updated : t));
      toast("success", "Cập nhật trạng thái", `Bàn #${updated.tableNumber} → ${getStatusText(newStatus)}`);
    } catch (err: any) {
      toast("error", "Cập nhật thất bại", err.message);
    }
  };

  // Tạo nhiều bàn
  const handleCreateTables = async () => {
    if (newTableCount < 1 || newTableCount > 50) {
      toast("warning", "Số lượng không hợp lệ", "Chỉ tạo được từ 1-50 bàn");
      return;
    }

    try {
      const lastNumber = tables.length > 0 
        ? Math.max(...tables.map(t => t.tableNumber)) 
        : 0;
      const newNumbers = Array.from({ length: newTableCount }, (_, i) => lastNumber + i + 1);

      await createMultipleTables(newNumbers);
      await loadTables();
      setShowCreateModal(false);
      setNewTableCount(5);
      toast("success", "Thành công!", `Đã tạo ${newTableCount} bàn mới từ #${lastNumber + 1}`);
    } catch (err: any) {
      toast("error", "Tạo bàn thất bại", err.message);
    }
  };

  // Xóa bàn
  const handleDeleteTable = async (id: string, tableNumber: number) => {
    if (!confirm(`Xóa bàn #${tableNumber} thật không anh chủ?`)) return;

    try {
      await deleteTable(id);
      setTables(prev => prev.filter(t => t._id !== id));
      toast("success", "Đã xóa", `Bàn #${tableNumber} đã bay màu!`);
    } catch (err: any) {
      toast("error", "Xóa thất bại", err.message);
    }
  };

  // Lấy màu + text trạng thái
  const getStatusConfig = (status: TableStatus) => {
    switch (status) {
      case "empty":
        return { color: "bg-green-600", text: "TRỐNG", icon: <CheckCircle className="w-6 h-6" /> };
      case "reserved":
        return { color: "bg-yellow-600", text: "ĐÃ ĐẶT", icon: <Clock className="w-6 h-6" /> };
      case "occupied":
        return { color: "bg-red-600", text: "ĐANG NHẬU", icon: <Users className="w-6 h-6" /> };
    }
  };

  const getStatusText = (status: TableStatus) => {
    return status === "empty" ? "Trống" : status === "reserved" ? "Đã đặt" : "Đang nhậu";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-4xl font-black text-orange-500 animate-pulse">Đang rót bia...</div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-5xl md:text-6xl font-black text-orange-500 drop-shadow-2xl">
            QUẢN LÝ BÀN
          </h1>
          <p className="text-xl text-gray-400 mt-2">Tổng cộng: <span className="text-green-400 font-bold">{tables.length}</span> bàn</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateModal(true)}
          className="bg-linear-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 px-8 py-5 rounded-2xl font-black text-xl flex items-center gap-3 shadow-2xl"
        >
          <Plus className="w-8 h-8" />
          THÊM BÀN MỚI
        </motion.button>
      </div>

      {/* Sơ đồ quán */}
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 min-h-screen">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-8">
          {tables.map((table) => {
            const config = getStatusConfig(table.status);

            return (
              <motion.div
                key={table._id}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.15, rotate: table.status === "occupied" ? 3 : 0 }}
                onClick={() => handleTableClick(table)}
                className={`relative group cursor-pointer transition-all duration-300`}
              >
                {/* Bàn tròn */}
                <div className={`relative w-28 h-28 md:w-32 md:h-32 rounded-full ${config.color} shadow-2xl flex flex-col items-center justify-center text-white overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-sm" />
                  
                  {/* Icon trạng thái */}
                  <div className="relative z-10 mb-2 animate-bounce">
                    {config.icon}
                  </div>

                  {/* Số bàn */}
                  <div className="relative z-10 font-black text-2xl md:text-3xl">
                    {table.tableNumber}
                  </div>

                  {/* Trạng thái */}
                  <div className="relative z-10 text-xs md:text-sm font-bold mt-1 opacity-90">
                    {config.text}
                  </div>

                  {/* Hiệu ứng bia tràn khi đang nhậu */}
                  {table.status === "occupied" && (
                    <div className="absolute inset-0">
                      <BeerIcon className="w-12 h-12 absolute top-2 left-1/2 -translate-x-1/2 text-yellow-300 animate-ping" />
                      <BeerIcon className="w-8 h-8 absolute bottom-3 right-2 text-yellow-200 animate-pulse" />
                    </div>
                  )}
                </div>

                {/* Nút xóa (hiện khi hover) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTable(table._id, table.tableNumber);
                  }}
                  className="absolute -top-3 -right-3 bg-red-600 hover:bg-red-700 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Không có bàn */}
        {tables.length === 0 && (
          <div className="text-center py-20">
            <Table2 className="w-32 h-32 mx-auto text-gray-600 mb-6" />
            <p className="text-3xl font-black text-gray-500">Chưa có bàn nào</p>
            <p className="text-gray-400 mt-4">Nhấn "Thêm bàn mới" để bắt đầu</p>
          </div>
        )}
      </div>

      {/* Modal tạo bàn */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-linear-to-br from-gray-900 to-black rounded-3xl p-10 max-w-md w-full border border-white/20 shadow-2xl"
          >
            <h2 className="text-4xl font-black text-orange-500 mb-6 text-center">THÊM BÀN MỚI</h2>
            <p className="text-gray-400 text-center mb-8">
              Sẽ tạo từ bàn số <span className="text-green-400 font-bold">
                {tables.length > 0 ? Math.max(...tables.map(t => t.tableNumber)) + 1 : 1}
              </span>
            </p>

            <input
              type="number"
              min="1"
              max="50"
              value={newTableCount}
              onChange={(e) => setNewTableCount(Number(e.target.value))}
              className="w-full px-6 py-5 bg-white/10 border border-white/30 rounded-2xl text-white text-2xl font-bold text-center focus:outline-none focus:border-orange-400 transition"
              placeholder="Số lượng bàn"
            />

            <div className="flex gap-4 mt-8">
              <button
                onClick={handleCreateTables}
                className="flex-1 bg-linear-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 py-5 rounded-2xl font-black text-xl"
              >
                TẠO NGAY
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 py-5 rounded-2xl font-black text-xl"
              >
                HỦY
              </button>
            </div>
          </motion.div>
        </div>
      )}
      {/* Modal chi tiết Order */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <div>
                <h2 className="text-3xl font-black text-orange-600">
                  BÀN #{selectedOrder.table.tableNumber}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Giờ vào: {new Date(selectedOrder.createdAt).toLocaleString('vi-VN')}
                </p>
              </div>
              <div className={`px-4 py-2 rounded-full font-bold text-sm uppercase ${
                selectedOrder.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {selectedOrder.status === 'pending' ? 'Đang chờ' : 
                 selectedOrder.status === 'serving' ? 'Đang phục vụ' : 
                 selectedOrder.status === 'completed' ? 'Hoàn thành' : 'Đã thanh toán'}
              </div>
            </div>

            {/* Danh sách món */}
            <div className="space-y-4 mb-8">
              {selectedOrder.items.length === 0 ? (
                <p className="text-center text-gray-400 italic py-4">Chưa gọi món nào</p>
              ) : (
                selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                        {item.quantity}x
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{item.product.name}</p>
                        <p className="text-sm text-gray-500">{item.product.price.toLocaleString()} đ</p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-900">
                      {(item.product.price * item.quantity).toLocaleString()} đ
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Tổng cộng */}
            <div className="flex justify-between items-center border-t pt-6 mb-8">
              <span className="text-xl font-bold text-gray-600">TỔNG CỘNG</span>
              <span className="text-3xl font-black text-orange-600">
                {selectedOrder.totalAmount.toLocaleString()} đ
              </span>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowOrderModal(false)}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-4 rounded-2xl font-bold text-lg transition"
              >
                ĐÓNG
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}