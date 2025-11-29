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

// ==================== TYPE CHO ORDER ====================
export type OrderStatus = "pending" | "serving" | "completed" | "paid";
export type PaymentMethod = "cash" | "qr" | "none";

export interface OrderItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    image?: string;
  };
  quantity: number;
  note?: string;
}

export interface Order {
  _id: string;
  table: {
    _id: string;
    tableNumber: number;
  };
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  createdAt: string;
  updatedAt: string;
}

// ==================== LẤY TẤT CẢ ORDERS (có filter) ====================
export const getAllOrders = async (params?: {
  status?: OrderStatus;
  table?: string;
  page?: number;
  limit?: number;
}) => {
  const searchParams = new URLSearchParams();
  if (params?.status) searchParams.append("status", params.status);
  if (params?.table) searchParams.append("table", params.table);
  if (params?.page) searchParams.append("page", params.page.toString());
  if (params?.limit) searchParams.append("limit", params.limit.toString());

  const res = await fetch(`${API_BASE_URL}/api/orders?${searchParams}`, {
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Lấy danh sách order thất bại");
  return data.data as { orders: Order[]; total: number; page: number; limit: number };
};

// ==================== LẤY ORDER THEO ID ====================
export const getOrderById = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
    headers: getAuthHeaders(),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Không tìm thấy order");
  return data.data as Order;
};

// ==================== LẤY ORDERS THEO BÀN ====================
export const getOrdersByTable = async (tableId: string) => {
  const res = await fetch(`${API_BASE_URL}/api/orders/table/${tableId}`, {
    headers: getAuthHeaders(),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Lấy order theo bàn thất bại");
  return data.data as Order[];
};

// ==================== TẠO ORDER MỚI ====================
export const createOrder = async (payload: {
  table: string;
  items: { productId: string; quantity: number; note?: string }[];
}) => {
  const res = await fetch(`${API_BASE_URL}/api/orders`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Tạo order thất bại");
  return data.data as Order;
};

// ==================== THÊM MÓN VÀO ORDER ====================
export const addItemToOrder = async (
  orderId: string,
  item: { productId: string; quantity: number; note?: string }
) => {
  const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}/add-item`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(item),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Thêm món thất bại");
  return data.data as Order;
};

// ==================== XÓA MÓN KHỎI ORDER ====================
export const removeItemFromOrder = async (orderId: string, itemId: string) => {
  const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}/remove-item`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ itemId }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Xóa món thất bại");
  return data.data as Order;
};

// ==================== CẬP NHẬT SỐ LƯỢNG MÓN ====================
export const updateItemQuantity = async (
  orderId: string,
  itemId: string,
  quantity: number
) => {
  const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}/update-quantity`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ itemId, quantity }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Cập nhật số lượng thất bại");
  return data.data as Order;
};

// ==================== CẬP NHẬT TRẠNG THÁI ORDER ====================
export const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
  const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Cập nhật trạng thái thất bại");
  return data.data as Order;
};

// ==================== THANH TOÁN ORDER ====================
export const processPayment = async (orderId: string, paymentMethod: "cash" | "qr") => {
  const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}/payment`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ paymentMethod }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Thanh toán thất bại");
  return data.data as Order;
};

// ==================== HỦY ORDER ====================
export const cancelOrder = async (orderId: string) => {
  const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}/cancel`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Hủy order thất bại");
  }
  return true;
};