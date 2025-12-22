import { useState, useEffect, useMemo, useCallback } from "react";
import type { Route } from "./+types/home";
import type { Character } from "../types/api";
import { fetchCharacters } from "../utils/api";
import { useApp } from "../context/AppContext";
import { Header } from "../components/Header";
import { CharacterCard } from "../components/CharacterCard";
import { FilterBar } from "../components/FilterBar";
import { EpisodeModal } from "../components/EpisodeModal";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { Pagination } from "../components/Pagination";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Rick & Morty Explorer" },
    { name: "description", content: "Explore characters from the Rick and Morty universe" },
  ];
}

export default function Home() {
  const { profile, updateProfile } = useApp();
  
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCharacters, setTotalCharacters] = useState(0);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedSpecies, setSelectedSpecies] = useState("All");
  
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  /**
   * Fetches characters from the API for the current page
   * The API always returns 20 items per page (https://rickandmortyapi.com/documentation/#api),
   * WE CANNOT CHANGE THIS
   * so we calculate which API page to fetch
   * and slice the appropriate items based on itemsPerPage setting
   */
  const loadData = useCallback(async (page: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const itemsPerPage = profile.itemsPerPage;
      // Calculate which items we need (0-indexed)
      const startIndex = (page - 1) * itemsPerPage;
      
      // The API returns 20 items per page, calculate which API page(s) we need
      const apiPageSize = 20;
      const apiPage = Math.floor(startIndex / apiPageSize) + 1;
      
      const response = await fetchCharacters(apiPage);
      
      // Calculate offset within the API page
      const offsetInPage = startIndex % apiPageSize;
      const slicedResults = response.results.slice(offsetInPage, offsetInPage + itemsPerPage);
      
      setCharacters(slicedResults);
      setTotalCharacters(response.info.count);
      // Calculate effective total pages based on itemsPerPage setting
      const effectivePages = Math.ceil(response.info.count / itemsPerPage);
      setTotalPages(effectivePages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load characters");
    } finally {
      setIsLoading(false);
    }
  }, [profile.itemsPerPage]);

  // Reset to page 1 when itemsPerPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [profile.itemsPerPage]);

  useEffect(() => {
    loadData(currentPage);
  }, [currentPage, loadData]);

  /**
   * Handles page change
   */
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /**
   * Filters characters based on search query, status, species, and user preferences
   */
  const filteredCharacters = useMemo(() => {
    return characters.filter((character) => {
      // Apply showDeadCharacters setting from user profile
      if (!profile.showDeadCharacters && character.status === "Dead") {
        return false;
      }
      
      const matchesStatus = selectedStatus === "All" || character.status === selectedStatus;
      const matchesSpecies = selectedSpecies === "All" || character.species === selectedSpecies;
      const matchesSearch =
        searchQuery === "" ||
        character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        character.location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        character.origin.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesStatus && matchesSpecies && matchesSearch;
    });
  }, [characters, selectedStatus, selectedSpecies, searchQuery, profile.showDeadCharacters]);

  /**
   * Handles viewing episodes for a character
   */
  const handleViewEpisodes = useCallback((character: Character) => {
    setSelectedCharacter(character);
  }, []);

  /**
   * Closes the episodes modal
   */
  const handleCloseModal = useCallback(() => {
    setSelectedCharacter(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Welcome back, {profile.username}! 👋
          </h2>
          <p className="text-[var(--color-text-secondary)] mt-1">
            Explore characters from across the multiverse
          </p>
        </div>

        {!profile.showDeadCharacters && (
          <div className="mb-4 px-4 py-3 bg-[var(--color-warning)]/10 border border-[var(--color-warning)]/20 rounded-lg flex items-center gap-2 text-sm text-[var(--color-warning)]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Dead characters are hidden. Change this in Settings.
          </div>
        )}

        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} onRetry={() => loadData(currentPage)} />
        ) : (
          <>
            <FilterBar
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              selectedSpecies={selectedSpecies}
              onSpeciesChange={setSelectedSpecies}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              totalCharacters={totalCharacters}
              filteredCount={filteredCharacters.length}
              showDeadCharacters={profile.showDeadCharacters}
              itemsPerPage={profile.itemsPerPage}
              onItemsPerPageChange={(count) => updateProfile({ itemsPerPage: count })}
            />

            {filteredCharacters.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-surface)] mb-4 text-4xl">
                  🔍
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                  No characters found
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredCharacters.map((character, index) => (
                    <CharacterCard
                      key={character.id}
                      character={character}
                      onViewEpisodes={handleViewEpisodes}
                      animationDelay={index * 50}
                    />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </>
        )}
      </main>

      <footer className="border-t border-[var(--color-surface-light)] py-6">
        <div className="container mx-auto px-6 text-center text-sm text-[var(--color-text-secondary)]">
          <p>
            Data provided by{" "}
            <a
              href="https://rickandmortyapi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-portal)] hover:text-[var(--color-accent-light)] transition-colors"
            >
              Rick and Morty API
            </a>
          </p>
        </div>
      </footer>

      <EpisodeModal
        isOpen={selectedCharacter !== null}
        onClose={handleCloseModal}
        character={selectedCharacter}
      />
    </div>
  );
}
