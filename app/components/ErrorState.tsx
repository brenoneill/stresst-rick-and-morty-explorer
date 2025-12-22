interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

/**
 * Error state component with retry button
 * @param message - Error message to display
 * @param onRetry - Callback function to retry the failed operation
 */
export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-error)]/20 mb-4">
        <svg
          className="w-8 h-8 text-[var(--color-error)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
        Something went wrong
      </h3>
      <p className="text-[var(--color-text-secondary)] mb-6 max-w-md mx-auto">
        {message}
      </p>
      <button
        onClick={onRetry}
        className="btn-glow px-6 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white font-medium rounded-lg transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}

