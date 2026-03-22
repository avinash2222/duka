import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import {
  getRolesFromUser,
  getEffectivePermissions,
  canAccessAdminDashboard,
  hasRole,
  hasAnyRole,
  hasPermission,
  hasAnyPermission,
  canSeeNavItem,
} from './access';

const AuthContext = createContext(null);

const USER_KEY = 'userData';
const TOKEN_KEY = 'authToken';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = sessionStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY));

  const isAuthenticated = Boolean(token);

  const roles = useMemo(() => getRolesFromUser(user), [user]);
  const effectivePermissions = useMemo(
    () => getEffectivePermissions(user, roles),
    [user, roles]
  );
  const canAccessAdminDashboardFlag = useMemo(
    () => canAccessAdminDashboard(roles, user, effectivePermissions),
    [roles, user, effectivePermissions]
  );

  const login = useCallback(({ accessToken, user: nextUser }) => {
    if (accessToken) {
      sessionStorage.setItem(TOKEN_KEY, accessToken);
      setToken(accessToken);
    }
    if (nextUser) {
      sessionStorage.setItem(USER_KEY, JSON.stringify(nextUser));
      setUser(nextUser);
    }
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const checkRole = useCallback((roleCode) => hasRole(roles, roleCode), [roles]);
  const checkAnyRole = useCallback((codes) => hasAnyRole(roles, codes), [roles]);
  const checkPermission = useCallback(
    (perm) => hasPermission(effectivePermissions, perm),
    [effectivePermissions]
  );
  const checkAnyPermission = useCallback(
    (perms) => hasAnyPermission(effectivePermissions, perms),
    [effectivePermissions]
  );
  const checkNav = useCallback(
    (spec) => canSeeNavItem(roles, effectivePermissions, spec),
    [roles, effectivePermissions]
  );

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      roles,
      effectivePermissions,
      canAccessAdminDashboard: canAccessAdminDashboardFlag,
      login,
      logout,
      hasRole: checkRole,
      hasAnyRole: checkAnyRole,
      hasPermission: checkPermission,
      hasAnyPermission: checkAnyPermission,
      canSeeNavItem: checkNav,
    }),
    [
      user,
      token,
      isAuthenticated,
      roles,
      effectivePermissions,
      canAccessAdminDashboardFlag,
      login,
      logout,
      checkRole,
      checkAnyRole,
      checkPermission,
      checkAnyPermission,
      checkNav,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
