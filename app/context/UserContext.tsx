import { createContext, useContext, useState, useCallback } from "react";
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
  showDeadCharacters: boolean;
  notifications: boolean;
}

/**
 * Context value interface including profile and update methods
 */
interface UserContextValue {
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
  showDeadCharacters: true,
  notifications: true,
};

const UserContext = createContext<UserContextValue | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

/**
 * Provider component for user profile context
 * @param children - Child components to wrap with context
 */
export function UserProvider({ children }: UserProviderProps) {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);

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
    <UserContext.Provider value={{ profile, updateProfile, resetProfile }}>
      {children}
    </UserContext.Provider>
  );
}

/**
 * Hook to access user profile context
 * @returns User context value with profile and update methods
 * @throws Error if used outside of UserProvider
 */
export function useUser(): UserContextValue {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

