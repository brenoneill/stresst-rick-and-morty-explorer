import { useState, useEffect } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/settings";
import { useApp } from "../context/AppContext";
import type { UserProfile } from "../context/AppContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Settings - Rick & Morty Explorer" },
    { name: "description", content: "Customize your Rick and Morty Explorer experience" },
  ];
}

export default function Settings() {
  const { profile, updateProfile, resetProfile } = useApp();
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  /**
   * Handles input field changes
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value, 10) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  /**
   * Handles form submission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSaveMessage("Settings saved successfully!");
    setTimeout(() => setSaveMessage(null), 3000);
  };

  /**
   * Handles reset to defaults
   */
  const handleReset = () => {
    resetProfile();
    setSaveMessage("Settings reset to defaults!");
    setTimeout(() => setSaveMessage(null), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--color-midnight)]/80 border-b border-[var(--color-accent)]/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-portal)] flex items-center justify-center text-2xl">
                  🛸
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-[var(--color-portal)] to-[var(--color-accent-light)] bg-clip-text text-transparent">
                  Rick & Morty Explorer
                </h1>
              </Link>
            </div>
            <nav className="flex items-center gap-2">
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="hidden sm:inline">Explore</span>
              </Link>
              <span className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-surface)] text-[var(--color-portal)]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="hidden sm:inline">Settings</span>
              </span>
              <div className="hidden md:flex items-center gap-2 ml-2 pl-4 border-l border-[var(--color-surface-light)]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-portal)] flex items-center justify-center text-sm font-bold text-white">
                  {profile.username.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-[var(--color-text-secondary)]">
                  {profile.username}
                </span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">
              Settings
            </h2>
            <p className="text-[var(--color-text-secondary)]">
              Customize your interdimensional exploration experience
            </p>
          </div>

          {saveMessage && (
            <div className="mb-6 p-4 bg-[var(--color-success)]/20 border border-[var(--color-success)]/30 rounded-xl text-[var(--color-success)] flex items-center gap-3 animate-slide-up">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {saveMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Section */}
            <section className="bg-[var(--color-surface)] rounded-xl p-6 border border-[var(--color-surface-light)]">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                <span className="text-xl">👤</span>
                Profile Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-[var(--color-surface-light)] border border-[var(--color-surface-light)] rounded-lg text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:border-[var(--color-portal)]"
                  />
                  <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                    This name will appear in the header and on the Explore page
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-[var(--color-surface-light)] border border-[var(--color-surface-light)] rounded-lg text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:border-[var(--color-portal)]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="favoriteCharacter"
                    className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
                  >
                    Favorite Character
                  </label>
                  <input
                    type="text"
                    id="favoriteCharacter"
                    name="favoriteCharacter"
                    value={formData.favoriteCharacter}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-[var(--color-surface-light)] border border-[var(--color-surface-light)] rounded-lg text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:border-[var(--color-portal)]"
                  />
                </div>
              </div>
            </section>

            {/* Preferences Section */}
            <section className="bg-[var(--color-surface)] rounded-xl p-6 border border-[var(--color-surface-light)]">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                <span className="text-xl">⚙️</span>
                Preferences
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="theme"
                    className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
                  >
                    Theme
                  </label>
                  <select
                    id="theme"
                    name="theme"
                    value={formData.theme}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-[var(--color-surface-light)] border border-[var(--color-surface-light)] rounded-lg text-[var(--color-text-primary)] focus:border-[var(--color-portal)] cursor-pointer"
                  >
                    <option value="dark">Dark Mode</option>
                    <option value="light">Light Mode</option>
                    <option value="portal">Portal Green</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="itemsPerPage"
                    className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
                  >
                    Items Per Page
                  </label>
                  <select
                    id="itemsPerPage"
                    name="itemsPerPage"
                    value={formData.itemsPerPage}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-[var(--color-surface-light)] border border-[var(--color-surface-light)] rounded-lg text-[var(--color-text-primary)] focus:border-[var(--color-portal)] cursor-pointer"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                  <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                    Controls how many characters are displayed on the Explore page
                  </p>
                </div>
              </div>
            </section>

            {/* Toggle Options */}
            <section className="bg-[var(--color-surface)] rounded-xl p-6 border border-[var(--color-surface-light)]">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                <span className="text-xl">🔔</span>
                Options
              </h3>
              
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer group">
                  <div>
                    <span className="text-[var(--color-text-primary)] group-hover:text-[var(--color-portal)] transition-colors">
                      Show Dead Characters
                    </span>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Include deceased characters in the Explore page
                    </p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="showDeadCharacters"
                      checked={formData.showDeadCharacters}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[var(--color-surface-light)] rounded-full peer-checked:bg-[var(--color-portal)] transition-colors" />
                    <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform" />
                  </div>
                </label>

                <label className="flex items-center justify-between cursor-pointer group">
                  <div>
                    <span className="text-[var(--color-text-primary)] group-hover:text-[var(--color-portal)] transition-colors">
                      Notifications
                    </span>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      Receive alerts about new dimensions discovered
                    </p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="notifications"
                      checked={formData.notifications}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[var(--color-surface-light)] rounded-full peer-checked:bg-[var(--color-portal)] transition-colors" />
                    <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform" />
                  </div>
                </label>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="btn-glow flex-1 px-6 py-3 bg-[var(--color-portal)] hover:bg-[var(--color-portal)]/80 text-[var(--color-midnight)] font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 px-6 py-3 bg-[var(--color-surface-light)] hover:bg-[var(--color-error)]/20 text-[var(--color-text-secondary)] hover:text-[var(--color-error)] font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset to Defaults
              </button>
            </div>
          </form>

          {/* Profile Preview */}
          <section className="mt-8 bg-[var(--color-surface)] rounded-xl p-6 border border-[var(--color-accent)]/20">
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
              <span className="text-xl">📋</span>
              Current Profile Preview
            </h3>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-portal)] flex items-center justify-center text-2xl font-bold text-white">
                {profile.username.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  {profile.username}
                </h4>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {profile.email}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-2 py-1 bg-[var(--color-portal)]/20 text-[var(--color-portal)] text-xs rounded-full">
                    ❤️ {profile.favoriteCharacter}
                  </span>
                  <span className="px-2 py-1 bg-[var(--color-accent)]/20 text-[var(--color-accent-light)] text-xs rounded-full">
                    🎨 {profile.theme} theme
                  </span>
                  <span className="px-2 py-1 bg-[var(--color-surface-light)] text-[var(--color-text-secondary)] text-xs rounded-full">
                    📄 {profile.itemsPerPage} per page
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${profile.showDeadCharacters ? 'bg-[var(--color-success)]/20 text-[var(--color-success)]' : 'bg-[var(--color-error)]/20 text-[var(--color-error)]'}`}>
                    {profile.showDeadCharacters ? '👀 Showing dead' : '🙈 Hiding dead'}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
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
    </div>
  );
}
