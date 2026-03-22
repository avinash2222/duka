// Role-based primary colors
// Only vendor uses custom teal theme, all other roles use existing blue
export const ROLE_PRIMARY_COLORS = {
  vendor: {
    main: '#1FA4A9', // Teal for vendor dashboard
    light: '#E6F6F7', // Light/Background variant
    dark: '#167C80', // Dark/Active variant
    contrastText: '#ffffff',
  },
};

export const palette = {
  primary: {
    main: '#3E5F93', // Blue for sponsor/admin (existing color)
    light: '#5B7FB8',
    dark: '#2A4A6F',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#10b981', // Emerald green as secondary
    light: '#34d399',
    dark: '#059669',
    contrastText: '#ffffff',
  },
  background: {
    default: '#f8fafc', // Keep default
    paper: '#ffffff',   // Keep paper
    dashboard: '#00B8D9', // Use solid color instead of gradient
  },
  text: {
    primary: '#1e293b', // Dark slate for primary text
    secondary: '#64748b', // Medium slate for secondary text
  },
  error: {
    main: '#ef4444', // Modern red
    light: '#f87171',
    dark: '#dc2626',
  },
  warning: {
    main: '#f59e0b', // Modern amber
    light: '#fbbf24',
    dark: '#d97706',
  },
  info: {
    main: '#0ea5e9', // Sky blue
    light: '#38bdf8',
    dark: '#0284c7',
  },
  success: {
    main: '#10b981', // Modern emerald green
    light: '#34d399',
    dark: '#059669',
  },
  // Custom colors for specific use cases
  custom: {
    lightPink: '#fce7f3', // Light pink for COs to review
    lightPinkText: '#be185d', // Darker pink text for contrast
    activeStatusBackground: '#28A745', // Vivid green for Active status
    activeStatusText: '#FFFFFF', // White text for Active status
    dashboardGradientStart: '#00B8D9', // Teal for dashboard header gradient
    dashboardGradientEnd: '#006DCC', // Deep blue for dashboard header gradient
    cosApprovedBackground: '#007BFF', // Vivid blue for CO Approved badges
    cosApprovedText: '#FFFFFF', // White text for CO Approved badges
    sectionControlsBackground: '#f8f9fa', // Section controls background color (light theme)
    commonBorderColor: '#e2e8f0', // Common border color for UI components (light theme)
    // Budget comparison background colors
    budgetApproved: '#fef3c7', // Light yellow for approved budget (more visible)
    budgetDraft: '#dbeafe', // Light blue for draft budget (more visible)
    budgetDelta: '#fce7f3', // Light pink for delta/changes (more visible)
    budgetHeader: '#e0e7ff', // Light indigo for header sections
    // Fixed row colors for consistent display regardless of budget status
    budgetLatest: '#fef3c7', // Fixed light yellow for latest budget row
    budgetOlder: '#dbeafe', // Fixed light blue for older budget row
    // Disabled button colors (light theme defaults)
    disabledButtonBackground: '#cbd5e1', // Light gray background for disabled buttons (grey-300 for better visibility)
    disabledButtonText: '#64748b', // Darker gray text for disabled buttons (grey-500 for better contrast)
    // Role-based nav bar and sidebar background (same color for app bar and left nav panel)
    navBarSponsor: '#E8F0FE', // Light blue tint for sponsor
    navBarVendor: '#E6F6F7', // Teal tint for vendor (matches ROLE_PRIMARY_COLORS.vendor.light)
    navBarDefault: '#f8fafc', // Neutral light gray for admin/other
  },
  // Additional colors inspired by clin.ai
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
