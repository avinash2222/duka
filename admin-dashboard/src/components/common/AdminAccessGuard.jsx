import { useAuth } from '@/auth/AuthContext';
import AccessForbidden from './AccessForbidden';

/**
 * After authentication: blocks users who only have CUSTOMER (or no admin-eligible role).
 */
export default function AdminAccessGuard({ children }) {
  const { isAuthenticated, canAccessAdminDashboard } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  if (!canAccessAdminDashboard) {
    return <AccessForbidden />;
  }

  return children;
}
