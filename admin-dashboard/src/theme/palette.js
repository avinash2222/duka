import { dukaTokens } from './dukaTokens';

// Optional vendor-only accent (FEAT-RBAC / marketplace); admin default uses DUKA purple.
export const ROLE_PRIMARY_COLORS = {
  vendor: {
    main: '#1FA4A9',
    light: '#E6F6F7',
    dark: '#167C80',
    contrastText: '#ffffff',
  },
};

/** Light-mode palette — matches mobile-app `tokens.ts` for brand + surfaces */
export const palette = {
  primary: {
    main: dukaTokens.primary,
    light: '#8B7CF8',
    dark: dukaTokens.primaryPressed,
    contrastText: '#ffffff',
  },
  secondary: {
    main: dukaTokens.success,
    light: '#14b8a6',
    dark: '#0d9488',
    contrastText: '#ffffff',
  },
  background: {
    default: dukaTokens.background,
    paper: dukaTokens.card,
    dashboard: dukaTokens.primary,
  },
  text: {
    primary: dukaTokens.textPrimary,
    secondary: dukaTokens.textSecondary,
  },
  divider: dukaTokens.border,
  error: {
    main: dukaTokens.danger,
    light: '#f43f5e',
    dark: '#9f1239',
  },
  warning: {
    main: '#f59e0b',
    light: '#fbbf24',
    dark: dukaTokens.warning,
  },
  info: {
    main: '#6366f1',
    light: '#818cf8',
    dark: '#4f46e5',
  },
  success: {
    main: dukaTokens.success,
    light: '#2dd4bf',
    dark: '#0f766e',
  },
  custom: {
    lightPink: '#fce7f3',
    lightPinkText: '#be185d',
    activeStatusBackground: '#28A745',
    activeStatusText: '#FFFFFF',
    dashboardGradientStart: dukaTokens.primary,
    dashboardGradientEnd: '#00CEC9',
    cosApprovedBackground: '#007BFF',
    cosApprovedText: '#FFFFFF',
    sectionControlsBackground: dukaTokens.surfaceAlt,
    commonBorderColor: dukaTokens.border,
    budgetApproved: '#fef3c7',
    budgetDraft: '#dbeafe',
    budgetDelta: '#fce7f3',
    budgetHeader: '#e0e7ff',
    budgetLatest: '#fef3c7',
    budgetOlder: '#dbeafe',
    disabledButtonBackground: '#cbd5e1',
    disabledButtonText: '#64748b',
    navBarSponsor: dukaTokens.surfaceAlt,
    navBarVendor: '#E6F6F7',
    navBarDefault: dukaTokens.background,
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
