import { createTheme, alpha } from '@mui/material/styles';
import { palette } from './palette';

const sharedThemeConfig = {
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 600, lineHeight: 1.2 },
    h2: { fontSize: '2rem', fontWeight: 600, lineHeight: 1.3 },
    h3: { fontSize: '1.75rem', fontWeight: 600, lineHeight: 1.3 },
    h4: { fontSize: '1.5rem', fontWeight: 500, lineHeight: 1.4 },
    h5: { fontSize: '1.25rem', fontWeight: 500, lineHeight: 1.4 },
    h6: { fontSize: '1rem', fontWeight: 500, lineHeight: 1.5 },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
    body2: { fontSize: '0.875rem', lineHeight: 1.6 },
  },
};

const listItemNavStyles = {
  MuiListItemButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&.Mui-selected': {
          backgroundColor: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.2 : 0.12),
          borderRight: `3px solid ${theme.palette.primary.main}`,
          '& .MuiListItemIcon-root': {
            color: theme.palette.primary.main,
          },
          '& .MuiListItemText-primary': {
            color: theme.palette.primary.main,
            fontWeight: 600,
          },
        },
        '&:hover': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.mode === 'dark' ? 0.12 : 0.06
          ),
        },
      }),
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.text.secondary,
      }),
    },
  },
  MuiListItemText: {
    styleOverrides: {
      primary: ({ theme }) => ({
        color: theme.palette.text.primary,
      }),
    },
  },
};

/**
 * Light theme — surfaces + brand from light `palette` (aligned with DUKA mobile `tokens.ts`).
 */
export const lightTheme = createTheme({
  ...sharedThemeConfig,
  palette: {
    mode: 'light',
    ...palette,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 10,
          fontWeight: 500,
          padding: '8px 16px',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.12)',
          },
          '&:disabled': {
            backgroundColor: palette.custom.disabledButtonBackground,
            color: palette.custom.disabledButtonText,
            cursor: 'not-allowed',
          },
        },
        contained: {
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.08)',
          '&:disabled': {
            backgroundColor: palette.custom.disabledButtonBackground,
            color: palette.custom.disabledButtonText,
          },
        },
        outlined: {
          '&:disabled': {
            borderColor: palette.custom.disabledButtonBackground,
            color: palette.custom.disabledButtonText,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(15, 18, 32, 0.06)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    ...listItemNavStyles,
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          '&::-webkit-scrollbar': { width: '8px', height: '8px' },
          '&::-webkit-scrollbar-track': {
            backgroundColor: palette.custom.sectionControlsBackground,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#c4c9e0',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: '#a8b0d0',
            },
          },
        },
      },
    },
  },
});

/**
 * Dark theme — admin-dashboard only; same brand hue, tuned for low light.
 */
export const darkTheme = createTheme({
  ...sharedThemeConfig,
  palette: {
    mode: 'dark',
    primary: {
      main: palette.custom.primaryOnDark,
      light: palette.custom.primaryOnDarkLight,
      dark: palette.primary.main,
      contrastText: '#0f172a',
    },
    secondary: {
      main: '#2dd4bf',
      light: '#5eead4',
      dark: palette.secondary.main,
      contrastText: '#042f2e',
    },
    background: {
      default: '#0c1222',
      paper: '#151d32',
      dashboard: palette.primary.main,
    },
    text: {
      primary: '#e8eaf4',
      secondary: '#9ca3c2',
    },
    divider: '#2d3a55',
    error: palette.error,
    warning: palette.warning,
    info: palette.info,
    success: {
      main: '#2dd4bf',
      light: '#5eead4',
      dark: palette.success.main,
    },
    custom: {
      ...palette.custom,
      sectionControlsBackground: '#1a2438',
      commonBorderColor: '#2d3a55',
      disabledButtonBackground: '#334155',
      disabledButtonText: '#94a3b8',
    },
    grey: palette.grey,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 10,
          fontWeight: 500,
          padding: '8px 16px',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.35)',
          },
          '&:disabled': {
            backgroundColor: '#334155',
            color: '#94a3b8',
            cursor: 'not-allowed',
          },
        },
        contained: {
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.25)',
          '&:disabled': {
            backgroundColor: '#334155',
            color: '#94a3b8',
          },
        },
        outlined: {
          '&:disabled': {
            borderColor: '#334155',
            color: '#94a3b8',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.35)',
          backgroundImage: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          '& .MuiTypography-root': {
            color: '#e8eaf4 !important',
          },
          '& .MuiAvatar-root': {
            backgroundColor: `${palette.custom.primaryOnDark} !important`,
            color: '#0f172a !important',
          },
        },
      },
    },
    ...listItemNavStyles,
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          '&::-webkit-scrollbar': { width: '8px', height: '8px' },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#0c1222',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#3d4f72',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: '#556691',
            },
          },
        },
        '.Mui-selected .MuiListItemText-primary': {
          color: `${palette.custom.primaryOnDarkLight} !important`,
        },
        '.Mui-selected .MuiListItemIcon-root': {
          color: `${palette.custom.primaryOnDarkLight} !important`,
        },
      },
    },
  },
});
