import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { tokens } from "@theme/tokens";

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingLabel?: string;
};

export function PrimaryButton({
  label,
  onPress,
  disabled,
  loading,
  loadingLabel,
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;
  const textToShow = loading ? (loadingLabel ?? label) : label;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        isDisabled && styles.buttonDisabled,
        pressed && !isDisabled && styles.buttonPressed,
      ]}
    >
      <View style={styles.content}>
        {loading ? <ActivityIndicator color={tokens.colors.white} size="small" /> : null}
        <Text style={styles.text}>{textToShow}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: tokens.colors.primary,
    borderRadius: tokens.radius.lg,
    paddingVertical: 11,
    alignItems: "center",
    ...tokens.elevation.button,
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
    color: tokens.colors.white,
    fontWeight: tokens.fontWeight.bold,
    fontSize: tokens.fontSize.body,
  },
});

