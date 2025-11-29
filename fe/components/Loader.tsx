// components/ui/Loader.tsx
import { motion } from "framer-motion";
import { Beer, Coffee, Pizza, Loader2 } from "lucide-react";

type LoaderVariant =
  | "beer"       // Bia tràn ly (mặc định)
  | "coffee"     // Cà phê nhỏ giọt
  | "pizza"      // Pizza quay quay
  | "classic"    // Vòng tròn xoay
  | "dots"       // 3 chấm nhảy
  | "pulse"      // Nhấp nháy
  | "bar"        // Thanh loading kiểu quán nhậu

type LoaderSize = "sm" | "md" | "lg" | "xl";

interface LoaderProps {
  variant?: LoaderVariant;
  size?: LoaderSize;
  text?: string;
  className?: string;
}

const sizeMap = {
  sm: "w-8 h-8 text-2xl",
  md: "w-12 h-12 text-4xl",
  lg: "w-20 h-20 text-6xl",
  xl: "w-32 h-32 text-8xl",
};

export default function Loader({
  variant = "beer",
  size = "lg",
  text,
  className = "",
}: LoaderProps) {
  if (variant === "beer") {
    return (
      <div className={`flex flex-col items-center justify-center gap-8 ${className}`}>
        <div className="relative">
          {/* Ly bia */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <Beer className={`${sizeMap[size]} text-orange-400`} />
          </motion.div>

          {/* Bọt bia bay lên */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: -100, opacity: [0, 1, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeOut",
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-3 h-3 bg-yellow-300 rounded-full blur-sm" />
            </motion.div>
          ))}

          {/* Bia tràn */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 bg-yellow-400 rounded-t-full blur-md"
            style={{ height: "120%" }}
          />
        </div>

        {text && (
          <motion.p
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-orange-400 font-black text-2xl md:text-4xl tracking-wider"
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  if (variant === "coffee") {
    return (
      <div className={`flex flex-col items-center gap-6 ${className}`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Coffee className={`${sizeMap[size]} text-amber-600`} />
        </motion.div>
        {text && <p className="text-amber-600 font-black text-3xl">{text}</p>}
      </div>
    );
  }

  if (variant === "pizza") {
    return (
      <div className={`flex flex-col items-center gap-6 ${className}`}>
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <Pizza className={`${sizeMap[size]} text-red-500`} />
        </motion.div>
        {text && <p className="text-red-500 font-black text-3xl">{text}</p>}
      </div>
    );
  }

  if (variant === "classic") {
    return (
      <div className={`flex flex-col items-center gap-6 ${className}`}>
        <Loader2 className={`${sizeMap[size]} text-orange-500 animate-spin`} />
        {text && <p className="text-orange-500 font-black text-3xl">{text}</p>}
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="w-4 h-4 bg-orange-500 rounded-full"
          />
        ))}
        {text && <span className="ml-4 text-orange-500 font-black text-2xl">{text}</span>}
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={`flex flex-col items-center gap-8 ${className}`}>
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="relative"
        >
          <div className="w-24 h-24 bg-orange-600 rounded-full blur-xl opacity-50" />
          <Beer className="absolute inset-0 m-auto w-16 h-16 text-yellow-400" />
        </motion.div>
        {text && (
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-orange-400 font-black text-4xl"
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  // variant === "bar" – Thanh loading kiểu quán nhậu
  return (
    <div className={`w-full max-w-md ${className}`}>
      <div className="relative h-16 bg-gray-900 rounded-full overflow-hidden border-4 border-orange-600">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: ["0%", "100%", "0%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-orange-600 via-yellow-500 to-orange-600"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Beer className="w-10 h-10 text-white animate-pulse" />
        </div>
      </div>
      {text && <p className="text-center mt-6 text-orange-400 font-black text-2xl">{text}</p>}
    </div>
  );
}