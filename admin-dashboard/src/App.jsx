import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import ErrorBoundary from '@common/ErrorBoundary';
import ProtectedRoute from '@common/ProtectedRoute';
import AdminAccessGuard from '@common/AdminAccessGuard';
import PermissionRoute from '@common/PermissionRoute';
import AdminLayout from '@/layouts/AdminLayout';
import LoginPage from '@/pages/LoginPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import DashboardPage from '@/pages/DashboardPage';
import CustomersPage from '@/pages/CustomersPage';
import CatalogPage from '@/pages/CatalogPage';
import OrdersPage from '@/pages/OrdersPage';
import DeliveryAgentsPage from '@/pages/DeliveryAgentsPage';
import VendorsPage from '@/pages/VendorsPage';
import SettingsPage from '@/pages/SettingsPage';
import { ROLES, PERMISSIONS } from '@/auth/rbacConstants';
import { routes } from '@/content/appContent';

const router = createBrowserRouter([
  { path: routes.login, element: <LoginPage /> },
  { path: routes.forgotPassword, element: <ForgotPasswordPage /> },
  {
    path: routes.home,
    element: (
      <ProtectedRoute>
        <AdminAccessGuard>
          <AdminLayout />
        </AdminAccessGuard>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PermissionRoute anyOfPermissions={[PERMISSIONS.ADMIN_DASHBOARD_VIEW]}>
            <DashboardPage />
          </PermissionRoute>
        ),
      },
      {
        path: 'orders',
        element: (
          <PermissionRoute
            anyOfRoles={[ROLES.SUPER_ADMIN, ROLES.STORE_OPERATOR, ROLES.SUPPORT_ADMIN, ROLES.VENDOR]}
            anyOfPermissions={[PERMISSIONS.ORDER_VIEW, PERMISSIONS.ORDER_UPDATE_STATUS]}
          >
            <OrdersPage />
          </PermissionRoute>
        ),
      },
      {
        path: 'catalog',
        element: (
          <PermissionRoute
            anyOfRoles={[ROLES.SUPER_ADMIN, ROLES.STORE_OPERATOR, ROLES.VENDOR]}
            anyOfPermissions={[
              PERMISSIONS.ITEM_VIEW,
              PERMISSIONS.ITEM_UPDATE,
              PERMISSIONS.ITEM_CREATE,
            ]}
          >
            <CatalogPage />
          </PermissionRoute>
        ),
      },
      {
        path: 'users',
        element: <Navigate to={routes.customers} replace />,
      },
      {
        path: 'customers',
        element: (
          <PermissionRoute
            anyOfRoles={[ROLES.SUPER_ADMIN]}
            anyOfPermissions={[PERMISSIONS.USER_MANAGE]}
          >
            <CustomersPage />
          </PermissionRoute>
        ),
      },
      {
        path: 'delivery-agents',
        element: (
          <PermissionRoute
            anyOfRoles={[ROLES.SUPER_ADMIN, ROLES.STORE_OPERATOR, ROLES.SUPPORT_ADMIN]}
            anyOfPermissions={[PERMISSIONS.ADMIN_DASHBOARD_VIEW]}
          >
            <DeliveryAgentsPage />
          </PermissionRoute>
        ),
      },
      {
        path: 'vendors',
        element: (
          <PermissionRoute
            anyOfRoles={[
              ROLES.SUPER_ADMIN,
              ROLES.STORE_OPERATOR,
              ROLES.SUPPORT_ADMIN,
              ROLES.VENDOR,
            ]}
            anyOfPermissions={[PERMISSIONS.ADMIN_DASHBOARD_VIEW]}
          >
            <VendorsPage />
          </PermissionRoute>
        ),
      },
      {
        path: 'settings',
        element: (
          <PermissionRoute anyOfPermissions={[PERMISSIONS.SETTINGS_MANAGE]}>
            <SettingsPage />
          </PermissionRoute>
        ),
      },
    ],
  },
  { path: '*', element: <Navigate to={routes.home} replace /> },
]);

export default function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}
