// app/admin/menu/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Beer as BeerIcon,
  Pizza,
  Coffee,
  ToggleLeft,
  ToggleRight
} from "lucide-react";

import { 
  getAllProducts, 
  deleteProduct, 
  updateProductAvailability,
  Product 
} from "@/lib/api/product";

import { useToast } from "@/components/ui/toast-provider";
import { useConfirm } from "@/hooks/use-confirm";
import Loader from "@/components/Loader";
import ProductModal from "@/components/ProductModal";

export default function MenuProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "drink" | "food">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const toast = useToast();
  const { confirm, Dialog: ConfirmDialog } = useConfirm();

  // Load menu
  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts({ limit: 200 });
      setProducts(data.docs.sort((a: Product, b: Product) => a.name.localeCompare(b.name)));
    } catch (err: any) {
      toast.error("Lỗi tải menu", err.message || "Không thể kết nối server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // XÓA MÓN – DÙNG CONFIRM ĐẸP
  const handleDelete = async (id: string, name: string) => {
    const confirmed = await confirm({
      title: "XÓA MÓN NÀY THẬT À ANH CHỦ?",
      message: `"${name}" sẽ biến mất khỏi menu mãi mãi. Không cứu lại được đâu nha!`,
      variant: "beer",
      confirmText: "XÓA LUÔN",
      cancelText: "THA CHO NÓ",
    });

    if (!confirmed) return;

    setLoading(true);
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p._id !== id));
      toast.success("ĐÃ XÓA!", `"${name}" đã bay màu khỏi menu!`);
    } catch (err: any) {
      toast.error("Xóa thất bại", err.message);
    } finally {
      setLoading(false);
    }
  };

  // BẬT/TẮT BÁN MÓN
  const handleToggleAvailable = async (product: Product) => {
    setLoading(true);
    try {
      const updated = await updateProductAvailability(product._id, !product.isAvailable);
      setProducts(prev => prev.map(p => p._id === product._id ? updated : p));
      toast.success("Cập nhật thành công!", 
        `"${product.name}" → ${updated.isAvailable ? "ĐANG BÁN" : "HẾT HÀNG"}`
      );
    } catch (err: any) {
      toast.error("Cập nhật thất bại", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Lọc món
  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = filterType === "all" || p.type === filterType;
    return matchSearch && matchType;
  });

  const getTypeIcon = (type: "drink" | "food") => {
    return type === "drink" 
      ? <BeerIcon className="w-8 h-8 text-orange-400" />
      : <Pizza className="w-8 h-8 text-red-400" />;
  };

  // Khi thêm/sửa thành công → reload menu
  const onProductSuccess = () => {
    loadProducts(); // Tự động cập nhật danh sách
  };

  return (
    <>
      {/* ===== LOADER ĐẸP KHI ĐANG TẢI ===== */}
      {loading && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center">
          <Loader variant="beer" text="Đang rót bia & nướng mồi cho menu..." />
        </div>
      )}

      {/* ===== HEADER ===== */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-600 drop-shadow-2xl"
            >
              MENU VANXE
            </motion.h1>
            <p className="text-xl text-gray-400 mt-4">
              Tổng: <span className="text-green-400 font-bold">{products.length}</span> món • 
              Đang bán: <span className="text-green-400 font-bold">
                {products.filter(p => p.isAvailable).length}
              </span>
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setEditingProduct(null);
              setIsModalOpen(true);
            }}
            className="bg-linear-to-r from-green-900 cursor-pointer to-red-600 hover:from-green-500 hover:to-red-500 px-10 py-6 rounded-3xl font-black text-2xl flex items-center gap-4 shadow-2xl"
          >
            <Plus className="w-10 h-10" />
            THÊM MÓN MỚI
          </motion.button>
        </div>

        {/* Search & Filter */}
        <div className="mt-10 flex flex-col lg:flex-row gap-6">
          <div className="relative flex-1">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-7 h-7 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm bia, mồi, đồ nhậu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-8 py-6 bg-white/10 border border-white/20 rounded-3xl text-white text-lg placeholder-gray-500 focus:outline-none focus:border-orange-400 transition"
            />
          </div>

          <div className="flex gap-4">
            {(["all", "drink", "food"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-8 py-3 rounded-3xl cursor-pointer font-black text-lg transition-all ${
                  filterType === type 
                    ? type === "drink" ? "bg-orange-600" 
                    : type === "food" ? "bg-red-600" 
                    : "bg-linear-to-r from-orange-600 to-red-600"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {type === "all" ? "TẤT CẢ" : type === "drink" ? "ĐỒ UỐNG" : "MÓN ĂN"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===== DANH SÁCH MÓN ===== */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8"
      >
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product._id}
            layout
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -12, scale: 1.03 }}
            className="bg-white/5 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl group"
          >
            <div className="relative h-72 overflow-hidden">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-gray-800 to-black flex items-center justify-center">
                  {getTypeIcon(product.type)}
                </div>
              )}
              <div className={`absolute top-4 right-4 px-5 py-2 rounded-full font-black text-sm shadow-lg ${
                product.isAvailable ? "bg-green-600" : "bg-gray-700"
              }`}>
                {product.isAvailable ? "ĐANG BÁN" : "HẾT"}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-black text-white mb-2">{product.name}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {product.description || "Món ngon đúng điệu Sài Gòn"}
              </p>

              <div className="flex justify-between items-end mb-5">
                <span className="text-4xl font-black text-orange-400">
                  {product.price.toLocaleString()}đ
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                  product.type === "drink" ? "bg-orange-600" : "bg-red-600"
                }`}>
                  {product.type === "drink" ? "BIA & NƯỚC" : "MỒI NHẬU"}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleToggleAvailable(product)}
                  className={`py-3 rounded-2xl font-bold cursor-pointer text-sm transition-all ${
                    product.isAvailable 
                      ? "bg-gray-700 hover:bg-gray-600" 
                      : "bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
                  }`}
                >
                  {product.isAvailable ? "TẮT BÁN" : "BẬT BÁN"}
                </button>

                <button
                  onClick={() => {
                    setEditingProduct(product);
                    setIsModalOpen(true);
                  }}
                  className="py-3 bg-blue-600 cursor-pointer hover:bg-blue-500 rounded-2xl transition-all"
                >
                  <Edit3 className="w-5 h-5 mx-auto" />
                </button>

                <button
                  onClick={() => handleDelete(product._id, product.name)}
                  className="py-3 bg-red-600 cursor-pointer hover:bg-red-500 rounded-2xl transition-all"
                >
                  <Trash2 className="w-5 h-5 mx-auto" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Không có món */}
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-32">
          <Coffee className="w-40 h-40 mx-auto text-gray-700 mb-8" />
          <p className="text-4xl font-black text-gray-500">Chưa có món nào trong menu</p>
          <p className="text-gray-400 mt-4 text-xl">Nhấn "THÊM MÓN MỚI" để bắt đầu nhậu nào!</p>
        </div>
      )}

      {/* Modal thêm/sửa món */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        product={editingProduct}
        onSuccess={onProductSuccess}
      />

      {/* Confirm Dialog - BẮT BUỘC PHẢI RENDER */}
      <ConfirmDialog />
    </>
  );
}