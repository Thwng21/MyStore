// components/BackToTop.tsx
"use client";

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Hiện nút khi scroll xuống > 500px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Cuộn mượt lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-11 right-8 z-50
                     w-12 h-12 md:w-14 md:h-14
                     bg-orange-600 hover:bg-orange-500 
                     rounded-full shadow-2xl 
                     flex items-center justify-center
                     border-4 border-white
                     transition-all duration-300
                     hover:scale-110 active:scale-95"
          aria-label="Cuộn lên đầu trang"
        >
          {/* Icon mũi tên lên + hiệu ứng bọt bia nhỏ */}
          <div className="relative">
            <ArrowUp className="w-8 h-8 md:w-10 md:h-10 text-white font-bold" strokeWidth={4} />
            
            {/* 3 chấm bọt bia nhỏ (rất chất!) */}
            <span className="absolute -top-1 -left-1 w-2 h-2 bg-white rounded-full opacity-80"></span>
            <span className="absolute -top-2 left-3 w-1.5 h-1.5 bg-white rounded-full opacity-70"></span>
            <span className="absolute top-0 right-0 w-1 h-1 bg-white rounded-full opacity-60"></span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}