import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { CallToOrderButton } from "@common/CallToOrderButton";
import { DukaLogo } from "@common/DukaLogo";
import { KeyboardAwareScreen } from "@common/KeyboardAwareScreen";
import { MobileNumberInput } from "@common/MobileNumberInput";
import { PrimaryButton } from "@common/PrimaryButton";
import { tokens } from "@theme/tokens";

type AuthLoginFormProps = {
  mobile: string;
  showMobileError: boolean;
  authErrorMessage: string | null;
  canContinue: boolean;
  isLoadingUserDetails: boolean;
  onChangeMobile: (value: string) => void;
  onContinue: () => void;
  onCallToOrder: () => void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
};

export function AuthLoginForm({
  mobile,
  showMobileError,
  authErrorMessage,
  canContinue,
  isLoadingUserDetails,
  onChangeMobile,
  onContinue,
  onCallToOrder,
  onOpenTerms,
  onOpenPrivacy,
}: AuthLoginFormProps) {
  const { t } = useTranslation();

  return (
    <KeyboardAwareScreen contentContainerStyle={styles.screenContent}>
      <View style={styles.loginShell}>
        <View style={styles.loginMain}>
          <View style={styles.heroLogoWrap}>
            <DukaLogo width={220} height={240} />
          </View>
          <Text style={styles.welcome}>{t("loginWelcome")}</Text>
          <Text style={styles.mobileHint}>{t("loginEnterMobile")}</Text>

          <MobileNumberInput
            value={mobile}
            onChangeText={onChangeMobile}
            placeholder={t("mobilePlaceholder")}
            maxLength={10}
          />

          {showMobileError && <Text style={styles.errorText}>{t("invalidMobile")}</Text>}
          {!!authErrorMessage && <Text style={styles.errorText}>{t("loginFailed")}</Text>}

          <PrimaryButton
            label={t("continueBilingual")}
            loadingLabel={t("continueLoading")}
            onPress={onContinue}
            disabled={!canContinue}
            loading={isLoadingUserDetails}
          />

          <View style={styles.orRow}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>{t("orBilingual")}</Text>
            <View style={styles.orLine} />
          </View>

          <CallToOrderButton
            title={t("callOrderTitle")}
            subtitle={t("callOrderSubtitle")}
            onPress={onCallToOrder}
          />

          <Text style={styles.callLine}>{t("noAppCallLine")}</Text>
        </View>

        <View style={styles.bottomLegal}>
          <Text style={styles.termsLine}>
            {t("termsPrefix")}{" "}
            <Text style={styles.termsLink} onPress={onOpenTerms}>
              {t("termsAndConditions")}
            </Text>{" "}
            {t("termsConnector")}{" "}
            <Text style={styles.termsLink} onPress={onOpenPrivacy}>
              {t("privacyPolicy")}
            </Text>
            .
          </Text>
        </View>
      </View>
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
  loginShell: {
    flex: 1,
  },
  loginMain: {
    gap: tokens.spacing.md,
  },
  bottomLegal: {
    marginTop: "auto",
    paddingTop: tokens.spacing.sm,
  },
  heroLogoWrap: {
    alignSelf: "center",
  },
  welcome: {
    fontSize: tokens.fontSize.title,
    color: tokens.colors.textPrimary,
    fontWeight: tokens.fontWeight.bold,
    textAlign: "center",
  },
  mobileHint: {
    fontSize: tokens.fontSize.body,
    color: tokens.colors.textSecondary,
    fontWeight: tokens.fontWeight.semibold,
    textAlign: "center",
  },
  errorText: {
    color: tokens.colors.danger,
    fontSize: tokens.fontSize.caption,
  },
  orRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: tokens.spacing.sm,
  },
  orLine: {
    height: 1,
    flex: 1,
    backgroundColor: tokens.colors.border,
  },
  orText: {
    fontSize: tokens.fontSize.caption,
    color: tokens.colors.textSecondary,
    fontWeight: tokens.fontWeight.semibold,
  },
  callLine: {
    fontSize: tokens.fontSize.caption,
    color: tokens.colors.textSecondary,
    textAlign: "center",
    fontWeight: tokens.fontWeight.semibold,
  },
  termsLine: {
    marginTop: tokens.spacing.xs,
    fontSize: tokens.fontSize.tiny,
    color: tokens.colors.textSecondary,
    textAlign: "center",
    lineHeight: 18,
  },
  termsLink: {
    color: tokens.colors.primary,
    textDecorationLine: "underline",
    fontWeight: tokens.fontWeight.semibold,
  },
});
