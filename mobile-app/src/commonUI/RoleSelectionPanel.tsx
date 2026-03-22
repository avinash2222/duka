import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { PrimaryButton } from "@common/PrimaryButton";
import { DukaLogo } from "@common/DukaLogo";
import { tokens } from "@theme/tokens";
import { StyleSheet, Text, View } from "react-native";
import { UserRole } from "../features/auth/types";

type RoleSelectionPanelProps = {
  roles: UserRole[];
  title: string;
  subtitle: string;
  footerNote: string;
  onSelectRole: (role: UserRole) => void;
};

const ROLE_ICONS: Record<UserRole, keyof typeof MaterialCommunityIcons.glyphMap> = {
  customer: "cart-outline",
  agent: "truck-fast-outline",
};

const ROLE_LABEL: Record<UserRole, string> = {
  customer: "Customer / ग्राहक",
  agent: "Delivery / डिलीवरी",
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
        {roles.map((role) => {
          const { fill, pressed } = tokens.colors.roleSelect[role];
          return (
            <PrimaryButton
              key={role}
              label={ROLE_LABEL[role]}
              onPress={() => onSelectRole(role)}
              backgroundColor={fill}
              pressedBackgroundColor={pressed}
              leadingSlot={
                <MaterialCommunityIcons name={ROLE_ICONS[role]} size={22} color={tokens.colors.white} />
              }
            />
          );
        })}
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
    backgroundColor: tokens.colors.background,
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
  footerNote: {
    marginTop: tokens.spacing.xl,
    textAlign: "center",
    color: tokens.colors.textSecondary,
    fontSize: tokens.fontSize.caption,
    fontWeight: tokens.fontWeight.semibold,
  },
});
