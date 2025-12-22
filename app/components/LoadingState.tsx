/**
 * Loading state component with animated skeleton cards
 */
export function LoadingState() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="loading-pulse bg-[var(--color-surface)] rounded-xl overflow-hidden border border-[var(--color-surface-light)]"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-40 h-48 sm:h-auto bg-[var(--color-surface-light)]" />
            <div className="flex-1 p-5">
              <div className="h-5 bg-[var(--color-surface-light)] rounded w-3/4 mb-3" />
              <div className="h-4 bg-[var(--color-surface-light)] rounded w-1/2 mb-4" />
              <div className="space-y-2">
                <div className="h-3 bg-[var(--color-surface-light)] rounded w-full" />
                <div className="h-3 bg-[var(--color-surface-light)] rounded w-5/6" />
                <div className="h-3 bg-[var(--color-surface-light)] rounded w-4/6" />
              </div>
              <div className="h-9 bg-[var(--color-surface-light)] rounded w-32 mt-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
