/**
 * Default screen background for the whole app (`#f7f9fc`).
 * Applied globally via `appNavigationTheme` + `screenStyles` in `app/_layout.tsx`, `KeyboardAwareScreen`, and any `screenStyles.flexFill` shell.
 */
export const APP_SCREEN_BACKGROUND = "#E5EAF2";

export const tokens = {
  colors: {
    background: APP_SCREEN_BACKGROUND,
    surfaceAlt: "#eef2ff",
    card: "#ffffff",
    white: "#ffffff",
    textPrimary: "#0b1220",
    textSecondary: "#4a5a78",
    /** App brand primary (buttons, links, accents). */
    primary: "#6C5CE7",
    primaryPressed: "#5548D4",
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
  layout: {
    /** Shared default row height: `PrimaryButton` and `CallToOrderButton` (unless `height` override). */
    ctaButtonHeight: 42,
    /** Phone badge in `CallToOrderButton` — sized for `ctaButtonHeight`. */
    callToOrderIconCircle: 32,
    callToOrderIconGlyph: 18,
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
      shadowColor: "#6C5CE7",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.18,
      shadowRadius: 14,
      elevation: 3,
    },
  },
} as const;

