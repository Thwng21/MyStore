// app/admin/page.tsx
"use client";
import { Beer, Table2, ShoppingCart, Users, DollarSign, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AdminDashboard() {
  const stats = [
    { icon: Table2, label: "Bàn đang hoạt động", value: "24/40", color: "text-green-400", href: "/admin/tables" },
    { icon: ShoppingCart, label: "Đơn hôm nay", value: "89", color: "text-orange-400", href: "/admin/orders" },
    { icon: DollarSign, label: "Doanh thu hôm nay", value: "127.450.000đ", color: "text-yellow-400", href: "/admin/reports" },
    { icon: Users, label: "Khách đang có mặt", value: "156", color: "text-blue-400", href: "/admin/customers" },
  ];

  return (
    <div className="space-y-10">
      {/* Chào mừng */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="hero text-center py-12"
      >
        <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 drop-shadow-2xl">
          VANXE QUÁN
        </h1>
        <p className="text-3xl text-green-400 font-bold mt-4">HỆ THỐNG QUẢN LÝ</p>
        <p className="text-xl text-gray-300 mt-6">Chào mừng quay lại, anh chủ!</p>
      </motion.div>

      {/* Thẻ thống kê */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <Link href={item.href} key={i}>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all cursor-pointer shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <item.icon className={`w-14 h-14 ${item.color} opacity-80`} />
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
              <p className="text-gray-400 text-sm">{item.label}</p>
              <p className={`text-4xl font-black mt-3 ${item.color}`}>{item.value}</p>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Nút hành động nhanh */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <Link href="/admin/tables">
          <motion.div whileHover={{ scale: 1.08 }} className="bg-gradient-to-br from-green-600 to-green-800 rounded-3xl p-10 text-center shadow-2xl">
            <Table2 className="w-20 h-20 mx-auto mb-6" />
            <h3 className="text-3xl font-black">QUẢN LÝ BÀN</h3>
          </motion.div>
        </Link>

        <Link href="/admin/orders">
          <motion.div whileHover={{ scale: 1.08 }} className="bg-gradient-to-br from-orange-600 to-red-600 rounded-3xl p-10 text-center shadow-2xl">
            <ShoppingCart className="w-20 h-20 mx-auto mb-6" />
            <h3 className="text-3xl font-black">GỌI MÓN & ORDER</h3>
          </motion.div>
        </Link>

        <Link href="/admin/staff">
          <motion.div whileHover={{ scale: 1.08 }} className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-10 text-center shadow-2xl">
            <Users className="w-20 h-20 mx-auto mb-6" />
            <h3 className="text-3xl font-black">NHÂN VIÊN</h3>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}