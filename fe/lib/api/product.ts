// src/lib/product.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Helper lấy token
const getAuthHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// ==================== TYPE CHO PRODUCT ====================
export type ProductType = "drink" | "food";

export interface Product {
  _id: string;
  name: string;
  slug: string;
  category: {
    _id: string;
    name: string;
  } | null;
  price: number;
  image?: string;
  description?: string;
  isAvailable: boolean;
  type: ProductType;
  createdAt: string;
  updatedAt: string;
}

// ==================== LẤY TẤT CẢ SẢN PHẨM (có filter + phân trang) ====================
export const getAllProducts = async (params?: {
  category?: string;
  type?: ProductType;
  isAvailable?: boolean | string;
  page?: number;
  limit?: number;
}) => {
  const searchParams = new URLSearchParams();
  if (params?.category) searchParams.append("category", params.category);
  if (params?.type) searchParams.append("type", params.type);
  if (params?.isAvailable !== undefined) searchParams.append("isAvailable", params.isAvailable.toString());
  if (params?.page) searchParams.append("page", params.page.toString());
  if (params?.limit) searchParams.append("limit", params.limit.toString());

  const res = await fetch(`${API_BASE_URL}/api/products/getAll?${searchParams}`, {
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Lấy danh sách món thất bại");
  
  // Map backend response to expected format
  // Backend returns: { products: [], pagination: { ... } }
  return {
    docs: data.data.products,
    totalDocs: data.data.pagination.totalProducts,
    totalPages: data.data.pagination.totalPages,
    page: data.data.pagination.currentPage,
    limit: params?.limit || 20
  };
};

// ==================== LẤY SẢN PHẨM THEO ID ====================
export const getProductById = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    headers: getAuthHeaders(),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Không tìm thấy món");
  return data.data as Product;
};

// ==================== TẠO SẢN PHẨM MỚI (admin/staff) ====================
export const createProduct = async (productData: {
  name: string;
  slug: string;
  category?: string;
  price: number;
  image?: string;
  description?: string;
  type: ProductType;
  isAvailable?: boolean;
}) => {
  const res = await fetch(`${API_BASE_URL}/api/products/create`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(productData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Tạo món thất bại");
  return data.data as Product;
};

// ==================== CẬP NHẬT SẢN PHẨM ====================
export const updateProduct = async (
  id: string,
  productData: Partial<{
    name: string;
    slug: string;
    category: string;
    price: number;
    image?: string;
    description?: string;
    type: ProductType;
    isAvailable?: boolean;
  }>
) => {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(productData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Cập nhật món thất bại");
  return data.data as Product;
};

// ==================== XÓA SẢN PHẨM ====================
export const deleteProduct = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Xóa món thất bại");
  }
  return true;
};

// ==================== CẬP NHẬT TRẠNG THÁI CÒN BÁN ====================
export const updateProductAvailability = async (id: string, isAvailable: boolean) => {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ isAvailable }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Cập nhật trạng thái thất bại");
  return data.data as Product;
};