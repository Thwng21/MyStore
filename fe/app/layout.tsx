// app/layout.tsx
import './globals.css';
import { Bebas_Neue } from 'next/font/google';
import type { Metadata } from 'next';
import FloatingButtons from '@/components/FloatingButtons';
import BackToTop from '@/components/BackToTop';
import { ToastProvider } from '@/components/ui/toast-provider';

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
});

export const metadata: Metadata = {
  title: "VANXE Quán",
  description: "Nhà hàng VANXE - Hương vị đỉnh cao",
  icons: {
    icon: '/img/th.png',             
    shortcut: '/img/th.png',     
    apple: '/img/th.png',            
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${bebas.className} relative`}>
        <ToastProvider>
          {children}
          <FloatingButtons />
          <BackToTop />
        </ToastProvider>
      </body>
    </html>
  );
}