/**
 * Product name in UI and i18n. Mirror the same string in `app.json` → `expo.name` (JSON cannot import this file).
 */
export const APP_DISPLAY_NAME = "DUKA";

export const LOGIN_SCREEN_STEPS = {
  HYDRATING: "hydrating",
  SERVICEABILITY_LOADING: "serviceability_loading",
  ROLE_SELECTION: "role_selection",
  ROLE_HOME: "role_home",
  SERVICEABILITY_PERMISSION: "serviceability_permission",
  SERVICEABILITY_OUTSIDE: "serviceability_outside",
  LOGIN_FORM: "login_form",
} as const;

export const LOGIN_SCREEN_COMPONENTS = {
  HYDRATION_VIEW: "hydration_view",
  SERVICEABILITY_LOADER: "serviceability_loader",
  ROLE_SELECTION_VIEW: "role_selection_view",
  ROLE_HOME_VIEW: "role_home_view",
  SERVICEABILITY_PERMISSION_VIEW: "serviceability_permission_view",
  SERVICEABILITY_OUTSIDE_VIEW: "serviceability_outside_view",
  LOGIN_FORM_VIEW: "login_form_view",
} as const;

export type LoginScreenStep = (typeof LOGIN_SCREEN_STEPS)[keyof typeof LOGIN_SCREEN_STEPS];
export type LoginScreenComponent =
  (typeof LOGIN_SCREEN_COMPONENTS)[keyof typeof LOGIN_SCREEN_COMPONENTS];
