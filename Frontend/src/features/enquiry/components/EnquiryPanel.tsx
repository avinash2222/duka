import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "@common/PrimaryButton";
import { TextAreaInput } from "@common/TextAreaInput";
import { tokens } from "@theme/tokens";
import { submitEnquiry } from "../api";

type EnquiryPanelProps = {
  onSubmit?: (message: string) => Promise<void> | void;
};

export function EnquiryPanel({ onSubmit }: EnquiryPanelProps) {
  const { t } = useTranslation();
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);

  const canSubmit = message.trim().length >= 4;

  async function handleSubmit() {
    if (!canSubmit || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setHasError(false);

    try {
      if (onSubmit) {
        await onSubmit(message.trim());
      } else {
        await submitEnquiry({ message: message.trim() });
      }
      setIsSent(true);
      setMessage("");
    } catch {
      setHasError(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("enquiryTitle")}</Text>
      <Text style={styles.subtitle}>{t("enquirySubtitle")}</Text>

      <TextAreaInput
        label={t("enquiryLabel")}
        value={message}
        onChangeText={(value) => {
          setMessage(value);
          if (isSent) {
            setIsSent(false);
          }
          if (hasError) {
            setHasError(false);
          }
        }}
        placeholder={t("enquiryPlaceholder")}
      />

      {isSent && <Text style={styles.successText}>{t("enquirySuccess")}</Text>}
      {hasError && <Text style={styles.errorText}>{t("enquiryError")}</Text>}

      <PrimaryButton
        label={t("enquiryButton")}
        loadingLabel={t("enquirySubmitting")}
        onPress={handleSubmit}
        disabled={!canSubmit}
        loading={isSubmitting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: tokens.spacing.sm,
    backgroundColor: tokens.colors.surfaceAlt,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    padding: tokens.spacing.md,
  },
  title: {
    fontSize: tokens.fontSize.body,
    fontWeight: tokens.fontWeight.bold,
    color: tokens.colors.textPrimary,
  },
  subtitle: {
    fontSize: tokens.fontSize.caption,
    color: tokens.colors.textSecondary,
  },
  successText: {
    fontSize: tokens.fontSize.caption,
    color: tokens.colors.success,
    fontWeight: tokens.fontWeight.semibold,
  },
  errorText: {
    fontSize: tokens.fontSize.caption,
    color: tokens.colors.danger,
    fontWeight: tokens.fontWeight.semibold,
  },
});

