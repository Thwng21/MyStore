"use client";

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const slides = [
  {
    title: "UỐNG SAY SƯA",
    image: "/img/ab2.png",
    brand: "VANXE QUÁN",
  },
  {
    title: "NẠP NĂNG LƯỢNG\n(SÁNG & TRƯA)",
    promo: "TẶNG 1 PHẦN NƯỚC MỚI / NƯỚC SÂU / TRÀ ĐÁ / NƯỚC SUỐI CHO 1 TỎI TỎI",
    image: "/img/ab2.png",
    brand: "VANXE QUÁN",
  },
  {
    title: "MỖI SIÊU BÉN",
    brand: "VANXE QUÁN",
    image: "/img/ab3.png",
  },
  {
    title: "COCKTAIL ĐẶC BIỆT",
    image: "/img/ab2.png",
    brand: "VANXE QUÁN",
  },
  {
    title: "MÓN ĂN VẶT",
    promo: "GIẢM GIÁ 20% CHO MÓN THỨ 2",
    image: "/img/ab2.png",
    brand: "VANXE QUÁN",
  },
  {
    title: "KHÔNG GIAN SỐNG ĐỘNG",
    brand: "VANXE QUÁN",
    image: "/img/ab3.png",
  },
];

export default function AboutSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Responsive check for top carousel
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else {
        setItemsPerPage(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto slide mỗi 4 giây
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const extendedSlides = [...slides, ...slides, ...slides];

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-28 overflow-hidden">

      {/* Background tường gạch */}
      <div className="absolute inset-0">
        <Image src="/img/tuong.png" alt="Background" fill className="object-cover" priority />
      </div>
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10">

        {/* === PHẦN VĂN HÓA BÌNH DÂN === */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-6 lg:px-8 mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="order-2 lg:order-1 flex justify-center"
            >
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
                <Image
                  src="/img/about.webp"
                  alt="VANXE QUÁN"
                  width={500}
                  height={700}
                  className="w-full h-auto rounded-2xl shadow-2xl object-cover"
                  priority
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="order-1 lg:order-2 text-white text-center lg:text-left"
            >
              <div className="mb-8">
                <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-wider text-yellow-400 drop-shadow-2xl">
                  VĂN HÓA
                </h2>
                <h2 className="text-7xl md:text-9xl lg:text-[10rem] font-black tracking-wider text-amber-500 -mt-8 md:-mt-14 leading-none drop-shadow-2xl">
                  BÌNH DÂN
                </h2>
              </div>
              <div className="space-y-6 text-lg md:text-xl font-medium">
                <p>
                  <span className="inline-block w-3 h-3 bg-orange-500 rounded-full mr-4"></span>
                  Văn hóa vỉa hè đường phố là nét văn hóa đặc trưng của Việt Nam đi cùng cuộc sống hàng ngày của mọi thế hệ.
                </p>
                <p className="italic">
                  <span className="inline-block w-3 h-3 bg-orange-500 rounded-full mr-4"></span>
                  Các buổi nhậu quán bình dân được người dân Gò Nổi yêu thích, tuy nhiên nó còn nhiều bất cập; chính vì vậy{' '}
                  <span className="font-black text-green-400">VANXE QUÁN</span> ra đời với mong muốn nâng cấp văn hóa nhậu vỉa hè trở nên an toàn, sạch sẽ và văn minh hơn.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* === CAROUSEL 3 ẢNH TỰ ĐỘNG - VIỀN NỨT NẺ === */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 relative"
        >
          <div className="relative overflow-hidden">
            {/* Container trượt */}
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${(currentIndex + slides.length) * (100 / itemsPerPage)}%)`,
              }}
            >
              {extendedSlides.map((slide, index) => (
                <div
                  key={index}
                  className="shrink-0 px-2 md:px-3"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  {/* Container ảnh với viền đứt nứt */}
                  <div 
                    className="relative aspect-[3/4] overflow-visible group bg-white p-3 md:p-4"
                    style={{
                      clipPath: 'polygon(1% 0%, 3% 1%, 5% 0.5%, 8% 2%, 12% 1%, 15% 2.5%, 19% 1.5%, 23% 3%, 27% 2%, 31% 3.5%, 35% 2.5%, 39% 4%, 43% 3%, 47% 4.5%, 51% 3.5%, 55% 5%, 59% 4%, 63% 5.5%, 67% 4.5%, 71% 6%, 75% 5%, 79% 6.5%, 83% 5.5%, 87% 7%, 91% 6%, 95% 7.5%, 98% 6.5%, 99% 8%, 100% 12%, 99.5% 16%, 100% 20%, 99% 24%, 100% 28%, 99.5% 32%, 100% 36%, 99% 40%, 100% 44%, 99.5% 48%, 100% 52%, 99% 56%, 100% 60%, 99.5% 64%, 100% 68%, 99% 72%, 100% 76%, 99.5% 80%, 100% 84%, 99% 88%, 100% 92%, 99% 95%, 98% 97%, 95% 98%, 91% 99%, 87% 98.5%, 83% 99.5%, 79% 98%, 75% 99%, 71% 98.5%, 67% 99.5%, 63% 98%, 59% 99%, 55% 98.5%, 51% 99.5%, 47% 98%, 43% 99%, 39% 98.5%, 35% 99.5%, 31% 98%, 27% 99%, 23% 98.5%, 19% 99.5%, 15% 98%, 12% 99%, 8% 98.5%, 5% 99.5%, 3% 98%, 1% 97%, 0% 92%, 0.5% 88%, 0% 84%, 1% 80%, 0% 76%, 0.5% 72%, 0% 68%, 1% 64%, 0% 60%, 0.5% 56%, 0% 52%, 1% 48%, 0% 44%, 0.5% 40%, 0% 36%, 1% 32%, 0% 28%, 0.5% 24%, 0% 20%, 1% 16%, 0% 12%, 0.5% 8%)',
                      filter: 'drop-shadow(6px 6px 10px rgba(0,0,0,0.5)) drop-shadow(-2px -2px 4px rgba(0,0,0,0.3))',
                      transform: `rotate(${index % 2 === 0 ? '-1deg' : '1deg'})`
                    }}
                  >
                    {/* Inner container cho ảnh */}
                    <div className="relative w-full h-full overflow-hidden">
                    {/* Ảnh chính với hiệu ứng vintage */}
                    <div className="absolute inset-0">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        style={{
                          filter: 'contrast(1.1) saturate(1.05) brightness(0.95)'
                        }}
                        priority={index < 6}
                      />
                    </div>

                    {/* Overlay với texture bụi bặm */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40"
                      style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.05\' /%3E%3C/svg%3E")',
                        mixBlendMode: 'multiply'
                      }}
                    />

                    {/* Brand góc trên phải */}
                    {slide.brand && (
                      <div className="absolute top-3 md:top-4 right-3 md:right-4 z-20">
                        <span
                          className="text-orange-500 text-xl md:text-3xl lg:text-4xl font-black tracking-wider"
                          style={{
                            textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.6)'
                          }}
                        >
                          {slide.brand}
                        </span>
                      </div>
                    )}

                    {/* Tiêu đề chính */}
                    <div className="absolute inset-x-0 top-8 md:top-12 lg:top-16 text-center px-3 md:px-4 z-10">
                      <h3
                        className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight whitespace-pre-line"
                        style={{
                          color: '#4ade80',
                          textShadow: '0 0 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.8), 3px 3px 6px rgba(0,0,0,0.9)',
                          WebkitTextStroke: '1.5px rgba(0,0,0,0.4)',
                        }}
                      >
                        {slide.title}
                      </h3>
                    </div>

                    {/* Tag khuyến mãi đỏ */}
                    {slide.promo && (
                      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 w-[90%]">
                        <div className="bg-red-600 text-white px-3 md:px-4 py-2 md:py-3 rounded-lg shadow-2xl text-[10px] md:text-xs lg:text-sm font-bold text-center leading-tight">
                          {slide.promo}
                        </div>
                      </div>
                    )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Nút điều hướng trái */}
            <button
              onClick={handlePrev}
              className="hidden md:flex absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 bg-green-600 hover:bg-green-500 rounded-full items-center justify-center shadow-xl z-30 transition"
            >
              <ChevronLeft className="w-7 h-7 lg:w-9 lg:h-9 text-white" />
            </button>

            {/* Nút điều hướng phải */}
            <button
              onClick={handleNext}
              className="hidden md:flex cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 bg-green-600 hover:bg-green-500 rounded-full items-center justify-center shadow-xl z-30 transition"
            >
              <ChevronRight className="w-7 h-7 lg:w-9 lg:h-9 text-white" />
            </button>
          </div>

          {/* Chấm chỉ báo */}
          <div className="flex justify-center gap-2 mt-8">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'bg-green-500 w-10' : 'bg-gray-400 w-2'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* === PHẦN BEST SELLER === */}
        <BestSellerSection isInView={isInView} />
      </div>
    </section>
  );
}

// Component Best Seller
function BestSellerSection({ isInView }: { isInView: boolean }) {
  const [bestSellerIndex, setBestSellerIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const bestSellers = [
    { id: 1, name: "Gà Nướng Mật Ong", image: "/img/ab3.png" },
    { id: 2, name: "Mỳ Cay Hải Sản", image: "/img/ab2.png" },
    { id: 3, name: "Rau Củ Luộc", image: "/img/ab2.png" },
    { id: 4, name: "Bún Chả Nem", image: "/img/ab2.png" },
    { id: 5, name: "Chả Giò Rế", image: "/img/ab2.png" },
    { id: 6, name: "Nem Nướng", image: "/img/ab3.png" },
  ];

  // Responsive check
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(4);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto scroll
  useEffect(() => {
    const maxIndex = Math.max(0, bestSellers.length - itemsPerPage);
    if (maxIndex === 0) return;

    const timer = setInterval(() => {
      setBestSellerIndex((prev) => (prev + 1) % (maxIndex + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [itemsPerPage, bestSellers.length]);

  const handlePrevBest = () => {
    const maxIndex = Math.max(0, bestSellers.length - itemsPerPage);
    setBestSellerIndex((prev) => (prev - 1 + (maxIndex + 1)) % (maxIndex + 1));
  };

  const handleNextBest = () => {
    const maxIndex = Math.max(0, bestSellers.length - itemsPerPage);
    setBestSellerIndex((prev) => (prev + 1) % (maxIndex + 1));
  };

  const maxIndex = Math.max(0, bestSellers.length - itemsPerPage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.8 }}
      className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-20 relative"
    >
      {/* Tiêu đề BEST SELLER */}
      <div className="flex items-center justify-center md:justify-start gap-4 mb-10">
        <h2 
          className="text-5xl md:text-6xl lg:text-7xl font-black tracking-wider"
          style={{
            color: '#16a34a',
            textShadow: '3px 3px 0px rgba(0,0,0,0.3), 6px 6px 0px rgba(0,0,0,0.2)',
          }}
        >
          BEST SELLER
        </h2>
      </div>

      {/* Container carousel */}
      <div className="relative">
        {/* Nút trái */}
        <button
          onClick={handlePrevBest}
          className="absolute left-0 top-1/2 cursor-pointer -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 bg-green-600 hover:bg-green-500 transition-all duration-300 flex items-center justify-center"
          style={{
            clipPath: 'polygon(0% 50%, 30% 0%, 100% 0%, 70% 50%, 100% 100%, 30% 100%)',
          }}
        >
          <ChevronLeft className="w-8 h-8 text-white -ml-2" />
        </button>

        {/* Slider món ăn */}
        <div className="overflow-hidden mx-12 md:mx-20">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${bestSellerIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {bestSellers.map((item, index) => (
              <div 
                key={item.id}
                className="shrink-0 px-2 md:px-3"
                style={{ width: `${100 / itemsPerPage}%` }}
              >
                <div 
                  className="bg-white p-2 md:p-3 relative group cursor-pointer"
                  style={{
                    clipPath: 'polygon(2% 1%, 98% 0%, 100% 3%, 99% 97%, 97% 100%, 3% 99%, 0% 96%, 1% 4%)',
                    filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.3))',
                    transform: `rotate(${index % 2 === 0 ? '2deg' : '-2deg'})`,
                  }}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      style={{
                        filter: 'contrast(1.1) saturate(1.05)'
                      }}
                    />
                  </div>
                  
                  {/* Tên món */}
                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 px-2 py-1 rounded">
                    <p className="text-white text-lg md:text-sm font-bold text-center truncate">
                      {item.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nút phải */}
        <button
          onClick={handleNextBest}
          className="absolute right-0 cursor-pointer top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 bg-green-600 hover:bg-green-500 transition-all duration-300 flex items-center justify-center"
          style={{
            clipPath: 'polygon(100% 50%, 70% 0%, 0% 0%, 30% 50%, 0% 100%, 70% 100%)',
          }}
        >
          <ChevronRight className="w-8 h-8 text-white -mr-2" />
        </button>
      </div>

      {/* Chấm chỉ báo */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setBestSellerIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === bestSellerIndex ? 'bg-green-500 w-10' : 'bg-gray-400 w-2'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}