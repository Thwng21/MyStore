// app/register/page.tsx
"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Beer, User, Phone, Lock, Mail, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/api/auth'; // Dùng hàm register từ lib/auth.ts
import { useToast } from '@/components/ui/toast-provider';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  if (formData.password !== formData.confirmPassword) {
    toast("warning", "Lỗi nhập liệu", "Mật khẩu xác nhận không khớp!");
    return;
  }
  if (formData.password.length < 6) {
    toast("warning", "Mật khẩu yếu", "Mật khẩu phải ít nhất 6 ký tự");
    return;
  }

  setLoading(true);

  try {
    await register({
      username: formData.username.trim(),
      fullname: formData.fullname,
      phone: formData.phone,
      password: formData.password,
    });
    toast("success", "Đăng ký thành công!", "Tài khoản đã được tạo. Vui lòng chờ admin duyệt.");
    setTimeout(() => router.push('/login'), 2000);
  } catch (err: any) {
    toast("error", "Đăng ký thất bại", err.message || "Vui lòng kiểm tra lại thông tin");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">

      {/* Background tường gạch */}
      <div className="absolute inset-0">
        <Image
          src="/img/tuong.png"
          alt="VANXE Background"
          fill
          className="object-cover opacity-60"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/90" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* TRÁI: Giới thiệu VANXE */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white max-w-lg text-center lg:text-left"
        >
          <div className="flex justify-center lg:justify-start items-center gap-4 mb-8">
            <div className="relative">
              <Beer className="w-20 h-20 md:w-24 md:h-24 text-orange-500 animate-pulse" />
              <div className="absolute inset-0 blur-2xl bg-orange-500/40 rounded-full animate-ping" />
            </div>
            <div>
              <h1 className="text-6xl md:text-8xl font-black text-orange-500 tracking-wider drop-shadow-2xl">
                VANXE
              </h1>
              <p className="text-xl md:text-2xl text-green-400 font-black italic">Nhà Có Chát</p>
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-yellow-400 mb-6 leading-tight drop-shadow-2xl">
            Bình Dân Cao Cấp
          </h2>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
            Gia nhập đội ngũ VANXE QUÁN – nơi văn hóa nhậu vỉa hè được nâng tầm!
            <br />
            <span className="text-orange-300 font-bold text-xl">Cùng nhau làm nên thương hiệu nhậu Sài Gòn đích thực.</span>
          </p>
        </motion.div>

        {/* PHẢI: Form đăng ký */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-8 md:p-10">

            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-black text-green-400 drop-shadow-2xl">
                ĐĂNG KÝ TÀI KHOẢN
              </h2>
              <p className="text-gray-300 text-sm mt-3">Dành cho nhân viên mới & đối tác</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-orange-400" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Tên đăng nhập"
                  className="w-full pl-14 pr-6 py-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-gray-400 text-lg focus:outline-none focus:border-orange-400 focus:bg-white/20 transition-all"
                  required
                  disabled={loading}
                />
              </div>

              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-orange-400" />
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Họ và tên"
                  className="w-full pl-14 pr-6 py-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-gray-400 text-lg focus:outline-none focus:border-orange-400 focus:bg-white/20 transition-all"
                  required
                  disabled={loading}
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-orange-400" />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Số điện thoại"
                  className="w-full pl-14 pr-6 py-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-gray-400 text-lg focus:outline-none focus:border-orange-400 focus:bg-white/20 transition-all"
                  required
                  disabled={loading}
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-orange-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Mật khẩu"
                  className="w-full pl-14 pr-6 py-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-gray-400 text-lg focus:outline-none focus:border-orange-400 focus:bg-white/20 transition-all"
                  required
                  disabled={loading}
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-orange-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Xác nhận mật khẩu"
                  className="w-full pl-14 pr-6 py-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-gray-400 text-lg focus:outline-none focus:border-orange-400 focus:bg-white/20 transition-all"
                  required
                  disabled={loading}
                />
              </div>

              {/* Lỗi */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-center font-bold bg-red-900/50 px-4 py-3 rounded-xl"
                >
                  {error}
                </motion.p>
              )}

              {/* Nút đăng ký */}
              <motion.button
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 disabled:opacity-70 rounded-2xl font-black text-white text-xl flex items-center justify-center gap-3 shadow-2xl transition-all"
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    Đang tạo tài khoản...
                  </>
                ) : (
                  <>
                    <LogIn className="w-6 h-6" />
                    ĐĂNG KÝ NGAY
                  </>
                )}
              </motion.button>

              <p className="text-center text-gray-400 text-sm mt-6">
                Đã có tài khoản?{' '}
                <a href="/account/login" className="text-green-400 font-bold hover:underline">
                  Đăng nhập
                </a>
              </p>
            </form>

            <p className="text-center text-gray-500 text-xs mt-8">
              © 2025 VANXE QUÁN – Bình dân nhưng phải chất!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}