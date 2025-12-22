interface FilterBarProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedSpecies: string;
  onSpeciesChange: (species: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCharacters: number;
  filteredCount: number;
  showDeadCharacters: boolean;
  itemsPerPage: number;
  onItemsPerPageChange: (count: number) => void;
}

const STATUS_OPTIONS = ["All", "Alive", "Dead", "unknown"];
const SPECIES_OPTIONS = ["All", "Human", "Alien", "Humanoid", "Robot", "Animal", "Mythological Creature"];
const ITEMS_PER_PAGE_OPTIONS = [5, 10, 15, 20];

/**
 * Filter bar component for filtering and searching characters
 * @param selectedStatus - Currently selected status filter
 * @param onStatusChange - Callback when status filter changes
 * @param selectedSpecies - Currently selected species filter
 * @param onSpeciesChange - Callback when species filter changes
 * @param searchQuery - Current search query
 * @param onSearchChange - Callback when search query changes
 * @param totalCharacters - Total number of characters
 * @param filteredCount - Number of characters after filtering
 * @param showDeadCharacters - Whether dead characters are shown (from settings)
 * @param itemsPerPage - Number of items displayed per page
 * @param onItemsPerPageChange - Callback when items per page changes
 */
export function FilterBar({
  selectedStatus,
  onStatusChange,
  selectedSpecies,
  onSpeciesChange,
  searchQuery,
  onSearchChange,
  totalCharacters,
  filteredCount,
  showDeadCharacters,
  itemsPerPage,
  onItemsPerPageChange,
}: FilterBarProps) {
  const hasFilters = selectedStatus !== "All" || selectedSpecies !== "All" || searchQuery !== "";

  // Filter out "Dead" option if showDeadCharacters is disabled
  const availableStatusOptions = showDeadCharacters 
    ? STATUS_OPTIONS 
    : STATUS_OPTIONS.filter(status => status !== "Dead");

  return (
    <div className="bg-[var(--color-surface)] rounded-xl p-4 border border-[var(--color-surface-light)] mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
            Search Characters
          </label>
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-secondary)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by name or location..."
              className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-surface-light)] border border-[var(--color-surface-light)] rounded-lg text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:border-[var(--color-accent)]"
            />
          </div>
        </div>

        <div className="sm:w-40">
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
            Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-4 py-2.5 bg-[var(--color-surface-light)] border border-[var(--color-surface-light)] rounded-lg text-[var(--color-text-primary)] focus:border-[var(--color-accent)] cursor-pointer"
          >
            {availableStatusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:w-48">
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
            Species
          </label>
          <select
            value={selectedSpecies}
            onChange={(e) => onSpeciesChange(e.target.value)}
            className="w-full px-4 py-2.5 bg-[var(--color-surface-light)] border border-[var(--color-surface-light)] rounded-lg text-[var(--color-text-primary)] focus:border-[var(--color-accent)] cursor-pointer"
          >
            {SPECIES_OPTIONS.map((species) => (
              <option key={species} value={species}>
                {species}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3 flex items-center text-sm">
        <span className="text-[var(--color-text-secondary)]">
          Showing{" "}
          <span className="font-semibold text-[var(--color-accent-light)]">
            {filteredCount}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-[var(--color-text-primary)]">
            {totalCharacters}
          </span>{" "}
          characters
        </span>
        {hasFilters && (
          <button
            onClick={() => {
              onStatusChange("All");
              onSpeciesChange("All");
              onSearchChange("");
            }}
            className="ml-4 text-[var(--color-accent)] hover:text-[var(--color-accent-light)] transition-colors"
          >
            Clear filters
          </button>
        )}
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[var(--color-text-secondary)]">Show</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="px-2 py-1 bg-[var(--color-surface-light)] border border-[var(--color-surface-light)] rounded-md text-[var(--color-text-primary)] focus:border-[var(--color-accent)] cursor-pointer"
          >
            {ITEMS_PER_PAGE_OPTIONS.map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
          <span className="text-[var(--color-text-secondary)]">per page</span>
        </div>
      </div>
    </div>
  );
}
