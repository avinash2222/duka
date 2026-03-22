import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const UiContext = createContext(null);

export function UiProvider({ children }) {
  const [globalLoading, setGlobalLoading] = useState(false);

  const setGlobalLoadingState = useCallback((v) => {
    setGlobalLoading(Boolean(v));
  }, []);

  const value = useMemo(
    () => ({
      globalLoading,
      setGlobalLoading: setGlobalLoadingState,
    }),
    [globalLoading, setGlobalLoadingState]
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi() {
  const ctx = useContext(UiContext);
  if (!ctx) {
    throw new Error('useUi must be used within UiProvider');
  }
  return ctx;
}
