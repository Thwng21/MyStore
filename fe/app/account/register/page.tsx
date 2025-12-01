// app/register/page.tsx
"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Beer, User, Phone, Lock, Mail, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/api/auth';
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
  const router = useRouter();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: name === 'username' ? value.toUpperCase() : value 
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

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
      setTimeout(() => router.push('/account/login'), 2000);
    } catch (err: any) {
      toast("error", "Đăng ký thất bại", err.message || "Vui lòng kiểm tra lại thông tin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black overflow-hidden">
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

      {/* Nội dung chính - giới hạn chiều cao và cho phép cuộn nội bộ nếu cần (nhưng hiếm khi cần) */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* TRÁI: Giới thiệu */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-center lg:text-left space-y-6"
          >
            <div className="flex justify-center lg:justify-start items-center gap-4">
              <div className="relative">
                <Beer className="w-16 h-16 md:w-20 h-20 text-orange-500 animate-pulse" />
                <div className="absolute inset-0 blur-2xl bg-orange-500/40 rounded-full animate-ping" />
              </div>
              <div>
                <h1 className="text-5xl md:text-7xl font-black text-orange-500 tracking-wider drop-shadow-2xl">
                  VANXE
                </h1>
                <p className="text-lg md:text-2xl text-green-400 font-black italic">Nhà Có Chát</p>
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-yellow-400 leading-tight drop-shadow-2xl">
              Bình Dân Cao Cấp
            </h2>
            <p className="text-base md:text-lg text-gray-200 leading-relaxed">
              Gia nhập đội ngũ VANXE QUÁN – nơi văn hóa nhậu vỉa hè được nâng tầm!
              <br className="hidden sm:block" />
              <span className="text-orange-300 font-bold text-lg block mt-2">
                Cùng nhau làm nên thương hiệu nhậu Sài Gòn đích thực.
              </span>
            </p>
          </motion.div>

          {/* PHẢI: Form đăng ký */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-6 md:p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-black text-green-400 drop-shadow-2xl">
                  ĐĂNG KÝ TÀI KHOẢN
                </h2>
                <p className="text-gray-300 text-sm mt-2">Dành cho nhân viên mới & đối tác</p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                {[
                  { icon: User, name: "username", placeholder: "Tên đăng nhập", type: "text" },
                  { icon: User, name: "fullname", placeholder: "Họ và tên", type: "text" },
                  { icon: Phone, name: "phone", placeholder: "Số điện thoại", type: "text" },
                  { icon: Lock, name: "password", placeholder: "Mật khẩu", type: "password" },
                  { icon: Lock, name: "confirmPassword", placeholder: "Xác nhận mật khẩu", type: "password" },
                ].map((field) => {
                  const Icon = field.icon;
                  return (
                    <div key={field.name} className="relative">
                      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 text-base focus:outline-none focus:border-orange-400 focus:bg-white/20 transition-all disabled:opacity-70 uppercase"
                        required
                        disabled={loading}
                      />
                    </div>
                  );
                })}

                <motion.button
                  whileHover={{ scale: loading ? 1 : 1.05 }}
                  whileTap={{ scale: loading ? 1 : 0.95 }}
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 disabled:opacity-70 rounded-xl font-black text-white text-lg flex items-center justify-center gap-3 shadow-2xl transition-all mt-6"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                      Đang tạo tài khoản...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      ĐĂNG KÝ NGAY
                    </>
                  )}
                </motion.button>

                <p className="text-center text-gray-400 text-sm mt-4">
                  Đã có tài khoản?{' '}
                  <a href="/account/login" className="text-green-400 font-bold hover:underline">
                    Đăng nhập
                  </a>
                </p>

                <p className="text-center text-gray-500 text-xs mt-6">
                  © 2025 VANXE QUÁN – Bình dân nhưng phải chất!
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}