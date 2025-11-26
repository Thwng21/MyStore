// components/FloatingButtons.tsx
import Link from 'next/link';

export default function FloatingButtons() {
  const phoneNumber = "0903129370";
  const zaloLink = `https://zalo.me/${phoneNumber}`;
  const messengerLink = `https://m.me/vanxequan`; // thay bằng link fanpage của bạn
  const facebookLink = `https://facebook.com/vanxequan`; // thay bằng link fanpage

  return (
    <div className="fixed bottom-11 left-8 z-50 flex flex-col gap-3">
      {/* Nút Gọi điện - lớn nhất, rung nhẹ */}
      <a
        href={`tel:${phoneNumber}`}
        className="
          group relative flex items-center justify-center 
          w-14 h-14 rounded-full bg-red-600 text-white 
          shadow-2xl hover:shadow-red-600/50 
          transform hover:scale-110 active:scale-95 
          transition-all duration-300 animate-pulse hover:animate-none
          ring-4 ring-red-400/30
        "
        aria-label="Gọi ngay"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
          Gọi: {phoneNumber}
        </span>
      </a>

      {/* Nút Zalo */}
      <a
        href={zaloLink}
        target="_blank"
        rel="noopener"
        className="
          group flex items-center justify-center 
          w-12 h-12 rounded-full bg-blue-500 text-white 
          shadow-xl hover:shadow-blue-500/50 
          transform hover:scale-110 transition-all duration-300
        "
        aria-label="Nhắn Zalo"
      >
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition">
          Nhắn Zalo
        </span>
      </a>

      {/* Nút Messenger */}
      <a
        href={messengerLink}
        target="_blank"
        rel="noopener"
        className="
          group flex items-center justify-center 
          w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white 
          shadow-xl hover:shadow-blue-600/50 
          transform hover:scale-110 transition-all duration-300
        "
        aria-label="Nhắn Messenger"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 3.13 1.54 5.9 3.9 7.64V22l3.58-1.97c.95.27 1.95.43 2.97.43 5.52 0 10-4.48 10-10S17.52 2 12 2zm1.8 14.6l-2.58-2.74-5.02 2.74 5.55-5.92 2.64 2.74 4.46-2.74-5.05 5.92z"/>
        </svg>
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition">
          Messenger
        </span>
      </a>

      {/* Nút Facebook */}
      <a
        href={facebookLink}
        target="_blank"
        rel="noopener"
        className="
          group flex items-center justify-center 
          w-12 h-12 rounded-full bg-blue-700 text-white 
          shadow-xl hover:shadow-blue-700/50 
          transform hover:scale-110 transition-all duration-300
        "
        aria-label="Facebook"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition">
          Fanpage
        </span>
      </a>
    </div>
  );
}