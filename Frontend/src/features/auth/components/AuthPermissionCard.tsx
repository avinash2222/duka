import { DukaLogo } from "@common/DukaLogo";
import { KeyboardAwareScreen } from "@common/KeyboardAwareScreen";
import { tokens } from "@theme/tokens";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type AuthPermissionCardProps = {
  onRetry: () => void;
  onCall: () => void;
};

export function AuthPermissionCard({ onRetry, onCall }: AuthPermissionCardProps) {
  return (
    <KeyboardAwareScreen contentContainerStyle={styles.screenContent}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <DukaLogo width={90} height={90} />
        </View>

        <Text style={styles.icon}>📍</Text>

        <Text style={styles.title}>Location needed</Text>
        <Text style={styles.subtitle}>डिलीवरी के लिए लोकेशन जरूरी है</Text>

        <Text style={styles.desc}>We use your location to check delivery availability</Text>
        <Text style={styles.descHindi}>
          आपके क्षेत्र में डिलीवरी उपलब्ध है या नहीं यह जांचने के लिए
        </Text>

        <TouchableOpacity style={styles.primaryBtn} onPress={onRetry} activeOpacity={0.85}>
          <Text style={styles.primaryText}>Enable Location / लोकेशन चालू करें</Text>
        </TouchableOpacity>

        <Text style={styles.or}>or / या</Text>

        <TouchableOpacity style={styles.secondaryBtn} onPress={onCall} activeOpacity={0.85}>
          <Text style={styles.secondaryText}>📞 Order by Call / कॉल करके ऑर्डर करें</Text>
        </TouchableOpacity>
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
    backgroundColor: "#F7F9FC",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: tokens.spacing.lg,
  },
  icon: {
    fontSize: 40,
    marginBottom: tokens.spacing.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: tokens.fontWeight.semibold,
    color: "#2D3436",
  },
  subtitle: {
    fontSize: tokens.fontSize.caption,
    color: "#636E72",
    marginBottom: tokens.spacing.sm,
  },
  desc: {
    textAlign: "center",
    fontSize: tokens.fontSize.caption,
    color: "#2D3436",
    marginTop: tokens.spacing.sm,
  },
  descHindi: {
    textAlign: "center",
    fontSize: 13,
    color: "#636E72",
    marginBottom: tokens.spacing.lg,
  },
  primaryBtn: {
    backgroundColor: "#6C5CE7",
    paddingVertical: 14,
    paddingHorizontal: tokens.spacing.lg,
    borderRadius: tokens.radius.md,
    marginTop: tokens.spacing.sm,
    width: "100%",
  },
  primaryText: {
    color: tokens.colors.white,
    textAlign: "center",
    fontSize: 15,
    fontWeight: tokens.fontWeight.semibold,
  },
  or: {
    marginVertical: 12,
    color: "#888",
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#00CEC9",
    paddingVertical: 14,
    paddingHorizontal: tokens.spacing.lg,
    borderRadius: tokens.radius.md,
    width: "100%",
  },
  secondaryText: {
    color: "#00CEC9",
    textAlign: "center",
    fontSize: tokens.fontSize.caption,
    fontWeight: "500",
  },
});
