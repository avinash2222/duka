import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";
import { appConfig } from "../../config/appConfig";
import { getUserDetails } from "./api";
import { AuthSession, UserRole } from "./types";

type AuthStore = {
  session: AuthSession | null;
  availableRoles: UserRole[];
  hasHydrated: boolean;
  isLoadingUserDetails: boolean;
  errorMessage: string | null;
  setHasHydrated: (value: boolean) => void;
  loginWithMobile: (phone: string) => Promise<void>;
  selectRoleAndProceed: (role: UserRole) => void;
  logout: () => void;
};

const TOKEN_VALIDITY_MS = appConfig.auth.tokenValidityDays * 24 * 60 * 60 * 1000;

function isSessionValid(session: AuthSession | null): boolean {
  if (!session) {
    return false;
  }

  return Date.now() < session.expiresAt;
}

function isUserRole(value: string): value is UserRole {
  return value === "customer" || value === "agent";
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      session: null,
      availableRoles: [],
      hasHydrated: false,
      isLoadingUserDetails: false,
      errorMessage: null,
      setHasHydrated(value) {
        set({ hasHydrated: value });
      },
      async loginWithMobile(phone: string) {
        const currentSession = get().session;
        if (isSessionValid(currentSession) && currentSession?.user.phone === phone) {
          return;
        }

        set({ isLoadingUserDetails: true, errorMessage: null });

        try {
          const response = await getUserDetails(phone);
          const apiRoles = response.roles.filter(isUserRole);
          const normalizedRoles: UserRole[] =
            apiRoles.length > 0 ? apiRoles : (["customer"] as UserRole[]);
          const firstRole: UserRole = normalizedRoles[0] ?? "customer";
          const hasSingleRole = normalizedRoles.length === 1;

          set({
            session: {
              token: response.token,
              user: response.user,
              roles: hasSingleRole ? [firstRole] : normalizedRoles,
              activeRole: firstRole,
              expiresAt: Date.now() + TOKEN_VALIDITY_MS,
            },
            availableRoles: hasSingleRole ? [] : normalizedRoles,
            isLoadingUserDetails: false,
            errorMessage: null,
          });
        } catch {
          set({
            isLoadingUserDetails: false,
            errorMessage: "Unable to load user details. Please try again.",
          });
        }
      },
      selectRoleAndProceed(role) {
        const currentSession = get().session;
        if (!currentSession) {
          return;
        }

        set({
          session: {
            ...currentSession,
            activeRole: role,
            roles: [role],
          },
          availableRoles: [],
        });
      },
      logout() {
        set({
          session: null,
          availableRoles: [],
          isLoadingUserDetails: false,
          errorMessage: null,
        });
      },
    }),
    {
      name: "duka-auth-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        session: isSessionValid(state.session) ? state.session : null,
        availableRoles: state.availableRoles,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) {
          return;
        }

        if (!isSessionValid(state.session)) {
          state.logout();
        }

        state.setHasHydrated(true);
      },
    },
  ),
);
