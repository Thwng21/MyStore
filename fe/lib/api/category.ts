
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Helper lấy token
const getAuthHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export interface Category {
  _id: string;
  name: string;
  description?: string;
}

// ==================== LẤY TẤT CẢ DANH MỤC ====================
export const getAllCategories = async () => {
  const res = await fetch(`${API_BASE_URL}/api/categories/getAll`, {
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Lấy danh sách danh mục thất bại");
  return data.data as Category[];
};
