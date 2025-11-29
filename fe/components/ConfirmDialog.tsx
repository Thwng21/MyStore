// components/ui/ConfirmDialog.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Beer, 
  Trash2, 
  LogOut,
  X
} from "lucide-react";

type ConfirmVariant = "danger" | "warning" | "success" | "info" | "beer";

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  variant?: ConfirmVariant;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

const variantConfig = {
  danger: {
    icon: <XCircle className="w-16 h-16" />,
    color: "text-red-500",
    bg: "bg-red-600/20",
    border: "border-red-500/50",
    confirmBg: "bg-red-600 hover:bg-red-700",
  },
  warning: {
    icon: <AlertTriangle className="w-16 h-16" />,
    color: "text-yellow-500",
    bg: "bg-yellow-600/20",
    border: "border-yellow-500/50",
    confirmBg: "bg-yellow-600 hover:bg-yellow-700",
  },
  success: {
    icon: <CheckCircle className="w-16 h-16" />,
    color: "text-green-500",
    bg: "bg-green-600/20",
    border: "border-green-500/50",
    confirmBg: "bg-green-600 hover:bg-green-700",
  },
  info: {
    icon: <AlertTriangle className="w-16 h-16" />,
    color: "text-blue-500",
    bg: "bg-blue-600/20",
    border: "border-blue-500/50",
    confirmBg: "bg-blue-600 hover:bg-blue-700",
  },
  beer: {
    icon: <Beer className="w-16 h-16" />,
    color: "text-orange-500",
    bg: "bg-orange-600/20",
    border: "border-orange-500/50",
    confirmBg: "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500",
  },
};

export default function ConfirmDialog({
  isOpen,
  title = "Xác nhận hành động",
  message = "Bạn có chắc chắn muốn thực hiện hành động này không?",
  variant = "danger",
  confirmText = "XÁC NHẬN",
  cancelText = "HỦY BỎ",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const config = variantConfig[variant];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50"
            onClick={onCancel}
          />

          {/* Dialog */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl p-10 max-w-md w-full border border-white/20 shadow-2xl">
              {/* Icon + Title */}
              <div className="text-center mb-8">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: variant === "beer" ? [0, 5, -5, 0] : [0]
                  }}
                  transition={{ duration: 0.6, repeat: variant === "beer" ? Infinity : 0 }}
                  className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${config.bg} border-4 ${config.border} mb-6`}
                >
                  <div className={config.color}>
                    {config.icon}
                  </div>
                </motion.div>

                <h2 className="text-4xl font-black text-white mb-4">
                  {title}
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  {message}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    onConfirm();
                  }}
                  className={`flex-1 py-5 rounded-2xl font-black text-xl transition-all transform hover:scale-105 shadow-xl ${config.confirmBg}`}
                >
                  {confirmText}
                </button>

                <button
                  onClick={onCancel}
                  className="flex-1 py-5 rounded-2xl font-black text-xl bg-gray-700 hover:bg-gray-600 transition-all hover:scale-105 shadow-xl"
                >
                  {cancelText}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}