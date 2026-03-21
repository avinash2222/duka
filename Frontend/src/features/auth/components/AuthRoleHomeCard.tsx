import { InfoCard } from "@common/InfoCard";
import { KeyboardAwareScreen } from "@common/KeyboardAwareScreen";
import { PrimaryButton } from "@common/PrimaryButton";
import { tokens } from "@theme/tokens";
import { StyleSheet, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { UserRole } from "../types";
import { ROLE_UI_CONFIG } from "../../../config/roleConfig";

type AuthRoleHomeCardProps = {
  role: UserRole;
  onLogout: () => void;
};

export function AuthRoleHomeCard({ role, onLogout }: AuthRoleHomeCardProps) {
  const { t } = useTranslation();
  const roleUi = ROLE_UI_CONFIG[role];

  return (
    <KeyboardAwareScreen contentContainerStyle={styles.screenContent}>
      <InfoCard>
        <Text style={styles.title}>{roleUi.dashboardTitle}</Text>
        <Text style={styles.subtitle}>
          {t("loggedInAs")}: {roleUi.label}
        </Text>
        <Text style={styles.helpText}>{roleUi.dashboardSubtitle}</Text>
        <PrimaryButton label={t("logout")} onPress={onLogout} />
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
  helpText: {
    fontSize: tokens.fontSize.caption,
    color: tokens.colors.textSecondary,
  },
});
