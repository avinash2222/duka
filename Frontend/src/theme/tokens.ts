export const tokens = {
  colors: {
    background: "#f4f7ff",
    surfaceAlt: "#eef2ff",
    card: "#ffffff",
    white: "#ffffff",
    textPrimary: "#0b1220",
    textSecondary: "#4a5a78",
    primary: "#4f46e5",
    primaryPressed: "#4338ca",
    border: "#dbe3ff",
    success: "#0f766e",
    warning: "#b45309",
    warningSoft: "#fff7ed",
    danger: "#be123c",
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 14,
    lg: 20,
    xl: 28,
  },
  radius: {
    md: 12,
    lg: 16,
    xl: 22,
  },
  fontSize: {
    tiny: 12,
    body: 16,
    caption: 14,
    title: 24,
  },
  fontWeight: {
    semibold: "600",
    bold: "700",
  },
  elevation: {
    card: {
      shadowColor: "#1d4ed8",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.08,
      shadowRadius: 20,
      elevation: 4,
    },
    button: {
      shadowColor: "#4f46e5",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.18,
      shadowRadius: 14,
      elevation: 3,
    },
  },
} as const;

