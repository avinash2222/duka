import { Pressable, StyleSheet, Text } from "react-native";
import { tokens } from "../theme/tokens";

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export function PrimaryButton({ label, onPress, disabled }: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.buttonDisabled,
        pressed && !disabled && styles.buttonPressed,
      ]}
    >
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: tokens.colors.primary,
    borderRadius: tokens.radius.lg,
    paddingVertical: tokens.spacing.md,
    alignItems: "center",
    ...tokens.elevation.button,
  },
  buttonDisabled: { opacity: 0.5 },
  buttonPressed: { backgroundColor: tokens.colors.primaryPressed },
  text: {
    color: tokens.colors.white,
    fontWeight: tokens.fontWeight.bold,
    fontSize: tokens.fontSize.body,
  },
});

