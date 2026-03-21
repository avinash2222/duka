import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { InfoCard } from "@common/InfoCard";
import { KeyboardAwareScreen } from "@common/KeyboardAwareScreen";
import { PrimaryButton } from "@common/PrimaryButton";
import { tokens } from "@theme/tokens";
import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { EnquiryPanel } from "../../enquiry/components/EnquiryPanel";
import { appConfig } from "../../../config/appConfig";

type AuthOutsideRadiusCardProps = {
  distanceKm: number;
  onRetry: () => void;
};

export function AuthOutsideRadiusCard({ distanceKm, onRetry }: AuthOutsideRadiusCardProps) {
  const { t } = useTranslation();

  return (
    <KeyboardAwareScreen contentContainerStyle={styles.screenContent}>
      <InfoCard>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons
            name="map-marker-alert-outline"
            size={30}
            color={tokens.colors.warning}
          />
        </View>
        <Text style={styles.warningTitle}>{t("outsideTitle")}</Text>
        <View style={styles.distanceChip}>
          <Text style={styles.distanceLabel}>
            {t("outsideDistanceLabel")}: {distanceKm} km
          </Text>
          <Text style={styles.distancePolicyText}>
            {t("outsidePolicyNote", { radius: appConfig.serviceability.radiusKm })}
          </Text>
        </View>
        <Text style={styles.subtitle}>{t("outsideMessage")}</Text>
        <Text style={styles.helpText}>{t("outsideHelpText")}</Text>
        <EnquiryPanel />
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
  warningTitle: {
    fontSize: tokens.fontSize.title,
    color: tokens.colors.warning,
    fontWeight: tokens.fontWeight.bold,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: tokens.colors.warningSoft,
    alignSelf: "center",
  },
  distanceChip: {
    alignSelf: "flex-start",
    backgroundColor: tokens.colors.surfaceAlt,
    borderColor: tokens.colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.md,
    paddingHorizontal: tokens.spacing.sm,
    paddingVertical: tokens.spacing.xs,
  },
  distanceLabel: {
    fontSize: tokens.fontSize.caption,
    fontWeight: tokens.fontWeight.semibold,
    color: tokens.colors.textPrimary,
  },
  distancePolicyText: {
    marginTop: tokens.spacing.xs,
    fontSize: tokens.fontSize.caption,
    color: tokens.colors.textSecondary,
    fontWeight: tokens.fontWeight.semibold,
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
