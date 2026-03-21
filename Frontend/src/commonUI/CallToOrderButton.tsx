import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { tokens } from "@theme/tokens";

/**
 * Secondary CTA: outlined card + phone chip. Height comes from padding + content (not fixed to match primary).
 */
type CallToOrderButtonProps = {
  title: string;
  subtitle: string;
  onPress: () => void;
  /** Default true; set false for inline / compact layout. */
  fullWidth?: boolean;
};

export function CallToOrderButton({
  title,
  subtitle,
  onPress,
  fullWidth = true,
}: CallToOrderButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, fullWidth && styles.buttonFullWidth, pressed && styles.pressed]}
    >
      <View style={styles.iconCircle}>
        <MaterialCommunityIcons name="phone" size={20} color={tokens.colors.white} />
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
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
    borderRadius: tokens.radius.xl,
    borderWidth: 1,
    borderColor: "#9ad8ff",
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.md,
    ...tokens.elevation.card,
  },
  buttonFullWidth: {
    alignSelf: "stretch",
    width: "100%",
  },
  pressed: { opacity: 0.85 },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#35a0f5",
  },
  title: {
    fontSize: tokens.fontSize.body,
    color: tokens.colors.textPrimary,
    fontWeight: tokens.fontWeight.bold,
  },
  subtitle: {
    fontSize: tokens.fontSize.caption,
    color: tokens.colors.textSecondary,
    fontWeight: tokens.fontWeight.semibold,
  },
});
