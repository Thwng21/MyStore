// components/ToastProvider.tsx
"use client";

import React, { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, AlertCircle, Info, X } from "lucide-react";
import Image from "next/image";

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
}

interface ToastContextType {
  toast: (type: ToastType, title: string, message: string, duration?: number) => void;
  success: (title: string, message: string, duration?: number) => void;
  error: (title: string, message: string, duration?: number) => void;
  warning: (title: string, message: string, duration?: number) => void;
  info: (title: string, message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: ToastType, title: string, message: string, duration = 5000) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);

    if (duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toast = {
    toast: addToast,
    success: (title: string, message: string, duration?: number) =>
      addToast("success", title, message, duration),
    error: (title: string, message: string, duration?: number) =>
      addToast("error", title, message, duration || 8000),
    warning: (title: string, message: string, duration?: number) =>
      addToast("warning", title, message, duration),
    info: (title: string, message: string, duration?: number) =>
      addToast("info", title, message, duration),
  };

  const config = {
    success: {
      borderLeft: "border-l-8 border-green-500",
      bg: "bg-green-50",
      icon: <CheckCircle2 className="w-7 h-7 text-green-600" />,
      text: "text-green-800",
      shake: false,
    },
    error: {
      borderLeft: "border-l-8 border-red-500",
      bg: "bg-red-50",
      icon: <XCircle className="w-7 h-7 text-red-600" />,
      text: "text-red-800",
      shake: true,
    },
    warning: {
      borderLeft: "border-l-8 border-yellow-500",
      bg: "bg-yellow-50",
      icon: <AlertCircle className="w-7 h-7 text-yellow-600" />,
      text: "text-yellow-800",
      shake: false,
    },
    info: {
      borderLeft: "border-l-8 border-blue-500",
      bg: "bg-blue-50",
      icon: <Info className="w-7 h-7 text-blue-600" />,
      text: "text-blue-800",
      shake: false,
    },
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}

      {/* Toast Container - góc trên phải */}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-4 max-w-sm w-full pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => {
            const cfg = config[t.type];

            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: -50, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  x: cfg.shake ? [0, -8, 8, -6, 6, 0] : 0,
                }}
                exit={{ opacity: 0, scale: 0.9, x: 100 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  x: cfg.shake ? { duration: 0.5, repeat: 1 } : {},
                }}
                className={`pointer-events-auto relative overflow-hidden rounded-2xl shadow-2xl ${cfg.bg} ${cfg.borderLeft} border border-gray-200`}
              >
                {/* Logo chìm góc dưới phải */}
                <div className="absolute bottom-2 right-3 opacity-10 pointer-events-none">
                  <Image
                    src="/th.png"
                    alt="VANXE"
                    width={60}
                    height={60}
                    className="drop-shadow-lg"
                  />
                </div>

                <div className="flex items-start gap-4 p-5">
                  {/* Icon lớn */}
                  <div className="flex-shrink-0 mt-0.5">
                    {cfg.icon}
                  </div>

                  {/* Nội dung */}
                  <div className="flex-1 pr-8">
                    <h4 className={`font-black text-lg ${cfg.text}`}>{t.title}</h4>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      {t.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      This is a {t.type} toast and will be dismissed {t.duration ? `after ${t.duration / 1000}s` : "by the user"}.
                    </p>
                  </div>

                  {/* Nút đóng */}
                  <button
                    onClick={() => removeToast(t.id)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 hover:bg-gray-200/50 rounded-full p-1.5 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Thanh progress siêu mỏng */}
                <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-200/50">
                  <motion.div
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: (t.duration || 5000) / 1000, ease: "linear" }}
                    className={`h-full ${
                      t.type === "success"
                        ? "bg-green-500"
                        : t.type === "error"
                        ? "bg-red-500"
                        : t.type === "warning"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};