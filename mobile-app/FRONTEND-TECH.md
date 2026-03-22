# Frontend Technical Notes (Phase-1, Draft)

This document captures why the current frontend stack was selected.  
Details will be expanded later as implementation grows.

## Technology choices (minimal)

- **Expo + React Native + TypeScript**  
  Fast setup, stable developer experience, easy onboarding, fewer native build issues in phase-1.

- **Expo Router**  
  Simple file-based routing; easy for AI and humans to navigate.

- **TanStack Query + Zustand**  
  Clean split between server data handling and small local app state.

- **React Hook Form + Zod**  
  Lightweight form handling with clear validation patterns.

- **i18next + react-i18next**  
  Supports bilingual UI (English/Hindi) from the beginning.

- **expo-location**  
  Required for serviceability gate (inside/outside 5 km rollout area).

- **expo-notifications**  
  Simple alerting path for assignments and operational messages.

- **expo-secure-store + AsyncStorage**  
  Basic secure/session storage + non-sensitive local data storage.

## Why this stack fits phase-1

- Easy to implement and customize
- Low complexity and short code paths
- Works well with AI-assisted coding in Cursor
- Supports current business needs without overengineering

## Later expansion (placeholder)

- Real-time improvements (only if required)
- More role-specific modules
- Additional service lines (vendors, resale, vehicles, services)
