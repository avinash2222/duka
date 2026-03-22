/**
 * Named API routes for apiGet / apiPost only (no PUT/PATCH/DELETE in this app).
 * Extend as DUKA Backend endpoints are defined.
 */
export const GET_API_URLS = {
  health: '/health',
  me: '/auth/me',
};

export const POST_API_URLS = {
  login: '/auth/login',
};
