"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getCurrentUser, logout } from '@/lib/api/auth';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push('/account/login');
  };

  return (
    <>
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Navbar */}
      <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="relative w-32 h-12 md:w-40 md:h-16">
                  <Image
                    src="/img/th.png"
                    alt="VANXE Quán Logo"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className="hidden md:flex flex-col">
                  <span className="ml-2 text-xl font-bold text-green-900">VANXE Quán</span>
                  <span className="ml-2 text-sm font-semibold text-yellow-500">Quán nhậu bình dân</span>
                </div>
              </Link>
            </div>

            {/* Conditional Rendering */}
            {isMounted && user ? (
              <>
                {/* Menu trung tâm */}
                <div className="hidden md:flex items-center space-x-8 text-lg font-bold text-green-900">
                  <Link href="/menu" className="hover:text-orange-600 transition">MENU</Link>
                  <Link href="/dia-diem" className="hover:text-orange-600 transition">ĐỊA ĐIỂM</Link>
                  <Link href="/hinh-anh" className="hover:text-orange-600 transition">HÌNH ẢNH</Link>
                  <Link href="/tin-tuc" className="hover:text-orange-600 transition">TIN TỨC</Link>
                  <Link href="/membership" className="hover:text-orange-600 transition">MEMBERSHIP/CSKH</Link>
                </div>

                {/* Nút đặt bàn & User Info */}
                <div className="flex items-center gap-3">
                  {/* User Info */}
                   <div className="hidden lg:flex flex-col items-end mr-2">
                      <span className="text-sm font-bold text-gray-700">Hi, {user.fullname || user.username}</span>
                      <button onClick={handleLogout} className="text-xs text-red-500 hover:underline font-semibold">Đăng xuất</button>
                  </div>

                  {/* Nút Zalo */}
                  <Link
                    href="https://zalo.me/0123456789"
                    target="_blank"
                    className="
                      group relative hidden lg:flex items-center 
                      bg-gradient-to-r from-orange-500 to-red-600 
                      text-white font-black text-xs uppercase tracking-wider
                      py-2.5 px-5 rounded-full 
                      shadow-lg hover:shadow-orange-500/50
                      transform hover:scale-105 active:scale-95 
                      transition-all duration-300 overflow-hidden
                    "
                  >
                    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-25 transition-opacity" />
                    <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    Zalo
                    <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>

                  {/* Nút Hotline */}
                  <Link
                    href="tel:19001234"
                    className="
                      group relative flex items-center 
                      bg-orange-600 hover:bg-orange-700 
                      text-white font-black text-xs uppercase tracking-wider
                      py-2.5 px-6 rounded-full 
                      shadow-xl hover:shadow-orange-600/60
                      ring-2 ring-orange-400/40
                      transform hover:scale-110 active:scale-95 
                      transition-all duration-300 overflow-hidden
                      animate-pulse hover:animate-none
                    "
                  >
                    <span className="absolute inset-0 rounded-full bg-orange-300 opacity-0 group-hover:opacity-30 scale-150 transition-all duration-500" />
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.75-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    Hotline
                  </Link>
                </div>
              </>
            ) : (
              // Guest View
              <div className="flex items-center gap-4">
 {/* Nút Zalo */}
                  <Link
                    href="https://zalo.me/0123456789"
                    target="_blank"
                    className="
                      group relative hidden lg:flex items-center 
                      bg-gradient-to-r from-orange-500 to-red-600 
                      text-white font-black text-xs uppercase tracking-wider
                      py-2.5 px-5 rounded-full 
                      shadow-lg hover:shadow-orange-500/50
                      transform hover:scale-105 active:scale-95 
                      transition-all duration-300 overflow-hidden
                    "
                  >
                    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-25 transition-opacity" />
                    <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    Zalo
                    <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>

                  {/* Nút Hotline */}
                  <Link
                    href="tel:19001234"
                    className="
                      group relative flex items-center 
                      bg-orange-600 hover:bg-orange-700 
                      text-white font-black text-xs uppercase tracking-wider
                      py-2.5 px-6 rounded-full 
                      shadow-xl hover:shadow-orange-600/60
                      ring-2 ring-orange-400/40
                      transform hover:scale-110 active:scale-95 
                      transition-all duration-300 overflow-hidden
                      animate-pulse hover:animate-none
                    "
                  >
                    <span className="absolute inset-0 rounded-full bg-orange-300 opacity-0 group-hover:opacity-30 scale-150 transition-all duration-500" />
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.75-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    Hotline
                  </Link>
                 <Link href="/account/login">
                    <Button variant="ghost" className="text-lg font-bold text-green-900 hover:text-orange-600 hover:bg-transparent">Đăng nhập</Button>
                 </Link>
                 <Link href="/account/register">
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-full px-6">Đăng ký</Button>
                 </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      <img src="/img/vien.webp" alt="Slideshow" className="w-full h-8 fixed top-17 rounded-lg shadow-lg" />
      </div>
    </>
  );
}
