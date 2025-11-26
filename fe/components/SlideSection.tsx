"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    title: "VANXE QUÁN",
    subtitle: "NHÀ CÓ CHÁT - HƯƠNG VỊ ĐƯỜNG PHỐ MỸ",
    description: "Thưởng thức burger, cánh gà, bò nướng chuẩn vị Mỹ ngay giữa lòng Sài Gòn",
    btnText: "XEM MENU NGAY",
    btnLink: "/menu",
    image: "/img/slide1.png", // bạn thay bằng ảnh thật
  },
  {
    id: 2,
    title: "KHAI VỊ ĐỈNH CAO",
    subtitle: "CÁNH GÀ CHIÊN NƯỚC MẮM & BURGER BÒ WAGYU",
    description: "Ưu đãi 20% cho đơn từ 500k - Chỉ trong tuần này!",
    btnText: "ĐẶT BÀN NGAY",
    btnLink: "tel:0903129370",
    image: "/img/slide1.png",
    highlight: true,
  },
  {
    id: 3,
    title: "TIỆC SINH NHẬT & SỰ KIỆN",
    subtitle: "KHÔNG GIAN ĐỘC ĐÁO - ÂM THANH ÁNH SÁNG HIỆN ĐẠI",
    description: "Đặt tiệc trọn gói từ 10 người - Miễn phí trang trí + bánh kem",
    btnText: "LIÊN HỆ NGAY",
    btnLink: "https://zalo.me/0903129370",
    image: "/img/slide1.png",
  },
];

export default function SlideSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Tự động chuyển slide mỗi 6 giây
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (

    <section className="relative w-full h-screen overflow-hidden">
        
      {/* Các slide */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover object-center"
            priority
          />

        </div>
      ))}

      {/* Nút điều khiển trái/phải */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition flex items-center justify-center"
        aria-label="Slide trước"
      >
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition flex items-center justify-center"
        aria-label="Slide tiếp"
      >
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Chấm tròn dưới cùng */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-orange-500 w-10'
                : 'bg-white/60 hover:bg-white/90'
            }`}
            aria-label={`Đi đến slide ${index + 1}`}
          />
        ))}
      </div>
    </section>

  );
}