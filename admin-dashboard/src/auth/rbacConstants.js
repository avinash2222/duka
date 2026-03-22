/**
 * Aligns with Backend/docs/features/role-based-access/feature.md (FEAT-RBAC-001).
 * Backend remains source of truth; this file is for stable codes in the UI.
 */

export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  STORE_OPERATOR: 'STORE_OPERATOR',
  DELIVERY_AGENT: 'DELIVERY_AGENT',
  CUSTOMER: 'CUSTOMER',
  VENDOR: 'VENDOR',
  SUPPORT_ADMIN: 'SUPPORT_ADMIN',
};

/** Permissions: lowercase dotted strings; SUPER_ADMIN uses '*' in effective set */
export const PERMISSIONS = {
  ADMIN_DASHBOARD_VIEW: 'admin.dashboard.view',
  ITEM_VIEW: 'item.view',
  ITEM_CREATE: 'item.create',
  ITEM_UPDATE: 'item.update',
  ORDER_VIEW: 'order.view',
  ORDER_UPDATE_STATUS: 'order.update_status',
  USER_MANAGE: 'user.manage',
  SETTINGS_MANAGE: 'settings.manage',
};

/**
 * Roles that may use the admin web app (FEAT-RBAC-001).
 * CUSTOMER and DELIVERY_AGENT are excluded (mobile app only for those roles).
 */
export const ADMIN_ELIGIBLE_ROLES = [
  ROLES.SUPER_ADMIN,
  ROLES.STORE_OPERATOR,
  ROLES.VENDOR,
  ROLES.SUPPORT_ADMIN,
];

/**
 * When API returns roles but not yet a flat `permissions` array, infer minimal UI access.
 * Replace with API-driven permissions when backend implements FEAT-RBAC-001.
 */
export const INFERRED_PERMISSIONS_BY_ROLE = {
  [ROLES.SUPER_ADMIN]: ['*'],
  [ROLES.STORE_OPERATOR]: [
    PERMISSIONS.ADMIN_DASHBOARD_VIEW,
    PERMISSIONS.ITEM_VIEW,
    PERMISSIONS.ITEM_CREATE,
    PERMISSIONS.ITEM_UPDATE,
    PERMISSIONS.ORDER_VIEW,
    PERMISSIONS.ORDER_UPDATE_STATUS,
  ],
  [ROLES.SUPPORT_ADMIN]: [
    PERMISSIONS.ADMIN_DASHBOARD_VIEW,
    PERMISSIONS.ORDER_VIEW,
    PERMISSIONS.ORDER_UPDATE_STATUS,
  ],
  [ROLES.VENDOR]: [
    PERMISSIONS.ADMIN_DASHBOARD_VIEW,
    PERMISSIONS.ITEM_VIEW,
    PERMISSIONS.ORDER_VIEW,
  ],
};
