// src/lib/table.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Helper lấy token
const getAuthHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  if (!token) {
    console.warn("⚠️ Không tìm thấy accessToken trong localStorage!");
  }
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// ==================== LẤY TẤT CẢ BÀN ====================
export const getAllTables = async () => {
  const res = await fetch(`${API_BASE_URL}/api/tables`, {
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Lấy danh sách bàn thất bại");
  return data.data as Table[];
};

// ==================== LẤY BÀN THEO ID ====================
export const getTableById = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/api/tables/${id}`, {
    headers: getAuthHeaders(),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Không tìm thấy bàn");
  return data.data as Table;
};

// ==================== TẠO BÀN MỚI ====================
export const createTable = async (tableData: { tableNumber: number }) => {
  const res = await fetch(`${API_BASE_URL}/api/tables`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(tableData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Tạo bàn thất bại");
  return data.data as Table;
};

// ==================== TẠO NHIỀU BÀN CÙNG LÚC ====================
export const createMultipleTables = async (tableNumbers: number[]) => {
  const res = await fetch(`${API_BASE_URL}/api/tables/bulk`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ tableNumbers }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Tạo nhiều bàn thất bại");
  return data.data as Table[];
};

// ==================== CẬP NHẬT TRẠNG THÁI BÀN ====================
export const updateTableStatus = async (id: string, status: "empty" | "reserved" | "occupied") => {
  const res = await fetch(`${API_BASE_URL}/api/tables/${id}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Cập nhật trạng thái thất bại");
  return data.data as Table;
};

// ==================== GÁN ORDER CHO BÀN ====================
export const assignOrderToTable = async (tableId: string, orderId: string) => {
  const res = await fetch(`${API_BASE_URL}/api/tables/${tableId}/assign-order`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ orderId }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Gán order thất bại");
  return data.data as Table;
};

// ==================== HỦY GÁN ORDER KHỎI BÀN ====================
export const removeOrderFromTable = async (tableId: string) => {
  const res = await fetch(`${API_BASE_URL}/api/tables/${tableId}/remove-order`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Hủy gán order thất bại");
  return data.data as Table;
};

// ==================== LẤY BÀN THEO TRẠNG THÁI ====================
export const getTablesByStatus = async (status: "empty" | "reserved" | "occupied") => {
  const res = await fetch(`${API_BASE_URL}/api/tables/status/${status}`, {
    headers: getAuthHeaders(),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Lấy bàn theo trạng thái thất bại");
  return data.data as Table[];
};

// ==================== CẬP NHẬT THÔNG TIN BÀN (nếu cần) ====================
export const updateTable = async (id: string, tableData: Partial<Table>) => {
  const res = await fetch(`${API_BASE_URL}/api/tables/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(tableData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Cập nhật bàn thất bại");
  return data.data as Table;
};

// ==================== XÓA BÀN ====================
export const deleteTable = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/api/tables/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Xóa bàn thất bại");
  }
  return true;
};

// ==================== TYPE CHO TABLE (dùng chung) ====================
export type TableStatus = "empty" | "reserved" | "occupied";

export interface Table {
  _id: string;
  tableNumber: number;
  status: TableStatus;
  currentOrder: string | { _id: string } | null;
  createdAt: string;
  updatedAt: string;
}