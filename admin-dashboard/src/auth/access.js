import {
  ROLES,
  ADMIN_ELIGIBLE_ROLES,
  INFERRED_PERMISSIONS_BY_ROLE,
} from './rbacConstants';

const ADMIN_ELIGIBLE_SET = new Set(ADMIN_ELIGIBLE_ROLES);

/** Map legacy / human labels to canonical codes from rbacConstants */
const LEGACY_ROLE_MAP = {
  ADMIN: ROLES.SUPER_ADMIN,
  SUPERADMIN: ROLES.SUPER_ADMIN,
};

function normRole(code) {
  return String(code || '')
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '_');
}

function resolveRoleCode(normalized) {
  return LEGACY_ROLE_MAP[normalized] || normalized;
}

function normPermission(p) {
  return String(p || '')
    .trim()
    .toLowerCase();
}

/**
 * Extract role codes from common API shapes: role, role_name, roles[].
 */
export function getRolesFromUser(user) {
  if (!user || typeof user !== 'object') return [];
  const out = new Set();

  const push = (v) => {
    const n = resolveRoleCode(normRole(v));
    if (n) out.add(n);
  };

  if (user.role) push(user.role);
  if (user.role_name) push(user.role_name);
  if (user.roleCode) push(user.roleCode);

  if (Array.isArray(user.roles)) {
    user.roles.forEach((r) => {
      if (typeof r === 'string' || typeof r === 'number') push(r);
      else if (r && typeof r === 'object') {
        if (r.code) push(r.code);
        if (r.role) push(r.role);
        if (r.name) push(r.name);
      }
    });
  }

  return [...out];
}

/**
 * Extract permissions from user.permissions or role objects.
 */
export function getExplicitPermissionsFromUser(user) {
  if (!user || typeof user !== 'object') return [];
  const out = new Set();

  const add = (p) => {
    const n = normPermission(p);
    if (n) out.add(n);
  };

  if (Array.isArray(user.permissions)) user.permissions.forEach(add);

  if (Array.isArray(user.roles)) {
    user.roles.forEach((r) => {
      if (r && typeof r === 'object' && Array.isArray(r.permissions)) {
        r.permissions.forEach(add);
      }
    });
  }

  return [...out];
}

/**
 * Union of explicit permissions plus inferred-by-role when explicit list is empty.
 */
export function getEffectivePermissions(user, roles) {
  const explicit = getExplicitPermissionsFromUser(user);
  if (explicit.length > 0) {
    const set = new Set(explicit);
    roles.forEach((role) => {
      if (normRole(role) === ROLES.SUPER_ADMIN) set.add('*');
    });
    return [...set];
  }

  const inferred = new Set();
  roles.forEach((role) => {
    const key = normRole(role);
    const list = INFERRED_PERMISSIONS_BY_ROLE[key];
    if (list) list.forEach((p) => inferred.add(normPermission(p)));
  });
  return [...inferred];
}

export function hasAnyAdminEligibleRole(roles) {
  return roles.some((r) => ADMIN_ELIGIBLE_SET.has(normRole(r)));
}

const ADMIN_ACCESS_PERMISSION_HINTS = new Set([
  'admin.access',
  'admin.dashboard.view',
  'user.manage',
]);

/**
 * True if this user may use the admin web app.
 * Blocks pure CUSTOMER. Allows admin-eligible roles, or explicit admin-ish permissions when roles are omitted by API.
 */
export function canAccessAdminDashboard(roles, user = null, effectivePermissions = []) {
  const normalized = roles.map(normRole);

  const onlyCustomer =
    normalized.length > 0 && normalized.every((r) => r === ROLES.CUSTOMER);
  if (onlyCustomer) return false;

  if (hasAnyAdminEligibleRole(normalized)) return true;

  if (
    effectivePermissions.some((p) => {
      const n = normPermission(p);
      return n === '*' || ADMIN_ACCESS_PERMISSION_HINTS.has(n);
    })
  ) {
    return true;
  }

  if (user?.adminDashboardAccess === true) return true;

  return false;
}

export function hasRole(roles, roleCode) {
  const want = normRole(roleCode);
  return roles.some((r) => normRole(r) === want);
}

export function hasAnyRole(roles, roleCodes) {
  const set = new Set(roleCodes.map(normRole));
  return roles.some((r) => set.has(normRole(r)));
}

export function hasPermission(effectivePermissions, permission) {
  const want = normPermission(permission);
  if (!want) return false;
  if (effectivePermissions.some((p) => normPermission(p) === '*')) return true;
  return effectivePermissions.some((p) => normPermission(p) === want);
}

export function hasAnyPermission(effectivePermissions, permissions) {
  return permissions.some((p) => hasPermission(effectivePermissions, p));
}

/**
 * Nav / route gate: allow if any role matches, or any permission matches, or SUPER_ADMIN effective '*'.
 */
export function canSeeNavItem(roles, effectivePermissions, { anyOfRoles = [], anyOfPermissions = [] }) {
  if (anyOfRoles.length && hasAnyRole(roles, anyOfRoles)) return true;
  if (anyOfPermissions.length && hasAnyPermission(effectivePermissions, anyOfPermissions)) return true;
  return false;
}
