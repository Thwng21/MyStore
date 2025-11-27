// components/admin/AdminHeader.tsx
"use client";

import { Bell, Search, User } from 'lucide-react';
import { getCurrentUser } from '@/lib/api/auth';

export default function AdminHeader() {
  const user = getCurrentUser();

  return (
    <header className="bg-black/70 backdrop-blur-2xl border-b border-white/10 px-8 py-5 sticky top-0 z-40">
      <div className="flex items-center justify-between">

        {/* Tiêu đề động theo trang */}
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-black text-orange-400">
            {user?.role === 'admin' ? 'CHỦ QUÁN' : 'NHÂN VIÊN'}
          </h2>
          <span className="text-gray-400">•</span>
          <p className="text-gray-300 font-medium">
            Chào mừng quay lại, <span className="text-green-400 font-bold">{user?.fullname || user?.username}</span>
          </p>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-6">

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm bàn, món, order..."
              className="pl-12 pr-6 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition w-80"
            />
          </div>

          {/* Notification */}
          <button className="relative p-3 hover:bg-white/10 rounded-full transition">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          </button>

          {/* Avatar */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-600 rounded-full flex items-center justify-center font-black text-xl">
              {user?.fullname?.charAt(0).toUpperCase() || 'A'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}