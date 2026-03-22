import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { DukaLogo } from "@common/DukaLogo";
import { KeyboardAwareScreen } from "@common/KeyboardAwareScreen";
import { tokens } from "@theme/tokens";

export function ServiceabilityLoader() {
  return (
    <KeyboardAwareScreen contentContainerStyle={styles.screenContent}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <DukaLogo width={80} height={80} />
        </View>

        <ActivityIndicator size="large" color={tokens.colors.primary} />

        <Text style={styles.title}>Checking service availability</Text>
        <Text style={styles.subtitle}>सेवा उपलब्धता जांच रहे हैं...</Text>
      </View>
    </KeyboardAwareScreen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: tokens.colors.background,
  },
  container: {
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: tokens.spacing.lg,
  },
  title: {
    marginTop: tokens.spacing.lg,
    fontSize: tokens.fontSize.body,
    fontWeight: tokens.fontWeight.semibold,
    color: tokens.colors.textPrimary,
  },
  subtitle: {
    marginTop: tokens.spacing.xs,
    fontSize: tokens.fontSize.caption,
    color: tokens.colors.textSecondary,
  },
});
