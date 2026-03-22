import {
  HomeRounded as HomeRoundedIcon,
  Layers as LayersIcon,
  Description as DescriptionIcon,
  PersonOutline as PersonOutlineIcon,
  HomeWork as HomeWorkIcon,
  Storefront as StorefrontIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { ROLES, PERMISSIONS } from '@/auth/rbacConstants';
import { navigationLabels, routes } from '@/content/appContent';

/**
 * Sidebar order and labels align with DUKA admin IA; gates follow FEAT-RBAC-001.
 */
export const adminNavItems = [
  {
    label: navigationLabels.dashboard,
    path: routes.home,
    icon: HomeRoundedIcon,
    anyOfPermissions: [PERMISSIONS.ADMIN_DASHBOARD_VIEW],
  },
  {
    label: navigationLabels.catalog,
    path: routes.catalog,
    icon: LayersIcon,
    anyOfRoles: [ROLES.SUPER_ADMIN, ROLES.STORE_OPERATOR, ROLES.VENDOR],
    anyOfPermissions: [PERMISSIONS.ITEM_VIEW, PERMISSIONS.ITEM_UPDATE, PERMISSIONS.ITEM_CREATE],
  },
  {
    label: navigationLabels.orders,
    path: routes.orders,
    icon: DescriptionIcon,
    anyOfRoles: [ROLES.SUPER_ADMIN, ROLES.STORE_OPERATOR, ROLES.SUPPORT_ADMIN, ROLES.VENDOR],
    anyOfPermissions: [PERMISSIONS.ORDER_VIEW, PERMISSIONS.ORDER_UPDATE_STATUS],
  },
  {
    label: navigationLabels.customers,
    path: routes.customers,
    icon: PersonOutlineIcon,
    anyOfRoles: [ROLES.SUPER_ADMIN],
    anyOfPermissions: [PERMISSIONS.USER_MANAGE],
  },
  {
    label: navigationLabels.deliveryAgents,
    path: routes.deliveryAgents,
    icon: HomeWorkIcon,
    anyOfRoles: [ROLES.SUPER_ADMIN, ROLES.STORE_OPERATOR, ROLES.SUPPORT_ADMIN],
    anyOfPermissions: [PERMISSIONS.ADMIN_DASHBOARD_VIEW],
  },
  {
    label: navigationLabels.vendors,
    path: routes.vendors,
    icon: StorefrontIcon,
    anyOfRoles: [ROLES.SUPER_ADMIN, ROLES.STORE_OPERATOR, ROLES.SUPPORT_ADMIN, ROLES.VENDOR],
    anyOfPermissions: [PERMISSIONS.ADMIN_DASHBOARD_VIEW],
  },
  {
    label: navigationLabels.settings,
    path: routes.settings,
    icon: SettingsIcon,
    anyOfPermissions: [PERMISSIONS.SETTINGS_MANAGE],
  },
];
