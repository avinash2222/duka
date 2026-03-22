/**
 * User-facing copy for the admin app. Keep codes in @/auth/rbacConstants.
 */
import { ROLES } from '@/auth/rbacConstants';

export const routes = {
  home: '/',
  login: '/login',
  forgotPassword: '/forgot-password',
  catalog: '/catalog',
  orders: '/orders',
  customers: '/customers',
  deliveryAgents: '/delivery-agents',
  vendors: '/vendors',
  settings: '/settings',
};

export const roleDisplayLabels = {
  [ROLES.SUPER_ADMIN]: 'Super Admin',
  [ROLES.STORE_OPERATOR]: 'Store Operator',
  [ROLES.DELIVERY_AGENT]: 'Delivery agent',
  [ROLES.CUSTOMER]: 'Customer',
  [ROLES.VENDOR]: 'Vendor',
  [ROLES.SUPPORT_ADMIN]: 'Support Admin',
};

/** Dev-only sign-in shortcuts (import.meta.env.DEV); roles from rbacConstants */
export const devLoginPersonas = [
  {
    roleCode: ROLES.SUPER_ADMIN,
    name: 'Avinash',
    email: 'avinash.superadmin@gmail.com',
  },
  {
    roleCode: ROLES.SUPER_ADMIN,
    name: 'Dev Super Admin',
    email: 'super@duka.local',
  },
  {
    roleCode: ROLES.STORE_OPERATOR,
    name: 'Dev Store Operator',
    email: 'store@duka.local',
  },
  {
    roleCode: ROLES.SUPPORT_ADMIN,
    name: 'Dev Support Admin',
    email: 'support@duka.local',
  },
];

export const loginContent = {
  title: 'Admin',
  subtitle: 'Sign in to the admin dashboard.',
  emailOnlySubtitle: 'Sign in with your admin email. (Mock sign-in until the API is live.)',
  emailLabel: 'Email',
  signIn: 'Sign In',
  signingIn: 'Signing in…',
  forgotPassword: 'Forgot password?',
  errors: {
    noToken: 'Invalid response: no access token',
    signInFailed: 'Sign-in failed. Try again or use a registered admin email.',
  },
  dev: {
    sectionTitle: 'Admin Roles:',
  },
};

export const forgotPasswordContent = {
  title: 'Forgot password',
  body:
    'Password reset will be available when the DUKA Backend exposes the flow. Contact your administrator if you need access now.',
  backToSignIn: 'Back to sign in',
};

export const accessForbiddenContent = {
  title: 'Access forbidden',
  customerOnly:
    'Customer accounts use the DUKA mobile app. This admin site is for operations staff.',
  generic: 'You do not have permission to access this page.',
  goBack: 'Go back',
  dashboard: 'Dashboard',
};

export const navigationLabels = {
  dashboard: 'Dashboard',
  catalog: 'Catalog',
  orders: 'Orders',
  customers: 'Customers',
  deliveryAgents: 'Delivery Agents',
  vendors: 'Vendors',
  settings: 'Settings',
};

export const layoutContent = {
  drawerTitle: 'Admin',
  appBarTitle: 'Operations',
  logOut: 'Log out',
  themeToDark: 'Switch to dark mode',
  themeToLight: 'Switch to light mode',
};
