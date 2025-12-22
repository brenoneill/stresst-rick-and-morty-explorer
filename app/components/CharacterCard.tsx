import type { Character } from "../types/api";

interface CharacterCardProps {
  character: Character;
  onViewEpisodes: (character: Character) => void;
  animationDelay: number;
}

/**
 * Returns the appropriate status color class
 */
function getStatusColor(status: Character["status"]): string {
  switch (status) {
    case "Alive":
      return "bg-[var(--color-success)]";
    case "Dead":
      return "bg-[var(--color-error)]";
    default:
      return "bg-[var(--color-warning)]";
  }
}

/**
 * Displays a single character as a card
 * @param character - The character data to display
 * @param onViewEpisodes - Callback when episodes button is clicked
 * @param animationDelay - Delay for staggered animation in ms
 */
export function CharacterCard({ character, onViewEpisodes, animationDelay }: CharacterCardProps) {
  return (
    <article
      className="animate-slide-up card-glow bg-[var(--color-surface)] rounded-xl overflow-hidden border border-[var(--color-surface-light)]"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-40 h-48 sm:h-auto flex-shrink-0">
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 p-5">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
              {character.name}
            </h3>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <span className={`w-2 h-2 rounded-full ${getStatusColor(character.status)}`} />
            <span className="text-sm text-[var(--color-text-secondary)]">
              {character.status} - {character.species}
            </span>
          </div>

          <div className="space-y-2 text-sm">
            <div>
              <span className="text-[var(--color-text-secondary)]">Gender: </span>
              <span className="text-[var(--color-text-primary)]">{character.gender}</span>
            </div>
            <div>
              <span className="text-[var(--color-text-secondary)]">Origin: </span>
              <span className="text-[var(--color-text-primary)]">{character.origin.name}</span>
            </div>
            <div>
              <span className="text-[var(--color-text-secondary)]">Location: </span>
              <span className="text-[var(--color-text-primary)]">{character.location.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => onViewEpisodes(character)}
              className="btn-glow flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-surface-light)] hover:bg-[var(--color-accent)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-accent-light)] transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                />
              </svg>
              {character.episode.length} Episodes
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

//Include in stress testing
