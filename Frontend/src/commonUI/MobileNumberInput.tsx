import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { tokens } from "@theme/tokens";

type MobileNumberInputProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  maxLength?: number;
};

const androidInputProps =
  Platform.OS === "android"
    ? ({ textAlignVertical: "center" as const, includeFontPadding: false } as const)
    : {};

export function MobileNumberInput({
  value,
  onChangeText,
  placeholder,
  maxLength,
}: MobileNumberInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.country}>🇮🇳 +91</Text>
      <View style={styles.divider} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={tokens.colors.textSecondary}
        keyboardType="number-pad"
        maxLength={maxLength}
        underlineColorAndroid="transparent"
        style={styles.input}
        {...androidInputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: tokens.colors.white,
    borderColor: tokens.colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.xl,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    gap: tokens.spacing.sm,
    ...tokens.elevation.card,
  },
  country: {
    fontSize: 16,
    lineHeight: 22,
    color: tokens.colors.textPrimary,
    fontWeight: tokens.fontWeight.semibold,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: tokens.colors.border,
  },
  input: {
    flex: 1,
    fontSize: 18,
    lineHeight: 22,
    color: tokens.colors.textPrimary,
    fontWeight: tokens.fontWeight.semibold,
    letterSpacing: 0.75,
    padding: 0,
    margin: 0,
  },
});
