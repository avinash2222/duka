# Feature: User creation (mobile OTP vs admin email)

- Feature ID: `FEAT-003`
- Slug: `user-creation`
- Status: `in-progress`
- Owner: `backend + mobile + admin-dashboard`
- Last Updated: `2026-03-22`

## 1) Business context

DUKA needs a clear split between **mobile-led registration** (phone + OTP, no email) for **customer / delivery agent** users and **admin-led provisioning** (email-based, super admin only) for staff accounts. Integration teams need one reference for constraints while backend and clients roll out in phases.

## 2) Scope

### In scope

- Documented contracts and rules for **mobile** user creation (`docs/authentication/user-creation.md`).
- Backend **`POST /v1/mobile/users`** with validation: phone required, reject email, roles limited to customer/agent per product decision.
- Prisma **`User`** and **`UserRole`** (or equivalent) to persist identity and roles.

### Out of scope (later / separate features)

- **OTP request/verify** endpoints and SMS provider (referenced as prerequisite in auth doc).
- **Admin** `POST /v1/admin/users` (super admin, email required) and role-update APIs.
- JWT/session issuance details (align with `role-based-login-and-session`).

## 3) User roles impacted

- **Customer:** created via mobile path; may later be promoted to delivery agent by super admin per auth doc.
- **Delivery agent:** may be created via mobile (if product allows) or role-updated from customer by super admin.
- **Super admin / store operator:** created via admin path later, not via mobile create-user API.

## 4) Functional requirements

| Req ID | Requirement | Priority |
|--------|-------------|----------|
| REQ-001 | Mobile create-user accepts **phone**; rejects **email** field on this endpoint. | Must |
| REQ-002 | Mobile create-user assigns only **CUSTOMER** and/or **DELIVERY_AGENT** per §3 of `docs/authentication/user-creation.md`. | Must |
| REQ-003 | Duplicate **phone** for mobile registration returns **409** with stable error shape. | Must |
| REQ-004 | When OTP enforcement is enabled, create-user requires valid **OTP proof** for `phone`. | Must (before production) |
| REQ-005 | Admin create-user (future): **email** required, **mobile** optional; **super admin** only; no **CUSTOMER**/**DELIVERY_AGENT** as initial staff provisioning unless product overrides. | Later |
| REQ-006 | Admin role update (future): user with **only CUSTOMER** may be assigned **only CUSTOMER** or **DELIVERY_AGENT**. | Later |

## 5) Acceptance criteria

- [ ] AC-001: `docs/authentication/user-creation.md` exists and is linked from this feature doc.
- [ ] AC-002: Mobile integration can call **`POST /v1/mobile/users`** per documented body and error behavior.
- [ ] AC-003: Server persists user with **phone** and intended mobile role(s); **email** not stored from this endpoint.
- [ ] AC-004: OTP verification is enforced or explicitly bypassed only in non-prod per env flag (documented).
- [ ] AC-005: Admin-dashboard and admin API work tracked in this doc when implemented (REQ-005/006).

## 6) UX notes

- Mobile: no email field on sign-up; keep copy short (English + Hindi per product).
- Admin: staff invite by email when that flow ships.

## 7) Data and integration notes

**Canonical API and role rules:** `docs/authentication/user-creation.md`.

## 8) Risks and fallback

- **Risk:** OTP bypass in dev leaks to production.
- **Fallback:** Environment-gated bypass + checklist before deploy.

## 9) Open questions

- Is **DELIVERY_AGENT** self-registration on mobile allowed at MVP, or admin-only assignment?
- Exact JSON response shape for `201` (align mobile app with backend).
