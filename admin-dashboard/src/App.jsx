import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import AdminAccessGuard from '@/components/common/AdminAccessGuard';
import PermissionRoute from '@/components/common/PermissionRoute';
import AdminLayout from '@/layouts/AdminLayout';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import UsersPage from '@/pages/UsersPage';
import CatalogPage from '@/pages/CatalogPage';
import OrdersPage from '@/pages/OrdersPage';
import { ROLES, PERMISSIONS } from '@/auth/rbacConstants';

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
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
        element: (
          <PermissionRoute
            anyOfRoles={[ROLES.SUPER_ADMIN]}
            anyOfPermissions={[PERMISSIONS.USER_MANAGE]}
          >
            <UsersPage />
          </PermissionRoute>
        ),
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);

export default function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}
