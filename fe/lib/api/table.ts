// src/lib/table.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Helper: lấy token từ localStorage
const getAuthHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// LẤY TẤT CẢ BÀN
export const getAllTables = async () => {
  const res = await fetch(`${API_BASE_URL}/api/tables/getAll`, {
    headers: getAuthHeaders(),
    cache: "no-store", // luôn lấy mới nhất
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Lấy danh sách bàn thất bại");
  return data; // trả về mảng tables
};

// LẤY BÀN THEO ID
export const getTableById = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/api/tables/${id}`, {
    headers: getAuthHeaders(),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Không tìm thấy bàn");
  return data;
};

// TẠO BÀN MỚI (yêu cầu login)
export const createTable = async (tableData: {
  tableNumber: string;
  seats: number;
  status?: "available" | "occupied" | "reserved";
}) => {
  const res = await fetch(`${API_BASE_URL}/api/tables/create`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(tableData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Tạo bàn thất bại");
  return data;
};

// CẬP NHẬT BÀN (yêu cầu login)
export const updateTable = async (
  id: string,
  tableData: {
    tableNumber?: string;
    seats?: number;
    status?: "available" | "occupied" | "reserved";
  }
) => {
  const res = await fetch(`${API_BASE_URL}/api/tables/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(tableData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Cập nhật bàn thất bại");
  return data;
};

// XÓA BÀN (yêu cầu login)
export const deleteTable = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/api/tables/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Xóa bàn thất bại");
  }
  return true;
};