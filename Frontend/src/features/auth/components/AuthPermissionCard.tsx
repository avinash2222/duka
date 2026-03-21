import { InfoCard } from "@common/InfoCard";
import { KeyboardAwareScreen } from "@common/KeyboardAwareScreen";
import { PrimaryButton } from "@common/PrimaryButton";
import { tokens } from "@theme/tokens";
import { StyleSheet, Text } from "react-native";
import { useTranslation } from "react-i18next";

type AuthPermissionCardProps = {
  onRetry: () => void;
};

export function AuthPermissionCard({ onRetry }: AuthPermissionCardProps) {
  const { t } = useTranslation();

  return (
    <KeyboardAwareScreen contentContainerStyle={styles.screenContent}>
      <InfoCard>
        <Text style={styles.title}>{t("permissionTitle")}</Text>
        <Text style={styles.subtitle}>{t("permissionMessage")}</Text>
        <PrimaryButton label={t("retry")} onPress={onRetry} />
      </InfoCard>
    </KeyboardAwareScreen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingHorizontal: tokens.spacing.lg,
    paddingTop: tokens.spacing.md,
    paddingBottom: tokens.spacing.sm,
  },
  title: {
    fontSize: tokens.fontSize.title,
    color: tokens.colors.textPrimary,
    fontWeight: tokens.fontWeight.bold,
  },
  subtitle: {
    fontSize: tokens.fontSize.body,
    color: tokens.colors.textSecondary,
  },
});
