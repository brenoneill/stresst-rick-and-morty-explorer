# Stresst Rick and Morty Explorer

A React-based character explorer for the Rick and Morty universe. This project is designed as a technical assessment for evaluating frontend development skills.

## 🎯 Difficulty Level

**Intermediate**

This project tests the following skills:
- React fundamentals (components, hooks, state management)
- Context API for global state
- API integration and data fetching
- TypeScript usage
- CSS/Tailwind styling
- Pagination and filtering logic
- User preferences and settings persistence

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## 🚀 Getting Started

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-org/stresst-rick-and-morty-explorer.git
cd stresst-rick-and-morty-explorer
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

### Type Checking

Run TypeScript type checking:

```bash
npm run typecheck
```

## 🏗️ Building for Production

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## 🐳 Docker Deployment

Build and run using Docker:

```bash
docker build -t stresst-rick-and-morty-explorer .
docker run -p 3000:3000 stresst-rick-and-morty-explorer
```

## 📁 Project Structure

```
├── app/
│   ├── components/       # Reusable UI components
│   │   ├── CharacterCard.tsx
│   │   ├── EpisodeModal.tsx
│   │   ├── ErrorState.tsx
│   │   ├── FilterBar.tsx
│   │   ├── Header.tsx
│   │   ├── LoadingState.tsx
│   │   └── Pagination.tsx
│   ├── context/          # React Context for global state
│   │   └── AppContext.tsx
│   ├── routes/           # Page components
│   │   ├── home.tsx      # Main character explorer page
│   │   └── settings.tsx  # User preferences page
│   ├── types/            # TypeScript type definitions
│   │   └── api.ts
│   ├── utils/            # Utility functions
│   │   └── api.ts        # API client functions
│   ├── app.css           # Global styles
│   ├── root.tsx          # Root layout component
│   └── routes.ts         # Route configuration
├── public/               # Static assets
├── Dockerfile
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## ✨ Features

- **Character Browsing**: View all characters from the Rick and Morty universe
- **Search & Filter**: Filter characters by name, status, and species
- **Pagination**: Navigate through pages of characters with configurable items per page
- **Episode Details**: View which episodes each character appears in
- **User Settings**: Customize display preferences (theme, items per page, show/hide dead characters)
- **Persistent Preferences**: Settings are stored in localStorage

## 🔗 API

This project uses the [Rick and Morty API](https://rickandmortyapi.com/) - a free, open-source API with all the Rick and Morty data.

## 🛠️ Tech Stack

- **Framework**: [React Router v7](https://reactrouter.com/) (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite
- **Runtime**: Node.js

---

Built with ❤️ for Stresst technical assessments.
