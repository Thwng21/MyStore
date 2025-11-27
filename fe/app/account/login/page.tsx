// app/login/page.tsx
"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Beer, LogIn, Phone, MapPin, Clock, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/api/auth';
import { useToast } from '@/components/ui/toast-provider';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast(); // Dùng toast

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) return;

    setLoading(true);

    try {
      await login(username.trim(), password);
      toast("success", "Đăng nhập thành công!", `Chào mừng ${username} quay lại VANXE QUÁN`);
      router.push('/admin');
    } catch (err: any) {
      toast("error", "Đăng nhập thất bại", err.message || "Sai tên đăng nhập hoặc mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">

      <div className="absolute inset-0">
        <Image src="/img/tuong.png" alt="Background" fill className="object-cover opacity-60" priority />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/90" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* TRÁI: Giới thiệu */}
        <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
          className="text-white max-w-lg text-center lg:text-left">
          <div className="flex justify-center lg:justify-start items-center gap-4 mb-8">
            <div className="relative">
              <Beer className="w-24 h-24 text-orange-500 animate-pulse" />
              <div className="absolute inset-0 blur-2xl bg-orange-500/40 rounded-full animate-ping" />
            </div>
            <div>
              <h1 className="text-8xl font-black text-orange-500 tracking-wider drop-shadow-2xl">VANXE</h1>
              <p className="text-2xl text-green-400 font-black italic">Nhà Có Chát</p>
            </div>
          </div>

          <h2 className="text-6xl font-black text-yellow-400 mb-6 drop-shadow-2xl">Bình Dân Cao Cấp</h2>
          <p className="text-xl text-gray-200 leading-relaxed mb-8">
            Nâng tầm văn hóa nhậu vỉa hè Sài Gòn – sạch sẽ, an toàn, văn minh.
            <br />
            <span className="text-orange-300 font-bold text-xl">Nơi bạn không chỉ nhậu – mà còn tự hào.</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Phone, title: "Hotline", value: "0903.129.370" },
              { icon: MapPin, title: "Địa chỉ", value: "Gò Nổi, TP.HCM" },
              { icon: Clock, title: "Mở cửa", value: "09:00 – 24:00" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.2 }}
                className="flex items-center gap-4 bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 shadow-xl">
                <item.icon className="w-10 h-10 text-green-400" />
                <div>
                  <p className="font-bold text-sm text-gray-300 normal-case">{item.title}</p>
                  <p className="text-orange-300 font-black normal-case">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* PHẢI: Form */}
        <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-10">

            <div className="text-center mb-10">
              <h2 className="text-5xl font-black text-green-400 drop-shadow-2xl">ĐĂNG NHẬP QUẢN LÝ</h2>
              <p className="text-gray-300 text-sm mt-3 normal-case">Dành riêng cho nhân viên VANXE QUÁN</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-orange-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Tên đăng nhập hoặc SĐT"
                  className="w-full pl-14 pr-6 py-5 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-gray-400 text-lg focus:outline-none focus:border-orange-400 focus:bg-white/20 transition-all normal-case"
                  required
                  disabled={loading}
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-orange-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mật khẩu"
                  className="w-full pl-14 pr-6 py-5 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-gray-400 text-lg focus:outline-none focus:border-orange-400 focus:bg-white/20 transition-all normal-case"
                  required
                  disabled={loading}
                />
              </div>

              <motion.button
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 disabled:opacity-70 rounded-2xl font-black text-white text-xl flex items-center justify-center gap-3 shadow-2xl transition-all"
              >
                {loading ? (
                  <>Đang đăng nhập...</>
                ) : (
                  <>ĐĂNG NHẬP NGAY</>
                )}
              </motion.button>
            </form>

            <p className="text-center text-gray-500 text-xs mt-8 normal-case">
              © 2025 VANXE QUÁN – Được nhậu bởi những người yêu bình dân
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}