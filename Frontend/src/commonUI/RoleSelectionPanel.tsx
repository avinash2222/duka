import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { DukaLogo } from "@common/DukaLogo";
import { tokens } from "@theme/tokens";
import { UserRole } from "../features/auth/types";

type RoleSelectionPanelProps = {
  roles: UserRole[];
  title: string;
  subtitle: string;
  footerNote: string;
  onSelectRole: (role: UserRole) => void;
};

const ROLE_STYLES: Record<UserRole, { icon: keyof typeof MaterialCommunityIcons.glyphMap; backgroundColor: string }> = {
  customer: { icon: "cart-outline", backgroundColor: "#5b5cf0" },
  agent: { icon: "truck-fast-outline", backgroundColor: "#3a78ff" },
  admin: { icon: "cog-outline", backgroundColor: "#11b5d9" },
};

const ROLE_LABEL: Record<UserRole, string> = {
  customer: "Customer / ग्राहक",
  agent: "Delivery / डिलीवरी",
  admin: "Admin / एडमिन",
};

export function RoleSelectionPanel({
  roles,
  title,
  subtitle,
  footerNote,
  onSelectRole,
}: RoleSelectionPanelProps) {
  return (
    <View style={styles.container}>
      <View style={styles.logoWrap}>
        <DukaLogo width={120} height={120} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      <View style={styles.rolesWrap}>
        {roles.map((role) => (
          <Pressable
            key={role}
            onPress={() => onSelectRole(role)}
            style={({ pressed }) => [
              styles.roleButton,
              { backgroundColor: ROLE_STYLES[role].backgroundColor },
              pressed && styles.roleButtonPressed,
            ]}
          >
            <MaterialCommunityIcons
              name={ROLE_STYLES[role].icon}
              size={26}
              color={tokens.colors.white}
            />
            <Text style={styles.roleText}>{ROLE_LABEL[role]}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.footerNote}>{footerNote}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: tokens.spacing.lg,
    paddingBottom: tokens.spacing.lg,
  },
  logoWrap: {
    alignItems: "center",
    marginBottom: tokens.spacing.md,
  },
  title: {
    textAlign: "center",
    color: tokens.colors.textPrimary,
    fontSize: tokens.fontSize.title,
    fontWeight: tokens.fontWeight.bold,
  },
  subtitle: {
    marginTop: tokens.spacing.xs,
    textAlign: "center",
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.body,
    fontWeight: tokens.fontWeight.semibold,
  },
  rolesWrap: {
    marginTop: tokens.spacing.xl,
    gap: tokens.spacing.md,
  },
  roleButton: {
    borderRadius: tokens.radius.lg,
    paddingVertical: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacing.sm,
    ...tokens.elevation.button,
  },
  roleButtonPressed: {
    opacity: 0.9,
  },
  roleText: {
    color: tokens.colors.white,
    fontSize: tokens.fontSize.body,
    fontWeight: tokens.fontWeight.bold,
  },
  footerNote: {
    marginTop: tokens.spacing.xl,
    textAlign: "center",
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.caption,
    fontWeight: tokens.fontWeight.semibold,
  },
});
