// app/admin/layout.tsx
import { ToastProvider } from '@/components/ui/toast-provider';
import AdminSidebar from '@/components/AdminSidebar';
import AdminHeader from '@/components/AdminHeader';
import { redirect } from 'next/navigation';


// Optional: Bảo vệ toàn bộ route /admin
// Nếu không có token thì đá về login
// const user = getCurrentUser();
// if (!user) redirect('/account/login');

export const metadata = {
  title: 'VANXE QUÁN - Quản Lý',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-black text-white flex">
        {/* Sidebar cố định */}
        <AdminSidebar />

        {/* Main Area chính */}
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <div className="max-w-7xl mx-auto p-6 lg:p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}