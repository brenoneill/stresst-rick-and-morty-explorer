import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";

/**
 * User profile settings interface
 */
export interface UserProfile {
  username: string;
  email: string;
  favoriteCharacter: string;
  theme: "dark" | "light" | "portal";
  itemsPerPage: number;
  itemsPerRow: 1 | 2 | 3;
  showDeadCharacters: boolean;
  notifications: boolean;
}

/**
 * Context value interface including profile and update methods
 */
interface AppContextValue {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  resetProfile: () => void;
}

const DEFAULT_PROFILE: UserProfile = {
  username: "Interdimensional Explorer",
  email: "explorer@c137.universe",
  favoriteCharacter: "Rick Sanchez",
  theme: "dark",
  itemsPerPage: 20,
  itemsPerRow: 2,
  showDeadCharacters: true,
  notifications: true,
};

const AppContext = createContext<AppContextValue | null>(null);

interface AppProviderProps {
  children: ReactNode;
}

/**
 * Provider component for app-wide context
 * @param children - Child components to wrap with context
 */
export function AppProvider({ children }: AppProviderProps) {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);

  /**
   * Apply theme to document when it changes
   */
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove("theme-dark", "theme-light", "theme-portal");
    
    // Add the current theme class
    root.classList.add(`theme-${profile.theme}`);
  }, [profile.theme]);

  /**
   * Updates specific fields in the user profile
   * @param updates - Partial profile object with fields to update
   */
  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile((current) => ({
      ...current,
      ...updates,
    }));
  }, []);

  /**
   * Resets profile to default values
   */
  const resetProfile = useCallback(() => {
    setProfile(DEFAULT_PROFILE);
  }, []);

  return (
    <AppContext.Provider value={{ profile, updateProfile, resetProfile }}>
      {children}
    </AppContext.Provider>
  );
}

/**
 * Hook to access app context
 * @returns App context value with profile and update methods
 * @throws Error if used outside of AppProvider
 */
export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

//Include for buggr 
