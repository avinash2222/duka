import { UserRole } from "../features/auth/types";

type RoleUiConfig = {
  label: string;
  dashboardTitle: string;
  dashboardSubtitle: string;
};

export const ROLE_UI_CONFIG: Record<UserRole, RoleUiConfig> = {
  customer: {
    label: "Customer",
    dashboardTitle: "Customer Dashboard",
    dashboardSubtitle: "Browse products and place same-day orders.",
  },
  agent: {
    label: "Delivery Agent",
    dashboardTitle: "Agent Dashboard",
    dashboardSubtitle: "View assigned deliveries and mark status updates.",
  },
};
