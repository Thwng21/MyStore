"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Phone, MessageCircle, MapPin, Clock, Beer } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Nền tường gạch + lớp tối để đồng bộ với toàn site */}
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/img/tuong.png"
          alt="Background tường gạch"
          fill
          className="object-cover"
        />
      </div>

      {/* Viền rách trên cùng – giống slider món ăn */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-gray-900/90 via-gray-800/70 to-transparent pointer-events-none" />

      <div className="relative z-10 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">

            {/* Cột 1: Logo + Slogan */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Beer className="w-12 h-12 text-orange-500" />
                <h2 className="text-4xl font-black text-orange-500 tracking-wider">
                  VANXE QUÁN
                </h2>
              </div>
              <p className="text-2xl font-bold text-green-400 italic">
                Rượu gạo - nhà nấu
              </p>
              <p className="text-gray-300 leading-relaxed">
                Nâng tầm văn hóa nhậu bình dân
              </p>
            </div>

            {/* Cột 2: Liên hệ nhanh */}
            <div>
              <h3 className="text-2xl font-black text-yellow-400 mb-6 flex items-center gap-3">
                <Phone className="w-7 h-7" />
                LIÊN HỆ NGAY
              </h3>
              <div className="space-y-4 text-lg">
                <Link href="tel:0903129370" className="flex items-center gap-3 hover:text-orange-400 transition">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6" />
                  </div>
                  <span className="font-bold">0903.129.370</span>
                </Link>

                <Link href="https://zalo.me/0903129370" className="flex items-center gap-3 hover:text-orange-400 transition">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <span className="font-bold">Zalo: 0903.129.370</span>
                </Link>

                <Link href="https://facebook.com/vanxequan" className="flex items-center gap-3 hover:text-orange-400 transition">
                  <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
                    <Facebook className="w-6 h-6" />
                  </div>
                  <span className="font-bold">fb.com/vanxequan</span>
                </Link>
              </div>
            </div>

            {/* Cột 3: Địa chỉ & Giờ mở cửa */}
            <div>
              <h3 className="text-2xl font-black text-yellow-400 mb-6 flex items-center gap-3">
                <MapPin className="w-8 h-8" />
                THÔNG TIN
              </h3>
              <div className="space-y-5 text-gray-200">
                <div className="flex gap-3">
                  <MapPin className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                  <p className="leading-relaxed">
                    <strong className="text-white">Địa chỉ:</strong><br />
                    110 dh10 Hòa Giang, Gò Nổi, Đà Nẵng
                  </p>
                </div>
                <div className="flex gap-3">
                  <Clock className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <p>
                    <strong className="text-white">Giờ mở cửa:</strong><br />
                    10:00 – 23:00 (T2 - T6)<br />
                    09:00 – 24:00 (T7, CN & Lễ)
                  </p>
                </div>
              </div>
            </div>

            {/* Cột 4: Fanpage + QR Zalo */}
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-yellow-400 mb-6">
                THEO DÕI CHÚNG TÔI
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl">
                  <Image
                    src="/img/qr-fanpage.jpg"
                    alt="QR Fanpage"
                    width={200}
                    height={200}
                    className="w-full h-auto rounded-lg"
                  />
                  <p className="text-center text-black font-bold mt-2 text-sm">Fanpage</p>
                </div>
                <div className="bg-white p-4 rounded-xl">
                  <Image
                    src="/img/qr-zalo.jpg"
                    alt="QR Zalo"
                    width={200}
                    height={200}
                    className="w-full h-auto rounded-lg"
                  />
                  <p className="text-center text-black font-bold mt-2 text-sm">Zalo OA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dòng cuối cùng */}
          <div className="mt-16 pt-10 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 <span className="text-orange-500 font-bold">VANXE QUÁN</span>. 
              Được nhậu bởi những người yêu bình dân.
            </p>
          </div>
        </div>
      </div>

      {/* Hiệu ứng ly bia nhỏ ở góc dưới (tùy chọn nhưng cực chất) */}
      <div className="absolute bottom-4 right-8 opacity-20 hidden lg:block">
        <Beer className="w-32 h-32 text-yellow-600" />
      </div>
    </footer>
  );
}