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

const buttonElevation = {
  shadowOffset: tokens.elevation.button.shadowOffset,
  shadowOpacity: tokens.elevation.button.shadowOpacity,
  shadowRadius: tokens.elevation.button.shadowRadius,
  elevation: tokens.elevation.button.elevation,
};

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
  /** Override default brand fill (e.g. role tiles). */
  backgroundColor?: string;
  /** Override pressed fill; defaults to `tokens.colors.primaryPressed` when `backgroundColor` is omitted. */
  pressedBackgroundColor?: string;
  /** Shadow tint; defaults to resting fill color. */
  shadowColor?: string;
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
  backgroundColor,
  pressedBackgroundColor,
  shadowColor,
  style,
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;
  const textToShow = loading ? (loadingLabel ?? label) : label;

  const fill = backgroundColor ?? tokens.colors.primary;
  const fillPressed = pressedBackgroundColor ?? tokens.colors.primaryPressed;
  const shadowTint = shadowColor ?? fill;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.buttonBase,
        {
          backgroundColor: pressed && !isDisabled ? fillPressed : fill,
          shadowColor: shadowTint,
        },
        fullWidth && styles.buttonFullWidth,
        isDisabled && styles.buttonDisabled,
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
  buttonBase: {
    height: tokens.layout.ctaButtonHeight,
    borderRadius: tokens.radius.lg,
    paddingHorizontal: tokens.spacing.md,
    justifyContent: "center",
    alignItems: "center",
    ...buttonElevation,
  },
  buttonFullWidth: {
    alignSelf: "stretch",
    width: "100%",
  },
  buttonDisabled: { opacity: 0.5 },
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
