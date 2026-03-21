import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { tokens } from "@theme/tokens";

/**
 * Secondary CTA: outlined card + phone icon. Not `PrimaryButton` on purpose — different visual
 * priority (solid brand = primary action; this = alternate path). Same default *height* as primary
 * so rows line up; pass `height` if you need a different size.
 */
type CallToOrderButtonProps = {
  title: string;
  subtitle: string;
  onPress: () => void;
  /** Defaults to `tokens.layout.ctaButtonHeight` (same as `PrimaryButton`). */
  height?: number;
  /** Default true; set false for inline / compact layout. */
  fullWidth?: boolean;
};

export function CallToOrderButton({
  title,
  subtitle,
  onPress,
  height = tokens.layout.ctaButtonHeight,
  fullWidth = true,
}: CallToOrderButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { height },
        fullWidth && styles.buttonFullWidth,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.iconCircle}>
        <MaterialCommunityIcons
          name="phone"
          size={tokens.layout.callToOrderIconGlyph}
          color={tokens.colors.white}
        />
      </View>
      <View style={styles.labels}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: tokens.spacing.sm,
    backgroundColor: tokens.colors.white,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    borderColor: "#9ad8ff",
    paddingHorizontal: tokens.spacing.md,
    ...tokens.elevation.card,
  },
  buttonFullWidth: {
    alignSelf: "stretch",
    width: "100%",
  },
  pressed: { opacity: 0.85 },
  labels: {
    flex: 1,
    minWidth: 0,
    justifyContent: "center",
  },
  iconCircle: {
    width: tokens.layout.callToOrderIconCircle,
    height: tokens.layout.callToOrderIconCircle,
    borderRadius: tokens.layout.callToOrderIconCircle / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#35a0f5",
  },
  title: {
    fontSize: tokens.fontSize.caption,
    lineHeight: 18,
    color: tokens.colors.textPrimary,
    fontWeight: tokens.fontWeight.bold,
  },
  subtitle: {
    marginTop: 1,
    fontSize: tokens.fontSize.tiny,
    lineHeight: 14,
    color: tokens.colors.textSecondary,
    fontWeight: tokens.fontWeight.semibold,
  },
});
