import { useEffect, useState, useMemo } from "react";
import type { Character, Episode } from "../types/api";
import { fetchEpisode } from "../utils/api";

interface EpisodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: Character | null;
}

/**
 * Extracts episode ID from episode URL
 * @param url - The episode URL from the API
 * @returns The episode ID as a number
 */
function getEpisodeId(url: string): number {
  const parts = url.split("/");
  return parseInt(parts[parts.length - 1], 10);
}

/**
 * Extracts season number from episode code (e.g., "S01E05" -> 1)
 * @param episodeCode - The episode code string
 * @returns The season number
 */
function getSeasonNumber(episodeCode: string): number {
  const match = episodeCode.match(/S(\d+)/i);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * Modal component to display all episodes for a character
 * @param isOpen - Whether the modal is visible
 * @param onClose - Callback to close the modal
 * @param character - The character whose episodes to display
 */
export function EpisodeModal({
  isOpen,
  onClose,
  character,
}: EpisodeModalProps) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState<string>("all");

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Fetch all episodes when modal opens
  useEffect(() => {
    if (isOpen && character) {
      setIsLoading(true);
      setEpisodes([]);
      setSelectedSeason("all"); // Reset season filter

      const episodeIds = character.episode.map(getEpisodeId);
      
      Promise.all(episodeIds.map(fetchEpisode))
        .then((data) => {
          setEpisodes(data);
        })
        .catch((err) => {
          console.error("Failed to fetch episodes:", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isOpen, character]);

  // Get unique seasons from episodes
  const availableSeasons = useMemo(() => {
    const seasons = new Set<number>();
    episodes.forEach((ep) => {
      seasons.add(getSeasonNumber(ep.episode));
    });
    return Array.from(seasons).sort((a, b) => a - b);
  }, [episodes]);

  // Filter episodes by selected season
  const filteredEpisodes = useMemo(() => {
    if (selectedSeason === "all") {
      return episodes;
    }
    const seasonNum = parseInt(selectedSeason, 10);
    return episodes.filter((ep) => getSeasonNumber(ep.episode) === seasonNum);
  }, [episodes, selectedSeason]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-2xl max-h-[80vh] bg-[var(--color-surface)] rounded-2xl shadow-2xl border border-[var(--color-accent)]/20 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-[var(--color-surface)] border-b border-[var(--color-surface-light)] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {character && (
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[var(--color-accent)]"
                />
              )}
              <div>
                <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
                  Episodes
                </h2>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Featuring {character?.name}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-[var(--color-surface-light)] hover:bg-[var(--color-error)]/20 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-error)] transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          
          {/* Season Filter */}
          {!isLoading && availableSeasons.length > 1 && (
            <div className="mt-4">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedSeason("all")}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedSeason === "all"
                      ? "bg-[var(--color-accent)] text-[var(--color-midnight)]"
                      : "bg-[var(--color-surface-light)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  All
                </button>
                {availableSeasons.map((season) => (
                  <button
                    key={season}
                    onClick={() => setSelectedSeason(selectedSeason === String(season) ? "all" : String(season))}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedSeason === String(season)
                        ? "bg-[var(--color-accent)] text-[var(--color-midnight)]"
                        : "bg-[var(--color-surface-light)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                    }`}
                  >
                    S{season}
                  </button>
                ))}
              </div>
              {selectedSeason !== "all" && (
                <p className="text-xs text-[var(--color-text-secondary)] mt-2">
                  Showing {filteredEpisodes.length} of {episodes.length} episodes
                </p>
              )}
            </div>
          )}
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="loading-pulse">
                  <div className="h-4 bg-[var(--color-surface-light)] rounded w-1/3 mb-2" />
                  <div className="h-3 bg-[var(--color-surface-light)] rounded w-full mb-1" />
                  <div className="h-3 bg-[var(--color-surface-light)] rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : filteredEpisodes.length === 0 ? (
            <p className="text-center text-[var(--color-text-secondary)]">
              No episodes found
            </p>
          ) : (
            <div className="space-y-3">
              {filteredEpisodes.map((episode) => (
                <div
                  key={episode.id}
                  className="p-4 bg-[var(--color-surface-light)] rounded-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-[var(--color-accent)]/20 text-[var(--color-accent-light)] text-xs font-medium rounded">
                          {episode.episode}
                        </span>
                        <span className="text-xs text-[var(--color-text-secondary)]">
                          {episode.air_date}
                        </span>
                      </div>
                      <p className="font-medium text-[var(--color-text-primary)]">
                        {episode.name}
                      </p>
                      <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                        {episode.characters.length} characters
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

//Include for buggr
