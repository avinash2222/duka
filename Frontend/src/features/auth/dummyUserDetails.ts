import { UserDetailsApiResponse } from "./types";

const DUMMY_USERS: Record<string, UserDetailsApiResponse> = {
  "9999999999": {
    token: "dummy-token-admin-agent",
    user: {
      id: "u-001",
      name: "Ravi Kumar",
      phone: "9999999999",
    },
    roles: ["customer", "agent", "admin"],
  },
  "8888888888": {
    token: "dummy-token-agent",
    user: {
      id: "u-002",
      name: "Sita Devi",
      phone: "8888888888",
    },
    roles: ["customer", "agent"],
  },
  "7777777777": {
    token: "dummy-token-customer",
    user: {
      id: "u-003",
      name: "Aman",
      phone: "7777777777",
    },
    roles: ["customer"],
  },
  "6666666666": {
    token: "dummy-token-agent",
    user: {
      id: "u-004",
      name: "Rajesh",
      phone: "6666666666",
    },
    roles: ["agent"],
  },
};

export function getDummyUserDetails(phone: string): UserDetailsApiResponse {
  const matched = DUMMY_USERS[phone];
  if (matched) {
    return matched;
  }

  return {
    token: `dummy-token-${phone}`,
    user: {
      id: `u-${phone.slice(-4)}`,
      name: "Guest User",
      phone,
    },
    roles: ["customer"],
  };
}
