"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import OrderModal from "./OrderModal";
import { Beer, ArrowRight, Flame, Leaf, Sparkles } from "lucide-react";

export default function RiceWineSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasOpened) {
          setTimeout(() => {
            setIsModalOpen(true);
            setHasOpened(true);
          }, 1000);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasOpened]);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden bg-gradient-to-b from-amber-950 via-black to-black">
      {/* Background - Nếp cái hoa vàng + khói bếp */}
      <div className="absolute inset-0">
        <Image
          src="/img/ruou-nep.png"
          alt="Rượu nếp cái hoa vàng"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-amber-950/40" />
      </div>

      {/* Hơi khói bếp lò */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ y: "-100vh", opacity: [0, 0.4, 0] }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              delay: i * 3,
              ease: "linear",
            }}
            className="absolute w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"
            style={{ left: `${10 + i * 15}%`, top: "10%" }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Nội dung */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-amber-900/40 border-2 border-amber-600/60 rounded-full backdrop-blur-xl shadow-2xl">
              <Flame className="w-8 h-8 text-amber-400 animate-pulse" />
              <span className="text-amber-300 font-black text-lg tracking-widest">
                LÒ RƯỢU GẠO NHÀ LÀM
              </span>
            </div>

            {/* Tiêu đề */}
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight">
              RƯỢU NẾP CÁI <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 drop-shadow-2xl">
                HOA VÀNG CHÍN TỪNG HẠT
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-amber-100 leading-relaxed max-w-3xl font-medium">
              100% gạo nếp cái hoa vàng từ ruộng lúa quê, ủ men lá truyền thống 40 ngày, 
              chưng cất bằng nồi đất trên bếp củi – <strong className="text-amber-400">mỗi giọt là cả một trời hương vị</strong>.
              Không phẩm màu, không cồn công nghiệp – chỉ có vị ngọt thanh, thơm nồng và cái say rất thật!
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              {[
                { icon: Leaf, num: "100%", label: "Gạo nếp cái hoa vàng" },
                { icon: Flame, num: "40 ngày", label: "Ủ men lá cổ truyền" },
                { icon: Sparkles, num: "0%", label: "Hóa chất & phẩm màu" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="bg-amber-900/30 backdrop-blur-xl border border-amber-700/50 rounded-3xl p-6 text-center hover:bg-amber-900/50 transition-all"
                >
                  <item.icon className="w-12 h-12 mx-auto mb-3 text-amber-400" />
                  <div className="text-4xl font-black text-amber-300">{item.num}</div>
                  <div className="text-amber-200 text-sm mt-2 font-bold">{item.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="group relative inline-flex items-center gap-5 px-14 py-8 bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-500 hover:to-orange-600 rounded-full font-black text-3xl shadow-2xl shadow-amber-900/70 transition-all duration-300"
            >
              <Beer className="w-12 h-12 text-yellow-300 group-hover:animate-bounce" />
              ĐẶT MUA RƯỢU NGAY
              <ArrowRight className="w-10 h-10 group-hover:translate-x-3 transition-transform" />
            </motion.button>

            <p className="text-amber-300 text-lg font-medium mt-6">
              Giao tận nơi • Bình 1 lít, 2 lít, 5 lít • Rượu ngon – uống là ghiền!
            </p>
          </motion.div>

          {/* Right - Hình ảnh lò rượu */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-8 mt-20">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-4 ring-amber-600/30 hover:ring-amber-500/60 transition-all">
                  <Image
                    src="/img/lo-ruou.jpg"
                    alt="Lò rượu gạo"
                    width={500}
                    height={600}
                    className="w-full h-80 object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-4 ring-amber-600/30">
                  <Image
                    src="/img/men-la.jpg"
                    alt="Men lá truyền thống"
                    width={500}
                    height={400}
                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>

              <div className="space-y-8">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-4 ring-amber-600/30">
                  <Image
                    src="/img/nep-cai-hoa-vang.jpg"
                    alt="Gạo nếp cái hoa vàng"
                    width={500}
                    height={500}
                    className="w-full h-72 object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-4 ring-amber-600/30">
                  <Image
                    src="/img/binh-ruou.jpg"
                    alt="Bình rượu gạo"
                    width={500}
                    height={500}
                    className="w-full h-80 object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Icon rượu nếp bay lên */}
            <motion.div
              animate={{ y: [0, -30, 0], rotate: [0, 15, -15, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute top-10 right-10 text-amber-400 opacity-80"
            >
              <Beer className="w-40 h-40 drop-shadow-2xl" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Modal đặt mua rượu */}
      <OrderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}