import { Pressable, StyleSheet, Text, View } from "react-native";
import { tokens } from "@theme/tokens";
import { UserRole } from "../features/auth/types";
import { ROLE_UI_CONFIG } from "../config/roleConfig";

type RoleSelectorCardProps = {
  roles: UserRole[];
  onSelectRole: (role: UserRole) => void;
};

export function RoleSelectorCard({ roles, onSelectRole }: RoleSelectorCardProps) {
  return (
    <View style={styles.container}>
      {roles.map((role) => (
        <Pressable
          key={role}
          style={({ pressed }) => [styles.roleButton, pressed && styles.roleButtonPressed]}
          onPress={() => onSelectRole(role)}
        >
          <Text style={styles.roleLabel}>{ROLE_UI_CONFIG[role].label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: tokens.spacing.sm,
  },
  roleButton: {
    backgroundColor: tokens.colors.surfaceAlt,
    borderColor: tokens.colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    paddingVertical: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.md,
  },
  roleButtonPressed: {
    opacity: 0.85,
  },
  roleLabel: {
    color: tokens.colors.textPrimary,
    fontWeight: tokens.fontWeight.semibold,
    fontSize: tokens.fontSize.body,
    textAlign: "center",
  },
});
