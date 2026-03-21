import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { tokens } from "../theme/tokens";

type InfoCardProps = {
  children: ReactNode;
};

export function InfoCard({ children }: InfoCardProps) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: tokens.colors.card,
    borderRadius: tokens.radius.xl,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    padding: tokens.spacing.lg,
    gap: tokens.spacing.md,
    ...tokens.elevation.card,
  },
});

