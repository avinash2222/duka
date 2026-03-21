import { ServiceabilityResult } from "../../../services/serviceability/serviceabilityService";
import { AuthSession, UserRole } from "../types";
import {
  LOGIN_SCREEN_COMPONENTS,
  LOGIN_SCREEN_STEPS,
  LoginScreenComponent,
  LoginScreenStep,
} from "../../../config/appConstants";

type Params = {
  hasHydrated: boolean;
  isCheckingServiceability: boolean;
  locationBootstrapComplete: boolean;
  serviceability: ServiceabilityResult | null;
  session: AuthSession | null;
  availableRoles: UserRole[];
};

export type LoginScreenDecision = {
  step: LoginScreenStep;
  component: LoginScreenComponent;
  distanceKm?: number;
};

export function decideLoginScreenDecision({
  hasHydrated,
  isCheckingServiceability,
  locationBootstrapComplete,
  serviceability,
  session,
  availableRoles,
}: Params): LoginScreenDecision {
  if (!hasHydrated) {
    return {
      step: LOGIN_SCREEN_STEPS.HYDRATING,
      component: LOGIN_SCREEN_COMPONENTS.HYDRATION_VIEW,
    };
  }

  if (session && availableRoles.length > 0) {
    return {
      step: LOGIN_SCREEN_STEPS.ROLE_SELECTION,
      component: LOGIN_SCREEN_COMPONENTS.ROLE_SELECTION_VIEW,
    };
  }

  if (session) {
    return {
      step: LOGIN_SCREEN_STEPS.ROLE_HOME,
      component: LOGIN_SCREEN_COMPONENTS.ROLE_HOME_VIEW,
    };
  }

  if (!locationBootstrapComplete) {
    return {
      step: LOGIN_SCREEN_STEPS.SERVICEABILITY_LOADING,
      component: LOGIN_SCREEN_COMPONENTS.SERVICEABILITY_LOADER,
    };
  }

  if (isCheckingServiceability) {
    return {
      step: LOGIN_SCREEN_STEPS.SERVICEABILITY_LOADING,
      component: LOGIN_SCREEN_COMPONENTS.SERVICEABILITY_LOADER,
    };
  }

  if (!serviceability || serviceability.status === "error" || serviceability.status === "permission_denied") {
    return {
      step: LOGIN_SCREEN_STEPS.SERVICEABILITY_PERMISSION,
      component: LOGIN_SCREEN_COMPONENTS.SERVICEABILITY_PERMISSION_VIEW,
    };
  }

  if (serviceability.status === "outside_radius") {
    return {
      step: LOGIN_SCREEN_STEPS.SERVICEABILITY_OUTSIDE,
      component: LOGIN_SCREEN_COMPONENTS.SERVICEABILITY_OUTSIDE_VIEW,
      distanceKm: serviceability.distanceKm,
    };
  }

  return {
    step: LOGIN_SCREEN_STEPS.LOGIN_FORM,
    component: LOGIN_SCREEN_COMPONENTS.LOGIN_FORM_VIEW,
  };
}
