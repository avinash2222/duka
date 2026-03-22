import { DukaLogo } from "@common/DukaLogo";
import { APP_DISPLAY_NAME } from "../config/appConstants";
import { StyleSheet, Text, View } from "react-native";
import { tokens } from "@theme/tokens";

type BrandHeaderProps = {
  title: string;
  subtitle: string;
};

export function BrandHeader({ title, subtitle }: BrandHeaderProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.brandRow}>
        <DukaLogo width={48} height={48} />
        <Text style={styles.brandText}>{APP_DISPLAY_NAME}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: tokens.spacing.sm,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: tokens.spacing.sm,
  },
  brandText: {
    fontSize: tokens.fontSize.title,
    fontWeight: tokens.fontWeight.bold,
    color: tokens.colors.textPrimary,
  },
  title: {
    fontSize: tokens.fontSize.title,
    fontWeight: tokens.fontWeight.bold,
    color: tokens.colors.textPrimary,
  },
  subtitle: {
    fontSize: tokens.fontSize.body,
    color: tokens.colors.textSecondary,
  },
});

