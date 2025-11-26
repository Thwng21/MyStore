// components/AboutSection.tsx
import Image from 'next/image';

export default function AboutSection() {
  return (
    <>
    <section className="relative py-20 lg:py-32 overflow-hidden">
      
      {/* === BACKGROUND CHÍNH: ảnh /img/nen.png === */}
      <div className="absolute inset-0">
        <Image
          src="/img/tuong.png"           // Đường dẫn ảnh bạn muốn
          alt="Background The Street"
          fill
          className="object-cover"
          quality={95}
          priority
        />
      </div>

      {/* === LỚP TỐI NHẸ (overlay) để chữ vẫn đọc rõ === */}
      <div className="absolute inset-0 bg-black/35" /> {/* Có thể chỉnh % tùy độ sáng ảnh */}

      {/* === NỘI DUNG CHÍNH (giữ nguyên như cũ) === */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* === ẢNH BÊN TRÁI === */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-lg overflow-hidden shadow-2xl items-center justify-center flex">
              <Image
                src="/img/about.webp"
                alt="Văn hóa vỉa hè Sài Gòn - THE STREET"
                width={300}
                height={400}
                className=" object-cover"
                priority
              />
            </div>
          </div>

          {/* === NỘI DUNG BÊN PHẢI === */}
          <div className="order-1 lg:order-2 text-white"> {/* Đổi thành text-white cho nổi trên nền tối */}
            <div className="mb-8">
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-wider text-yellow-500 drop-shadow-2xl">
                VĂN HÓA
              </h2>
              <h2 className="text-7xl md:text-9xl lg:text-[10rem] font-black tracking-wider text-amber-600 -mt-8 md:-mt-12 leading-none drop-shadow-2xl">
                BÌNH DÂN
              </h2>
            </div>

            <div className="space-y-7 text-lg md:text-xl leading-relaxed font-medium">
              <p>
                <span className="inline-block w-2 h-2 md:w-3 md:h-3 bg-orange-500 rounded-full mr-4 align-middle"></span>
                Văn hóa vỉa hè đường phố là nét văn hóa đặc trưng của Việt Nam đi cùng cuộc sống hàng ngày của mọi thế hệ.
              </p>

              <p className="italic">
                <span className="inline-block w-2 h-2 md:w-3 md:h-3 bg-orange-500 rounded-full mr-4 align-middle"></span>
                Các buổi nhậu quán bình dân được người dân Gò Nổi yêu thích, tuy nhiên nó còn nhiều bất cập; chính vì vậy{' '}
                <span className="font-black text-green-900">VANXE QUÁN</span> ra đời với mong muốn nâng cấp văn hóa nhậu vỉa hè trở nên an toàn, sạch sẽ và văn minh hơn.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
            {/* thêm phần slide ở đây */}
      </div>
    </section>
    </>
  );
}