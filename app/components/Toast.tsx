import { useToast } from "../context/ToastContext";
import type { ToastType } from "../context/ToastContext";

/**
 * Returns the icon and colors for a toast type
 * @param type - The toast type
 * @returns Object with icon SVG and color classes
 */
function getToastStyles(type: ToastType) {
  switch (type) {
    case "success":
      return {
        bg: "bg-[var(--color-success)]/20",
        border: "border-[var(--color-success)]/30",
        text: "text-[var(--color-success)]",
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ),
      };
    case "error":
      return {
        bg: "bg-[var(--color-error)]/20",
        border: "border-[var(--color-error)]/30",
        text: "text-[var(--color-error)]",
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ),
      };
    case "warning":
      return {
        bg: "bg-[var(--color-warning)]/20",
        border: "border-[var(--color-warning)]/30",
        text: "text-[var(--color-warning)]",
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        ),
      };
    case "info":
    default:
      return {
        bg: "bg-[var(--color-accent)]/20",
        border: "border-[var(--color-accent)]/30",
        text: "text-[var(--color-accent-light)]",
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      };
  }
}

/**
 * Toast container component that displays all active toasts
 * Renders in the bottom-right corner of the screen
 */
export function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm">
      {toasts.map((toast) => {
        const styles = getToastStyles(toast.type);
        return (
          <div
            key={toast.id}
            className={`${styles.bg} ${styles.border} ${styles.text} border rounded-xl p-4 shadow-lg backdrop-blur-sm animate-slide-up flex items-start gap-3`}
          >
            <span className="flex-shrink-0">{styles.icon}</span>
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            <button
              onClick={() => dismissToast(toast.id)}
              className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  );
}

