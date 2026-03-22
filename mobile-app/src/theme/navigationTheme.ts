import { DefaultTheme, type Theme } from "@react-navigation/native";
import { APP_SCREEN_BACKGROUND, tokens } from "./tokens";

/**
 * React Navigation / native-stack screen defaults (background, card, text).
 * Wrapped in `ThemeProvider` in `app/_layout.tsx` so every route uses the app screen color.
 */
export const appNavigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: APP_SCREEN_BACKGROUND,
    card: tokens.colors.card,
    primary: tokens.colors.primary,
    text: tokens.colors.textPrimary,
    border: tokens.colors.border,
    notification: DefaultTheme.colors.notification,
  },
};
