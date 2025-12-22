import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import type { ReactNode } from "react";

/**
 * Toast notification type
 */
export type ToastType = "success" | "error" | "info" | "warning";

/**
 * Toast notification interface
 */
export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

/**
 * Context value interface for toast notifications
 */
interface ToastContextValue {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

interface ToastProviderProps {
  children: ReactNode;
}

/**
 * Provider component for toast notifications
 * @param children - Child components to wrap with context
 */
export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastTimeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());

  /**
   * Cleanup timeouts on unmount
   */
  useEffect(() => {
    return () => {
      toastTimeouts.current.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  /**
   * Shows a toast notification
   * @param message - The message to display
   * @param type - The type of toast (success, error, info, warning)
   */
  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const toast: Toast = { id, message, type };
    
    setToasts((current) => [...current, toast]);
    
    // Auto-dismiss after 3 seconds
    const timeout = setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id));
      toastTimeouts.current.delete(id);
    }, 3000);
    
    toastTimeouts.current.set(id, timeout);
  }, []);

  /**
   * Dismisses a toast notification
   * @param id - The id of the toast to dismiss
   */
  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((t) => t.id !== id));
    const timeout = toastTimeouts.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      toastTimeouts.current.delete(id);
    }
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

/**
 * Hook to access toast notifications
 * @returns Toast context value with toasts and methods
 * @throws Error if used outside of ToastProvider
 */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

//Include in stress testing
