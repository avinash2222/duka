export type UserRole = "customer" | "agent" | "admin";

export type AuthUser = {
  id: string;
  name: string;
  phone: string;
};

export type UserDetailsApiResponse = {
  token: string;
  user: AuthUser;
  roles: UserRole[];
};

export type AuthSession = {
  token: string;
  user: AuthUser;
  roles: UserRole[];
  activeRole: UserRole;
  expiresAt: number;
};
