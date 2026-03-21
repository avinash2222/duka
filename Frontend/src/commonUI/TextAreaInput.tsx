import { StyleSheet, Text, TextInput, View } from "react-native";
import { tokens } from "@theme/tokens";

type TextAreaInputProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  numberOfLines?: number;
};

export function TextAreaInput({
  label,
  value,
  onChangeText,
  placeholder,
  numberOfLines = 4,
}: TextAreaInputProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline
        numberOfLines={numberOfLines}
        textAlignVertical="top"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: tokens.spacing.xs },
  label: {
    fontSize: tokens.fontSize.caption,
    color: tokens.colors.textSecondary,
    fontWeight: tokens.fontWeight.semibold,
  },
  input: {
    borderWidth: 1,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    backgroundColor: tokens.colors.white,
    fontSize: tokens.fontSize.body,
    color: tokens.colors.textPrimary,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.md,
    minHeight: 110,
  },
});

