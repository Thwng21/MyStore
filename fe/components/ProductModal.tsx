// components/admin/ProductModal.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Beer, Pizza } from "lucide-react";
import { createProduct, updateProduct, Product } from "@/lib/api/product";
import { getAllCategories, Category } from "@/lib/api/category";
import { useToast } from "@/components/ui/toast-provider";
import Loader from "@/components/Loader";
import ConfirmDialog from "@/components/ConfirmDialog";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  onSuccess: () => void;
}

export default function ProductModal({ isOpen, onClose, product, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showConfirmClose, setShowConfirmClose] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    price: 0,
    image: "",
    description: "",
    type: "drink" as "drink" | "food",
    category: "",
    isAvailable: true,
  });

  const [initialFormData, setInitialFormData] = useState<any>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (err) {
      console.error("Lỗi tải danh mục:", err);
    }
  };

  useEffect(() => {
    let data;
    if (product) {
      data = {
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.image || "",
        description: product.description || "",
        type: product.type,
        category: product.category?._id || (categories.length > 0 ? categories[0]._id : ""),
        isAvailable: product.isAvailable,
      };
    } else {
      data = {
        name: "",
        slug: "",
        price: 0,
        image: "",
        description: "",
        type: "drink" as "drink" | "food",
        category: categories.length > 0 ? categories[0]._id : "",
        isAvailable: true,
      };
    }
    setFormData(data);
    setInitialFormData(data);
  }, [product, isOpen, categories]);

  const hasChanges = () => {
    return JSON.stringify(formData) !== JSON.stringify(initialFormData);
  };

  const handleCloseRequest = () => {
    if (hasChanges()) {
      setShowConfirmClose(true);
    } else {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.category) {
      toast("error", "Lỗi", "Vui lòng chọn danh mục món ăn");
      setLoading(false);
      return;
    }

    try {
      if (product) {
        await updateProduct(product._id, formData);
        toast("success", "Thành công!", `"${formData.name}" đã được cập nhật`);
      } else {
        await createProduct(formData);
        toast("success", "Thêm món thành công!", `"${formData.name}" đã lên kệ!`);
      }
      onSuccess();
    } catch (err: any) {
      toast("error", "Lỗi", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Tạo slug tự động từ tên
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 md:p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-linear-to-br from-gray-900 to-black rounded-3xl w-full max-w-2xl border border-white/20 shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Header - Fixed */}
          <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/10 shrink-0">
            <h2 className="text-3xl md:text-4xl font-black text-orange-500">
              {product ? "SỬA MÓN" : "THÊM MÓN MỚI"}
            </h2>
            <button 
              onClick={handleCloseRequest} 
              className="p-2 hover:bg-white/10 rounded-xl transition"
            >
              <X className="w-8 h-8 text-gray-400 hover:text-white" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto p-6 md:p-8 custom-scrollbar">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Tên món</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      setFormData(prev => ({ ...prev, slug: generateSlug(e.target.value) }));
                    }}
                    className="w-full px-5 py-4 bg-white/10 border border-white/30 rounded-2xl text-white focus:outline-none focus:border-orange-400 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Slug (tự động)</label>
                  <input
                    type="text"
                    value={formData.slug}
                    readOnly
                    className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-2xl text-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Giá (VNĐ)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-5 py-4 bg-white/10 border border-white/30 rounded-2xl text-white focus:outline-none focus:border-orange-400 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2">Loại món</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, type: "drink" })}
                      className={`py-4 rounded-2xl font-bold cursor-pointer flex items-center justify-center gap-3 transition ${
                        formData.type === "drink" ? "bg-orange-600" : "bg-white/10 hover:bg-white/20"
                      }`}
                    >
                      <Beer className="w-6 h-6" /> ĐỒ UỐNG
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, type: "food" })}
                      className={`py-4 rounded-2xl font-bold flex cursor-pointer items-center justify-center gap-3 transition ${
                        formData.type === "food" ? "bg-red-600" : "bg-white/10 hover:bg-white/20"
                      }`}
                    >
                      <Pizza className="w-6 h-6" /> MÓN ĂN
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">Danh mục</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-5 py-4 bg-white/10 border border-white/30 rounded-2xl text-white focus:outline-none focus:border-orange-400 transition appearance-none"
                >
                  <option value="" disabled className="bg-gray-900 text-gray-400">Chọn danh mục</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id} className="bg-gray-900 text-white">
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">Link ảnh món (tùy chọn)</label>
                <div className="flex items-center gap-4">
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="flex-1 px-5 py-4 bg-white/10 border border-white/30 rounded-2xl text-white focus:outline-none focus:border-orange-400 transition"
                  />
                  <button type="button" className="p-4 bg-white/10 rounded-xl hover:bg-white/20 transition">
                    <Upload className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2">Mô tả món</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-5 py-4 bg-white/10 border border-white/30 rounded-2xl text-white focus:outline-none focus:border-orange-400 transition resize-none"
                  placeholder="Mô tả hấp dẫn, cay nồng,..."
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-linear-to-r from-green-600 cursor-pointer to-green-700 hover:from-green-500 hover:to-green-600 py-5 rounded-2xl font-black text-xl disabled:opacity-70 transition shadow-xl flex items-center justify-center gap-3"
                >
                  {loading ? "ĐANG LƯU..." : product ? "CẬP NHẬT" : "THÊM MÓN"}
                </button>
                <button
                  type="button"
                  onClick={handleCloseRequest}
                  className="px-10 py-5 bg-gray-700 hover:bg-gray-600 cursor-pointer rounded-2xl font-black text-xl transition"
                >
                  HỦY
                </button>
              </div>
            </form>
          </div>

          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex items-center justify-center rounded-3xl">
              <Loader variant="beer" text="Đang xử lý..." />
            </div>
          )}
        </motion.div>
      </div>

      {/* Confirm Close Dialog */}
      <ConfirmDialog
        isOpen={showConfirmClose}
        title="Hủy thay đổi?"
        message="Bạn có thay đổi chưa lưu. Bạn có chắc chắn muốn đóng không?"
        variant="warning"
        confirmText="Đóng luôn"
        cancelText="Tiếp tục sửa"
        onConfirm={() => {
          setShowConfirmClose(false);
          onClose();
        }}
        onCancel={() => setShowConfirmClose(false)}
      />
    </>
  );
}