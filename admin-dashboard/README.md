# DUKA admin dashboard

Web admin shell for DUKA operations (catalog, users, orders, configuration). Bootstrapped from patterns in `vendorselection-frontend` (ClinAi), but **without** AG Grid Enterprise or AG Charts — tables use **MUI X Data Grid** (MIT) and charts use **Recharts**.

## Stack

- Vite 6, React 19, React Router 7  
- MUI 7, Emotion  
- Axios + axios-retry (same client pattern as the source repo)  
- notistack  
- `@mui/x-data-grid`, `recharts`  
- **Theme:** light palette in `src/theme/palette.js` matches **DUKA mobile** (`mobile-app/src/theme/tokens.ts`); **dark** mode is admin-only in `src/theme/themes.js`. Toggle in the app bar (persisted in `localStorage`). Cursor rules for this app live in `admin-dashboard/.cursor/rules/`.

## Setup

```bash
cd admin-dashboard
npm install
cp .env.example .env
# edit VITE_API_BASE_URL to point at DUKA Backend
npm run dev
```

- **Login:** expects `POST /auth/login` returning `{ accessToken, user }` (adjust `LoginPage.jsx` and `apiEndpoints.js` to match your API). The `user` object should carry **`roles`** (array of codes like `SUPER_ADMIN`) and/or **`permissions`** (dotted strings). See `Backend/docs/features/role-based-access/feature.md`.  
- **Dev sign-in:** personas for **Super Admin**, **Store Operator**, **Support Admin**. **Customer** and **delivery agents** use the mobile app, not admin. Legacy `role_name: "admin"` maps to Super Admin.

## What was brought over from `vendorselection-frontend`

- Theme palette and MUI theme definitions (`src/theme/`)  
- Axios interceptor + named `apiGet` / `apiPost` helpers (`src/auth/interceptor.js`, `src/api/`)  
- UI building blocks: `MetricCard`, `SectionHeader`, `GradientHeaderBar`, `ChartStateMessage`, `LoadingSpinner`, `NotificationProvider` (notistack)  
- New/simplified: `ModalDialog`, `ConfirmationDialog`, `ErrorBoundary`, `ProtectedRoute`, `AdminAccessGuard`, `PermissionRoute`, `AuthContext` (roles + effective permissions), `ThemeMode` (no MobX), admin `AdminLayout`  
- **RBAC (UI):** `src/auth/rbacConstants.js`, `src/auth/access.js`, `src/config/navigation.js` — sidebar and routes filter by role/permission; API must still enforce access.  

## What was intentionally omitted

- `ag-grid-*`, `ag-charts-*`, Toolpad layout, MobX stores, and all RFP/vendor-specific screens (DUKA uses lightweight RBAC in `src/auth/` instead)  
- Copy those feature folders only when a DUKA feature doc requires them; replace any grid/chart usage with `AppDataGrid` and `src/components/charts/`.

## Scripts

| Command        | Description        |
|----------------|--------------------|
| `npm run dev`  | Vite dev server    |
| `npm run build`| Production build   |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint             |

## Repo note

`PROJECT-SPEC.md` refers to this app as **`admin-frontend/`**. This folder is named **`admin-dashboard`** as requested; align naming in docs if you standardize on one folder name.
