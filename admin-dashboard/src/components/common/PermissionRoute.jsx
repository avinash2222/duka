import { useAuth } from '@/auth/AuthContext';
import { canSeeNavItem } from '@/auth/access';
import AccessForbidden from './AccessForbidden';

/**
 * Route-level gate: roles and/or permissions (union). SUPER_ADMIN / '*' already in effectivePermissions.
 */
export default function PermissionRoute({ children, anyOfRoles = [], anyOfPermissions = [] }) {
  const { roles, effectivePermissions } = useAuth();

  const allowed = canSeeNavItem(roles, effectivePermissions, { anyOfRoles, anyOfPermissions });

  if (!allowed) {
    return <AccessForbidden />;
  }

  return children;
}
