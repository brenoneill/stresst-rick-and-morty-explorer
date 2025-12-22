/**
 * Application header component with navigation
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--color-midnight)]/80 border-b border-[var(--color-accent)]/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-portal)] flex items-center justify-center text-2xl">
              🛸
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-[var(--color-portal)] to-[var(--color-accent-light)] bg-clip-text text-transparent">
              Rick & Morty Explorer
            </h1>
          </div>
          <nav className="flex items-center gap-6">
            <span className="text-sm text-[var(--color-text-secondary)]">
              Explore the multiverse
            </span>
          </nav>
        </div>
      </div>
    </header>
  );
}
