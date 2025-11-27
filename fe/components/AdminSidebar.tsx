// components/admin/AdminSidebar.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Beer, 
  Table2, 
  ShoppingCart, 
  Users, 
  Package, 
  BarChart3, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { useToast } from '@/components/ui/toast-provider';
import { logout } from '@/lib/api/auth';

const menuItems = [
  { icon: BarChart3, label: "Tổng quan", href: "/admin" },
  { icon: Table2, label: "Quản lý bàn", href: "/admin/tables" },
  { icon: ShoppingCart, label: "Đơn hàng", href: "/admin/orders" },
  { icon: Package, label: "Kho & Món", href: "/admin/menu" },
  { icon: Users, label: "Nhân viên", href: "/admin/staff" },
  { icon: BarChart3, label: "Báo cáo", href: "/admin/reports" },
  { icon: Settings, label: "Cài đặt", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast('success', "Đã đăng xuất", "Hẹn gặp lại anh chủ!");
  };

  return (
    <aside className="w-72 bg-gradient-to-b from-black via-gray-900 to-black border-r border-white/10 flex flex-col">
      {/* Logo */}
      <div className="p-8 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Beer className="w-14 h-14 text-orange-500 animate-pulse" />
            <div className="absolute inset-0 blur-xl bg-orange-500/30 rounded-full animate-ping" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-orange-500 tracking-wider">VANXE</h1>
            <p className="text-sm text-green-400 font-bold">QUẢN LÝ</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group
                ${isActive 
                  ? "bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-2xl shadow-orange-900/50" 
                  : "hover:bg-white/10 text-gray-300 hover:text-white"
                }`}
            >
              <item.icon className={`w-6 h-6 ${isActive ? "text-white" : "group-hover:text-orange-400"} transition`} />
              <span className="font-bold text-lg">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Đăng xuất */}
      <div className="p-6 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-4 px-5 py-4 bg-red-600 hover:bg-red-700 rounded-2xl font-bold text-lg transition-all hover:shadow-2xl hover:shadow-red-900/50"
        >
          <LogOut className="w-6 h-6" />
          ĐĂNG XUẤT
        </button>
      </div>
    </aside>
  );
}