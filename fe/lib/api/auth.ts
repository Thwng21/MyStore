// src/lib/auth.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Helper: lấy token từ localStorage (an toàn cho SSR)
const getAuthHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// ==================== ĐĂNG KÝ ====================
export const register = async (data: {
  username: string;
  fullname: string;
  phone: string;
  password: string;
  role?: "admin" | "staff" | "customer";
}) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Đăng ký thất bại");
  }

  return result; // { success: true, data: user }
};

// ==================== ĐĂNG NHẬP ====================
export const login = async (username: string, password: string) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Sai tên đăng nhập hoặc mật khẩu");
  }

  // Lưu token + user vào localStorage
  if (result.data?.accessToken) {
    localStorage.setItem("accessToken", result.data.accessToken);
    localStorage.setItem("user", JSON.stringify(result.data.user || result.data));
  }

  return result.data;
};

// ==================== LẤY PROFILE ====================
export const getProfile = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
    headers: getAuthHeaders(),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Không thể lấy thông tin người dùng");
  }

  return result.data; // trả về user object
};

// ==================== ĐỔI MẬT KHẨU ====================
export const changePassword = async (oldPassword: string, newPassword: string) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/change-password`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ oldPassword, newPassword }),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Đổi mật khẩu thất bại");
  }

  return result; // { success: true, message: "Đổi mật khẩu thành công" }
};

// ==================== ĐĂNG XUẤT ====================
export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};

// ==================== KIỂM TRA ĐÃ ĐĂNG NHẬP CHƯA ====================
export const isAuthenticated = (): boolean => {
  return typeof window !== "undefined" && !!localStorage.getItem("accessToken");
};

// ==================== LẤY USER HIỆN TẠI (từ localStorage) ====================
export const getCurrentUser = () => {
  if (typeof window === "undefined") return null;
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};