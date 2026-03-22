import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { CallToOrderButton } from "@common/CallToOrderButton";
import { KeyboardAwareScreen } from "@common/KeyboardAwareScreen";
import { PrimaryButton } from "@common/PrimaryButton";
import { tokens } from "@theme/tokens";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

type AuthPermissionCardProps = {
  onRetry: () => void;
  onCall: () => void;
};

export function AuthPermissionCard({ onRetry, onCall }: AuthPermissionCardProps) {
  const { t } = useTranslation();

  return (
    <KeyboardAwareScreen contentContainerStyle={styles.screenContent}>
      <View style={styles.container}>
        <View style={styles.locationOffHero}>
          <MaterialCommunityIcons name="map-marker-off" size={52} color={tokens.colors.textSecondary} />
        </View>

        <Text style={styles.title}>{t("permissionTitle")}</Text>
        <Text style={styles.subtitleSecondary}>{t("permissionSubtitleHi")}</Text>

        <Text style={styles.body}>{t("permissionMessage")}</Text>
        <Text style={styles.bodyHi}>{t("permissionMessageHi")}</Text>

        <PrimaryButton
          label={t("permissionEnableBilingual")}
          onPress={onRetry}
          style={styles.permissionPrimaryButton}
          leadingSlot={
            <View style={styles.enableIconBadge}>
              <MaterialCommunityIcons name="crosshairs-gps" size={20} color={tokens.colors.primary} />
            </View>
          }
        />

        <Text style={styles.or}>{t("orBilingual")}</Text>

        <CallToOrderButton
          title={t("callOrderTitle")}
          subtitle={t("callOrderSubtitle")}
          onPress={onCall}
        />
      </View>
    </KeyboardAwareScreen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: tokens.spacing.lg,
    paddingVertical: tokens.spacing.lg,
    backgroundColor: tokens.colors.background,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  locationOffHero: {
    width: 108,
    height: 108,
    borderRadius: 54,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: tokens.colors.surfaceAlt,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    marginBottom: tokens.spacing.lg,
  },
  title: {
    fontSize: tokens.fontSize.title,
    fontWeight: tokens.fontWeight.bold,
    color: tokens.colors.textPrimary,
    textAlign: "center",
    letterSpacing: -0.3,
  },
  subtitleSecondary: {
    fontSize: tokens.fontSize.caption,
    color: tokens.colors.textSecondary,
    textAlign: "center",
    marginTop: tokens.spacing.xs,
    marginBottom: tokens.spacing.md,
    fontWeight: tokens.fontWeight.semibold,
  },
  body: {
    textAlign: "center",
    fontSize: tokens.fontSize.caption,
    color: tokens.colors.textPrimary,
    lineHeight: 20,
    paddingHorizontal: tokens.spacing.sm,
  },
  bodyHi: {
    textAlign: "center",
    fontSize: tokens.fontSize.tiny,
    color: tokens.colors.textSecondary,
    lineHeight: 18,
    marginTop: tokens.spacing.sm,
    marginBottom: tokens.spacing.lg,
    paddingHorizontal: tokens.spacing.sm,
  },
  permissionPrimaryButton: {
    height: 54,
    minHeight: 54,
  },
  enableIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: tokens.colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  or: {
    marginVertical: tokens.spacing.md,
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.tiny,
  },
});
