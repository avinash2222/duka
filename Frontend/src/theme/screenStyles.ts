import { StyleSheet } from "react-native";
import { tokens } from "./tokens";

/**
 * Reusable full-screen shells. Prefer these (or `KeyboardAwareScreen`) so `#f7f9fc` stays consistent.
 */
export const screenStyles = StyleSheet.create({
  flexFill: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  stackContent: {
    backgroundColor: tokens.colors.background,
  },
});
