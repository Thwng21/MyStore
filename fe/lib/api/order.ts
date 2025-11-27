// src/lib/order.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Helper lấy token
const getAuthHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// 1. LẤY TẤT CẢ ĐƠN HÀNG
export const getAllOrders = async () => {
  const res = await fetch(`${API_BASE_URL}/api/orders/getAll`, {
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Lấy danh sách đơn thất bại");
  return data; // { orders: [...] }
};

// 2. LẤY ĐƠN THEO ID
export const getOrderById = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
    headers: getAuthHeaders(),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Không tìm thấy đơn hàng");
  return data;
};

// 3. TẠO ĐƠN HÀNG MỚI
export const createOrder = async (orderData: {
  tableId: string;
  items?: { menuItemId: string; quantity: number; note?: string }[];
  customerName?: string;
}) => {
  const res = await fetch(`${API_BASE_URL}/api/orders/create`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(orderData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Tạo đơn thất bại");
  return data;
};

// 4. CẬP NHẬT ĐƠN HÀNG (ví dụ: đổi bàn, trạng thái thanh toán,...)
export const updateOrder = async (
  id: string,
  updateData: {
    tableId?: string;
    status?: "pending" | "preparing" | "served" | "completed" | "cancelled";
    customerName?: string;
    note?: string;
  }
) => {
  const res = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(updateData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Cập nhật đơn thất bại");
  return data;
};

// 5. XÓA ĐƠN HÀNG
export const deleteOrder = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Xóa đơn thất bại");
  }
  return true;
};

// 6. THÊM MÓN VÀO ĐƠN
export const addItemToOrder = async (
  orderId: string,
  item: { menuItemId: string; quantity: number; note?: string }
) => {
  const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}/items`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(item),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Thêm món thất bại");
  return data;
};

// 7. CẬP NHẬT SỐ LƯỢNG MÓN TRONG ĐƠN
export const updateItemQuantity = async (
  orderId: string,
  itemId: string,
  quantity: number
) => {
  const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}/items`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ itemId, quantity }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Cập nhật số lượng thất bại");
  return data;
};

// 8. XÓA MÓN KHỎI ĐƠN
export const removeItemFromOrder = async (orderId: string, itemId: string) => {
  const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}/items`, {
    method: "DELETE",
    headers: getAuthHeaders(),
    body: JSON.stringify({ itemId }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Xóa món thất bại");
  }
  return true;
};