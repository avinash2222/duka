import { ROLES } from '@/auth/rbacConstants';

/**
 * Mock admin auth until backend defines POST /auth/login (see `apiEndpoints.js`).
 * Replace `loginWithEmail` with `apiPost('login', { email })` when the API is ready.
 */

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

/** Known mock profiles (key = normalized email) */
const MOCK_USERS_BY_EMAIL = {
  'superadmin@gmail.com': {
    email: 'superadmin@gmail.com',
    name: 'Super Admin',
    roles: [ROLES.SUPER_ADMIN],
  },
  'super@duka.local': {
    email: 'super@duka.local',
    name: 'Dev Super Admin',
    roles: [ROLES.SUPER_ADMIN],
  },
  'store@duka.local': {
    email: 'store@duka.local',
    name: 'Dev Store Operator',
    roles: [ROLES.STORE_OPERATOR],
  },
  'support@duka.local': {
    email: 'support@duka.local',
    name: 'Dev Support Admin',
    roles: [ROLES.SUPPORT_ADMIN],
  },
};

const MOCK_DELAY_MS = 350;

/**
 * Email-only sign-in (magic-link style UX without backend yet).
 * @returns {Promise<{ data: { accessToken: string, user: object } }>} Axios-shaped response for `LoginPage`.
 */
export async function loginWithEmail(email) {
  const key = normalizeEmail(email);
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));

  const user = MOCK_USERS_BY_EMAIL[key];
  if (!user) {
    const err = new Error(
      'No admin account is registered for this email. Contact your administrator if you need access.'
    );
    err.code = 'MOCK_UNKNOWN_EMAIL';
    throw err;
  }

  const accessToken = `mock.${user.roles[0]?.toLowerCase() ?? 'admin'}.${Date.now()}`;

  return {
    data: {
      accessToken,
      user: {
        email: user.email,
        name: user.name,
        roles: user.roles,
      },
    },
  };
}
