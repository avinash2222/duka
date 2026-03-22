import { createTheme } from '@mui/material/styles';
import { palette } from './palette';

/**
 * Theme Configurations
 * Light theme is the default theme for the application
 * Both themes share common configuration via sharedThemeConfig
 */

/**
 * Shared theme configuration
 * Common settings used by both light and dark themes
 */
const sharedThemeConfig = {
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
};

/**
 * Light theme configuration (DEFAULT)
 * Provides a clean, bright interface for daytime use
 * This is the default theme when users first visit the application
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
          borderRadius: 8,
          fontWeight: 500,
          padding: '8px 16px',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
          },
          '&:disabled': {
            backgroundColor: palette.custom.disabledButtonBackground,
            color: palette.custom.disabledButtonText,
            cursor: 'not-allowed',
          },
        },
        contained: {
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
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
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderRight: '3px solid #3b82f6',
            '& .MuiListItemIcon-root': {
              color: '#3b82f6',
            },
            '& .MuiListItemText-primary': {
              color: '#3b82f6',
              fontWeight: 600,
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(59, 130, 246, 0.05)',
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#64748b',
          '&.Mui-selected': {
            color: '#3b82f6',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: '#475569',
          '&.Mui-selected': {
            color: '#3b82f6',
          },
        },
      },
    },
    // Global scrollbar styling (tables, long pages)
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f8f9fa',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#c1c1c1',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: '#a8a8a8',
            },
          },
        },
      },
    },
  },
});

/**
 * Dark theme configuration
 * Provides a comfortable, low-light interface for nighttime use
 */
export const darkTheme = createTheme({
  ...sharedThemeConfig,
  palette: {
    mode: 'dark',
    primary: {
      ...palette.primary,
      main: '#60a5fa', // Lighter blue for better visibility in dark theme
    },
    secondary: palette.secondary,
    background: {
      default: '#0f172a', // Dark slate
      paper: '#1e293b', // Slightly lighter dark
      dashboard: palette.background.dashboard,
    },
    text: {
      primary: '#f8fafc', // Soft white for primary text - better visibility
      secondary: '#cbd5e1', // Medium gray for secondary text - good balance
    },
    error: palette.error,
    warning: palette.warning,
    info: palette.info,
    success: palette.success,
    custom: {
      ...palette.custom,
      sectionControlsBackground: '#2d3748', // Dark theme section controls background
      commonBorderColor: '#475569', // Dark theme common border color
      disabledButtonBackground: '#334155', // Darker gray background for disabled buttons (grey-700 for better visibility in dark theme)
      disabledButtonText: '#94a3b8', // Lighter gray text for disabled buttons (grey-400 for better contrast in dark theme)
    },
    grey: palette.grey,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
          padding: '8px 16px',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
          },
          '&:disabled': {
            backgroundColor: '#334155', // Use custom.disabledButtonBackground from palette
            color: '#94a3b8', // Use custom.disabledButtonText from palette
            cursor: 'not-allowed',
          },
        },
        contained: {
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
          '&:disabled': {
            backgroundColor: '#334155', // Use custom.disabledButtonBackground from palette
            color: '#94a3b8', // Use custom.disabledButtonText from palette
          },
        },
        outlined: {
          '&:disabled': {
            borderColor: '#334155', // Use custom.disabledButtonBackground from palette
            color: '#94a3b8', // Use custom.disabledButtonText from palette
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          backgroundImage: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          '& .MuiTypography-root': {
            color: '#f8fafc !important',
          },
          '& .MuiAvatar-root': {
            backgroundColor: '#3b82f6 !important',
            color: '#ffffff !important',
          },
        },
      },
    },
    // Global scrollbar styling (tables, long pages)
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#2d3728',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#475569',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: '#64748b',
            },
          },
        },
        // Toolpad navigation selected state overrides
        '.Mui-selected .MuiListItemText-primary': {
          color: '#60a5fa !important',
        },
        '.Mui-selected .MuiListItemIcon-root': {
          color: '#60a5fa !important',
        },
        '.Mui-selected .MuiSvgIcon-root': {
          color: '#60a5fa !important',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'rgba(59, 130, 246, 0.15)',
            borderRight: '3px solid #3b82f6',
            '& .MuiListItemIcon-root': {
              color: '#60a5fa !important',
            },
            '& .MuiListItemText-primary': {
              color: '#60a5fa !important',
              fontWeight: 600,
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#94a3b8',
          '&.Mui-selected': {
            color: '#60a5fa !important',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: '#e2e8f0',
          '&.Mui-selected': {
            color: '#60a5fa !important',
          },
        },
      },
    },
  },
});

