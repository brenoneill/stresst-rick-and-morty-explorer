import type { Character, Episode, Location, ApiResponse } from "../types/api";

const API_BASE_URL = "https://rickandmortyapi.com/api";

/**
 * Filter options for character search
 */
export interface CharacterFilters {
  name?: string;
  status?: string;
  species?: string;
}

/**
 * Fetches characters from the API with optional pagination and filters
 * @param page - Page number to fetch (default: 1)
 * @param filters - Optional filters for name, status, and species
 * @returns Promise containing paginated character response
 * @throws Error if the request fails or no results found
 */
export async function fetchCharacters(
  page: number = 1,
  filters?: CharacterFilters
): Promise<ApiResponse<Character>> {
  const params = new URLSearchParams({ page: String(page) });
  
  if (filters?.name) {
    params.append("name", filters.name);
  }
  if (filters?.status && filters.status !== "All") {
    params.append("status", filters.status.toLowerCase());
  }
  if (filters?.species && filters.species !== "All") {
    params.append("species", filters.species);
  }
  
  const response = await fetch(`${API_BASE_URL}/character?${params.toString()}`);
  
  // API returns 404 when no results match the filter
  if (response.status === 404) {
    return {
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
    };
  }
  
  if (!response.ok) {
    throw new Error("Failed to fetch characters");
  }
  return response.json();
}

/**
 * Fetches a single character by ID
 * @param id - The character ID to fetch
 * @returns Promise containing the character data
 */
export async function fetchCharacter(id: number): Promise<Character> {
  const response = await fetch(`${API_BASE_URL}/character/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch character with id ${id}`);
  }
  return response.json();
}

/**
 * Fetches multiple characters by their IDs
 * @param ids - Array of character IDs to fetch
 * @returns Promise containing array of characters
 */
export async function fetchMultipleCharacters(ids: number[]): Promise<Character[]> {
  if (ids.length === 0) return [];
  const response = await fetch(`${API_BASE_URL}/character/${ids.join(",")}`);
  if (!response.ok) {
    throw new Error("Failed to fetch characters");
  }
  const data = await response.json();
  return Array.isArray(data) ? data : [data];
}

/**
 * Fetches episodes from the API with optional pagination
 * @param page - Page number to fetch (default: 1)
 * @returns Promise containing paginated episode response
 */
export async function fetchEpisodes(page: number = 1): Promise<ApiResponse<Episode>> {
  const response = await fetch(`${API_BASE_URL}/episode?page=${page}`);
  if (!response.ok) {
    throw new Error("Failed to fetch episodes");
  }
  return response.json();
}

/**
 * Fetches a single episode by ID
 * @param id - The episode ID to fetch
 * @returns Promise containing the episode data
 */
export async function fetchEpisode(id: number): Promise<Episode> {
  const response = await fetch(`${API_BASE_URL}/episode/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch episode with id ${id}`);
  }
  return response.json();
}

/**
 * Fetches locations from the API with optional pagination
 * @param page - Page number to fetch (default: 1)
 * @returns Promise containing paginated location response
 */
export async function fetchLocations(page: number = 1): Promise<ApiResponse<Location>> {
  const response = await fetch(`${API_BASE_URL}/location?page=${page}`);
  if (!response.ok) {
    throw new Error("Failed to fetch locations");
  }
  return response.json();
}
