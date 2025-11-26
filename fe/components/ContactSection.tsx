// components/ContactSection.tsx
"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Facebook, MessageCircle, Beer } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-black">

      {/* Background tường gạch + lớp tối */}
      <div className="absolute inset-0">
        <Image
          src="/img/tuong.png"
          alt="Background"
          fill
          className="object-cover opacity-40"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-wider text-yellow-400 drop-shadow-2xl">
            LIÊN HỆ
          </h2>
          <h2 className="text-7xl md:text-9xl lg:text-[10rem] font-black tracking-wider text-green-400 -mt-8 md:-mt-12 drop-shadow-2xl">
            VANXE QUÁN
          </h2>
          <p className="text-xl md:text-2xl text-orange-300 font-bold mt-6 italic">
            Nhà Có Chát – Bình Dân Cao Cấp
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">

          {/* Cột 1: Hotline + Zalo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/20 shadow-2xl"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Phone className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-3xl font-black text-white mb-4">HOTLINE</h3>
            <p className="text-4xl font-black text-orange-400 mb-4">0903.129.370</p>
            <div className="flex justify-center gap-4 mt-6">
              <a
                href="tel:0903129370"
                className="w-14 h-14 bg-green-600 hover:bg-green-500 rounded-full flex items-center justify-center transition transform hover:scale-110"
              >
                <Phone className="w-8 h-8 text-white" />
              </a>
              <a
                href="https://zalo.me/0903129370"
                target="_blank"
                className="w-14 h-14 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition transform hover:scale-110"
              >
                <MessageCircle className="w-8 h-8 text-white" />
              </a>
            </div>
          </motion.div>

          {/* Cột 2: Địa chỉ */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/20 shadow-2xl"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <MapPin className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-3xl font-black text-white mb-6">ĐỊA CHỈ</h3>
            <p className="text-xl md:text-2xl text-orange-300 font-bold leading-relaxed">
              123 Đường ABC,<br />
              Phường Gò Nổi,<br />
              TP. Hồ Chí Minh
            </p>
            <div className="mt-8">
              <a
                href="https://maps.google.com/?q=VANXE+Quán"
                target="_blank"
                className="inline-flex items-center gap-3 bg-orange-600 hover:bg-orange-500 px-8 py-4 rounded-full font-bold text-white text-lg transition transform hover:scale-105"
              >
                <MapPin className="w-6 h-6" />
                XEM BẢN ĐỒ
              </a>
            </div>
          </motion.div>

          {/* Cột 3: Giờ mở cửa + Fanpage */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/20 shadow-2xl"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Clock className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-3xl font-black text-white mb-6">GIỜ MỞ CỬA</h3>
            <div className="text-orange-300 text-xl font-bold space-y-2">
              <p>T2 - T6: 10:00 – 23:00</p>
              <p>T7 - CN: 09:00 – 24:00</p>
              <p className="text-green-400 text-2xl mt-4">Luôn mở cửa Lễ, Tết</p>
            </div>
            <div className="mt-8">
              <a
                href="https://facebook.com/vanxequan"
                target="_blank"
                className="inline-flex items-center gap-3 bg-blue-700 hover:bg-blue-600 px-8 py-4 rounded-full font-bold text-white text-lg transition transform hover:scale-105"
              >
                <Facebook className="w-6 h-6" />
                THEO DÕI FANPAGE
              </a>
            </div>
          </motion.div>
        </div>

        {/* Dòng chữ cuối cùng + ly bia trang trí */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="flex justify-center items-center gap-6 mb-8">
            <Beer className="w-16 h-16 text-orange-500 animate-pulse" />
            <p className="text-3xl md:text-5xl font-black text-green-400 drop-shadow-2xl">
              ĐẾN VANXE – NHẬU LÀ PHẢI CHẤT!
            </p>
            <Beer className="w-16 h-16 text-orange-500 animate-pulse" />
          </div>
          <p className="text-gray-300 text-lg">
            © 2025 VANXE QUÁN – Được nhậu bởi những người yêu bình dân
          </p>
        </motion.div>
      </div>
    </section>
  );
}