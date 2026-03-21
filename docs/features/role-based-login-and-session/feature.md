# Feature: Role-Based Login and Session Control

- Feature ID: `FEAT-002`
- Slug: `role-based-login-and-session`
- Status: `in-progress`
- Owner: `frontend + backend`
- Last Updated: `2026-03-21`

## 1) Business context

The same mobile app must support customer, delivery agent, and admin roles with a simple login experience. Role visibility must be controlled centrally and session behavior must be stable for low-friction operations.

## 2) Scope

### In scope
- Fetch user details and roles using `getUserDetails` after mobile login.
- Keep auth session in memory and reuse it until token expiry (30 days).
- Show role selection only when multiple roles are returned.
- Lock session to a single selected role until logout.
- Provide configurable role metadata to control role-specific UI text.

### Out of scope
- Backend RBAC policy engine and permission matrix.
- Persistent auth storage across app restarts.
- Final dashboard implementation for each role (placeholder only for now).

## 3) User roles impacted

- Customer: login and customer-mode session.
- Delivery agent: login and agent-mode session.
- Admin: login and admin-mode session.
- Other future role(s): configurable through role config mapping.

## 4) Functional requirements

| Req ID | Requirement | Priority |
|---|---|---|
| REQ-001 | App calls `getUserDetails` on fresh valid mobile login. | Must |
| REQ-002 | App skips `getUserDetails` while in-memory token is not expired. | Must |
| REQ-003 | App stores session data in memory and clears on logout. | Must |
| REQ-004 | If multiple roles are returned, app asks user to choose one role for current session. | Must |
| REQ-005 | After role selection, session keeps only selected role until logout/login. | Must |
| REQ-006 | Role labels and dashboard messaging are configurable from one role config file. | Must |

## 5) Acceptance criteria

- [ ] AC-001: Fresh login with valid mobile triggers `getUserDetails`.
- [ ] AC-002: Repeat login for same user within token validity does not call `getUserDetails` again.
- [ ] AC-003: Multi-role users see role picker and can proceed with one role.
- [ ] AC-004: Selected session role remains single-role until logout.
- [ ] AC-005: Logout clears session and forces fresh login flow.

## 6) UX notes

Keep role selection very simple: one tap per role option, no advanced settings, no nested steps.

## 7) Data and integration notes (high level)

Expected response shape:
- token
- user: id, name, phone
- roles: list of allowed roles
- activeRole selected in app after role pick

## 8) Risks and fallback

- Risk: backend may return unknown role values.
- Fallback: default to customer role and prompt retry.

## 9) Open questions

- Should token/session survive app restart in phase-2?
- Should role-switch be allowed without logout in future?
