import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Inventory2 as InventoryIcon,
  LocalShipping as LocalShippingIcon,
} from '@mui/icons-material';
import { ROLES, PERMISSIONS } from '@/auth/rbacConstants';

/**
 * Sidebar items: gates match FEAT-RBAC-001 (delivery agents use mobile only).
 */
export const adminNavItems = [
  {
    label: 'Dashboard',
    path: '/',
    icon: DashboardIcon,
    anyOfPermissions: [PERMISSIONS.ADMIN_DASHBOARD_VIEW],
  },
  {
    label: 'Orders',
    path: '/orders',
    icon: LocalShippingIcon,
    anyOfRoles: [ROLES.SUPER_ADMIN, ROLES.STORE_OPERATOR, ROLES.SUPPORT_ADMIN, ROLES.VENDOR],
    anyOfPermissions: [PERMISSIONS.ORDER_VIEW, PERMISSIONS.ORDER_UPDATE_STATUS],
  },
  {
    label: 'Catalog',
    path: '/catalog',
    icon: InventoryIcon,
    anyOfRoles: [ROLES.SUPER_ADMIN, ROLES.STORE_OPERATOR, ROLES.VENDOR],
    anyOfPermissions: [PERMISSIONS.ITEM_VIEW, PERMISSIONS.ITEM_UPDATE, PERMISSIONS.ITEM_CREATE],
  },
  {
    label: 'Users',
    path: '/users',
    icon: PeopleIcon,
    anyOfRoles: [ROLES.SUPER_ADMIN],
    anyOfPermissions: [PERMISSIONS.USER_MANAGE],
  },
];
