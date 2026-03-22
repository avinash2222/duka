# User creation — mobile (OTP) vs admin (email)

| Field | Value |
|--------|--------|
| **Doc ID** | AUTH-USER-001 |
| **Related feature** | `docs/features/user-creation/feature.md` (`FEAT-003`) |
| **Status** | Draft |
| **Last updated** | 2026-03-22 |

This document is the **integration reference** for teams wiring **mobile**, **admin-dashboard**, and **backend**. It describes two separate creation paths, constraints, and role rules.

---

## 1) Summary

| Channel | Who creates the user | Identifier | Email | Mobile | Roles created / changed |
|---------|----------------------|------------|-------|--------|-------------------------|
| **Mobile app** | End user (OTP flow) | **Mobile (required)** | **Not allowed** for this flow | Required | **Customer** and/or **Delivery agent** only (see §3) |
| **Admin dashboard** | **Super admin** only (protected) | **Email (required)** for new staff users | Required | **Not required** | Staff-type roles only for **new** users; **existing customer-only** users may be updated under strict rules (see §4) |

---

## 2) Mobile app — customer and delivery agent

### 2.1 Purpose

- Register and create users who will use the **mobile** app as **customer** or **delivery agent**.
- Identity is **phone number + OTP**. **Email must not** be collected or sent on this path.

### 2.2 Constraints

- **No email** on registration or profile creation for this API surface (reject `email` if clients send it).
- User must complete **OTP verification** for the same **mobile number** before the server persists a new user (exact OTP endpoints are specified when the OTP feature is implemented; this doc assumes a verified proof token or step).
- This path is **only** for roles that belong on mobile for MVP: **`CUSTOMER`** and **`DELIVERY_AGENT`** (see `PROJECT-SPEC.md` and RBAC feature doc).

### 2.3 Suggested request flow (high level)

1. Client requests OTP for `phone` (separate endpoint; not fully specified here).
2. User enters OTP; client calls verify endpoint; server returns a **short-lived proof** (e.g. verification id or session) bound to `phone`.
3. Client calls **create user** with `phone`, optional `name`, and intended role (see below), plus the **OTP proof** so the server can trust the number.

### 2.4 Backend API (mobile) — implemented baseline

**`POST /v1/mobile/users`**

- **Auth / trust:** After OTP service exists, require a valid **OTP verification proof** for `phone` (header or body as agreed). Until then, backend may run in a dev-only bypass documented in `Backend` env — **not** for production.
- **Body (JSON):**

| Field | Type | Required | Notes |
|--------|------|----------|--------|
| `phone` | string | Yes | E.164 recommended (e.g. `+9198…`). |
| `name` | string | No | Display name. |
| `intendedRole` | string | No | `CUSTOMER` (default) or `DELIVERY_AGENT`. |

- **Success:** `201 Created` with body shape:

```json
{
  "user": {
    "id": "<cuid>",
    "phone": "+919876543210",
    "name": null,
    "roles": [{ "role": "CUSTOMER" }]
  }
}
```

- **Errors:** JSON `{ "error": { "code": "<STABLE_CODE>", "message": "<human text>" } }` with appropriate HTTP status.
- **Errors (examples):** `400` validation; `409` phone already registered; `403` if OTP proof invalid/expired when enforced.

### 2.5 Mobile client checklist

- [ ] Do not show or require email on sign-up for this flow.
- [ ] Send only `phone` + OTP flow fields per backend contract.
- [ ] Handle `409` (already registered) with a clear message (e.g. sign in instead).
- [ ] After create, follow existing session / `getUserDetails` pattern (`docs/features/role-based-login-and-session/feature.md`).

---

## 3) Roles allowed on the mobile create-user API

- New users created through **`POST /v1/mobile/users`** may receive only:
  - **`CUSTOMER`** (default if `intendedRole` omitted), or
  - **`DELIVERY_AGENT`** if product allows self-serve agent onboarding via mobile; otherwise restrict to **`CUSTOMER`** only until product confirms.

**Open product decision:** Whether **`DELIVERY_AGENT`** can be chosen at self-registration on mobile, or only assigned later by admin. Document the chosen rule in `FEAT-003` when decided.

---

## 4) Admin dashboard — super admin only (later)

### 4.1 Purpose

- Create **staff / operational** accounts used from **admin-dashboard** (not the mobile OTP flow).
- **Super admin** is the only role that may call this API once implemented.

### 4.2 Constraints (new user)

- **Email is required** to create the user.
- **Mobile is not required** for this path.
- New users created here must **not** be given **`CUSTOMER`** or **`DELIVERY_AGENT`** as their **initial** role set for this endpoint (those are mobile-led roles). Use staff roles such as **`SUPER_ADMIN`**, **`STORE_OPERATOR`**, etc., per RBAC docs (`Backend/docs/features/role-based-access/feature.md`).

### 4.3 Existing user — customer only

If a user **already exists** and their **only** role is **`CUSTOMER`**, super admin may **update roles** for that user with this rule:

- The user may be assigned **only** **`CUSTOMER`** or **`DELIVERY_AGENT`** (no staff roles via this particular “promote from customer” path unless a separate product decision allows).

**Purpose:** Allow promoting a shopper to delivery agent (or reverting) without mixing staff provisioning rules.

### 4.4 Admin API (not implemented yet)

- **Route:** To be defined (e.g. `POST /v1/admin/users`).
- **Protection:** Authenticated **super admin** + permission check on server.
- **Body:** At minimum `email`, `name` (optional), `roles[]` for staff creation; separate sub-flow or PATCH for “customer → agent” updates.

Document the final paths and payloads in this file when the admin API is implemented.

### 4.5 Admin-dashboard checklist (when API exists)

- [ ] Only expose UI to **super admin**.
- [ ] Staff create form: email required, mobile optional, no reliance on OTP for creation.
- [ ] Separate UX for “change role of existing customer” vs “invite staff by email”.

---

## 5) Data model (backend)

- **`User`:** optional `phone` and optional `email` (either may be null depending on creation channel); enforce **channel rules** in application logic (mobile create requires `phone`, no `email`; admin staff create requires `email`).
- **`UserRole`:** assign `RoleCode` per row; uniqueness `(userId, role)`.

Exact Prisma schema lives in `Backend/prisma/schema.prisma`.

---

## 6) Security notes

- **Never** trust the client for role assignment without server checks.
- Mobile path: tying **create user** to **OTP verification** is mandatory for production.
- Admin path: **super admin** enforcement on the server, not only UI hiding.

---

## 7) Related documents

- `PROJECT-SPEC.md` — product scope, roles overview.
- `docs/features/user-creation/feature.md` — feature ID, acceptance criteria.
- `Backend/docs/features/role-based-access/feature.md` — role codes and RBAC direction.
