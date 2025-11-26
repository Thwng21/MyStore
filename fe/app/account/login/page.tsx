// app/login/page.tsx
"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Beer, User, Lock, LogIn, Phone, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Đăng nhập thành công với số: ${phone}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">

      {/* Background tường gạch + overlay tối */}
      <div className="absolute inset-0">
        <Image
          src="/img/tuong.png"
          alt="VANXE Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-black/70" />

      {/* Nội dung chính - 2 cột, không scroll */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* === TRÁI: Giới thiệu VANXE QUÁN === */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white max-w-lg text-center lg:text-left"
        >
          {/* Logo + tên quán */}
          <div className="flex justify-center lg:justify-start items-center gap-4 mb-8">
            <div className="relative">
              <Beer className="w-20 h-20 text-orange-500" />
              <div className="absolute inset-0 blur-xl bg-orange-500/30 rounded-full" />
            </div>
            <div>
              <h1 className="text-6xl md:text-8xl font-black text-orange-500 tracking-wider">
                VANXE
              </h1>
              <p className="text-xl text-green-400 font-bold italic">Nhà Có Chát</p>
            </div>
          </div>

          {/* Slogan + mô tả */}
          <h2 className="text-4xl md:text-5xl font-black text-yellow-400 mb-6 leading-tight">
            Bình Dân Cao Cấp
          </h2>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8">
            Nâng tầm văn hóa nhậu vỉa hè Sài Gòn – sạch sẽ, an toàn, văn minh.
            <br />
            <span className="text-orange-300 font-bold">Nơi bạn không chỉ nhậu – mà còn tự hào.</span>
          </p>

          {/* Thông tin nhanh */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm md:text-base">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl p-4">
              <Phone className="w-8 h-8 text-green-400" />
              <div>
                <p className="font-bold">Hotline</p>
                <p className="text-orange-300">0903.129.370</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl p-4">
              <MapPin className="w-8 h-8 text-green-400" />
              <div>
                <p className="font-bold">Địa chỉ</p>
                <p className="text-orange-300">Gò Nổi, TP.HCM</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl p-4">
              <Clock className="w-8 h-8 text-green-400" />
              <div>
                <p className="font-bold">Mở cửa</p>
                <p className="text-orange-300">09:00 – 24:00</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* === PHẢI: Form đăng nhập nhỏ gọn === */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-sm"
        >
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8">

            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-white">
                ĐĂNG NHẬP QUẢN LÝ
              </h2>
              <p className="text-gray-300 text-sm mt-2">Chỉ dành cho nhân viên nội bộ</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Số điện thoại"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mật khẩu"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 rounded-xl font-bold text-white flex items-center justify-center gap-3 shadow-xl"
              >
                <LogIn className="w-5 h-5" />
                ĐĂNG NHẬP
              </motion.button>
            </form>

            <p className="text-center text-gray-400 text-xs mt-6">
              © 2025 VANXE QUÁN – Được nhậu bởi những người yêu bình dân
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}