import { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { tokens } from "@theme/tokens";

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  /** Icon or badge shown before the label (hidden while loading). */
  leadingSlot?: ReactNode;
  /** Stretch to parent width. Default true for screen CTAs; set false for compact/toolbar use. */
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function PrimaryButton({
  label,
  onPress,
  disabled,
  loading,
  loadingLabel,
  leadingSlot,
  fullWidth = true,
  style,
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;
  const textToShow = loading ? (loadingLabel ?? label) : label;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        fullWidth && styles.buttonFullWidth,
        isDisabled && styles.buttonDisabled,
        pressed && !isDisabled && styles.buttonPressed,
        style,
      ]}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator color={tokens.colors.white} size="small" />
        ) : (
          leadingSlot ?? null
        )}
        <Text style={styles.text}>{textToShow}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: tokens.layout.ctaButtonHeight,
    backgroundColor: tokens.colors.primary,
    borderRadius: tokens.radius.lg,
    paddingHorizontal: tokens.spacing.md,
    justifyContent: "center",
    alignItems: "center",
    ...tokens.elevation.button,
  },
  buttonFullWidth: {
    alignSelf: "stretch",
    width: "100%",
  },
  buttonDisabled: { opacity: 0.5 },
  buttonPressed: { backgroundColor: tokens.colors.primaryPressed },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacing.sm,
  },
  text: {
    flexShrink: 1,
    color: tokens.colors.white,
    fontWeight: tokens.fontWeight.bold,
    fontSize: tokens.fontSize.body,
    textAlign: "center",
  },
});

