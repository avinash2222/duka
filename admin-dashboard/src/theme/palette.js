// Optional vendor-only accent (FEAT-RBAC / marketplace); admin default uses DUKA purple.
export const ROLE_PRIMARY_COLORS = {
  vendor: {
    main: '#1FA4A9',
    light: '#E6F6F7',
    dark: '#167C80',
    contrastText: '#ffffff',
  },
};

/**
 * Light-mode palette — matches mobile-app `tokens.ts` for brand + surfaces.
 * Dark theme in `themes.js` reuses `primary.main`, `custom.primaryOnDark*`, and semantic colors from here.
 */
export const palette = {
  primary: {
    main: '#6C5CE7',
    light: '#8B7CF8',
    dark: '#5548D4',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#0f766e',
    light: '#14b8a6',
    dark: '#0d9488',
    contrastText: '#ffffff',
  },
  background: {
    default: '#E5EAF2',
    paper: '#ffffff',
    dashboard: '#6C5CE7',
  },
  text: {
    primary: '#0b1220',
    secondary: '#4a5a78',
  },
  divider: '#dbe3ff',
  error: {
    main: '#be123c',
    light: '#f43f5e',
    dark: '#9f1239',
  },
  warning: {
    main: '#f59e0b',
    light: '#fbbf24',
    dark: '#b45309',
  },
  info: {
    main: '#6366f1',
    light: '#818cf8',
    dark: '#4f46e5',
  },
  success: {
    main: '#0f766e',
    light: '#2dd4bf',
    dark: '#0f766e',
  },
  custom: {
    lightPink: '#fce7f3',
    lightPinkText: '#be185d',
    activeStatusBackground: '#28A745',
    activeStatusText: '#FFFFFF',
    dashboardGradientStart: '#6C5CE7',
    dashboardGradientEnd: '#00CEC9',
    cosApprovedBackground: '#007BFF',
    cosApprovedText: '#FFFFFF',
    sectionControlsBackground: '#eef2ff',
    commonBorderColor: '#dbe3ff',
    /** Dark mode primary on surfaces — used when building dark theme */
    primaryOnDark: '#a78bfa',
    primaryOnDarkLight: '#c4b5fd',
    budgetApproved: '#fef3c7',
    budgetDraft: '#dbeafe',
    budgetDelta: '#fce7f3',
    budgetHeader: '#e0e7ff',
    budgetLatest: '#fef3c7',
    budgetOlder: '#dbeafe',
    disabledButtonBackground: '#cbd5e1',
    disabledButtonText: '#64748b',
    navBarSponsor: '#eef2ff',
    navBarVendor: '#E6F6F7',
    navBarDefault: '#E5EAF2',
  },
  grey: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
};
