import { useState, useRef, useCallback } from "react";
import ConfirmDialog from "@/components/ConfirmDialog";

interface ConfirmOptions {
  title?: string;
  message?: string;
  variant?: "danger" | "warning" | "success" | "info" | "beer";
  confirmText?: string;
  cancelText?: string;
}

export function useConfirm() {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({});
  const resolveRef = useRef<(value: boolean) => void>(() => {});

  const confirm = useCallback((opts: ConfirmOptions) => {
    setOptions(opts);
    setIsOpen(true);
    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve;
    });
  }, []);

  const handleConfirm = useCallback(() => {
    setIsOpen(false);
    resolveRef.current(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsOpen(false);
    resolveRef.current(false);
  }, []);

  const Dialog = () => (
    <ConfirmDialog
      isOpen={isOpen}
      title={options.title}
      message={options.message}
      variant={options.variant}
      confirmText={options.confirmText}
      cancelText={options.cancelText}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );

  return { confirm, Dialog };
}