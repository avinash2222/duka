# Role-based access (DUKA)

| Field | Value |
|--------|--------|
| **ID** | FEAT-RBAC-001 |
| **Status** | Draft (product + backend design) |
| **Last updated** | 2026-03-22 |
| **Scope** | Roles, permissions direction, phase 1 vs phase 2, admin vs mobile |

---

## Context

DUKA needs a **simple role model for MVP** that does not block future scale (marketplace, support staff, finance). Hardcoding every screen check against role names becomes brittle; pairing **roles** with **named permissions** keeps the system adaptable as new modules ship.

---

## Goal

- Define **phase 1 roles** and what each may do.
- Reserve **phase 2 roles** without implementing them now.
- Record the **role + permissions** pattern the backend and clients should converge on.
- Map roles to **admin web** vs **mobile** so UI and API stay aligned.

---

## Scope

**In scope for this document**

- Role names, capabilities, and restrictions (product language).
- Suggested permission examples for `STORE_OPERATOR`.
- Which roles appear in admin vs mobile.

**Out of scope (later specs)**

- Exact JWT claims, database schema, or migration scripts.
- Admin sidebar implementation (tracked separately in admin-dashboard work).

---

## Assumptions

- **Backend is the source of truth** for which roles and permissions a user has; clients only reflect that data.
- **One user may hold multiple roles** over time; the permission list is the effective union for authorization (exact rules to be confirmed when implementing).
- **Customer** and **Delivery Agent** are primarily mobile; admin may still **list/manage** agents and see operational views as product requires.

---

## Phase 1 roles (implement first)

### 1. Super Admin

**Purpose:** Full platform control (your operator / owner).

**Typical capabilities**

- Manage catalog (items, categories), orders, inventory, pricing as defined by API.
- Assign delivery, manage vendors (when vendor flows exist).
- Change settings; enable/disable modules (future).
- View reports.

**Restrictions:** None within admin scope (by definition).

---

### 2. Store Operator (dark store / warehouse)

**Purpose:** Day-to-day fulfillment and catalog maintenance without full platform control.

**Typical capabilities**

- Create/edit items; manage stock; update prices (within policy).
- View orders; update order status (e.g. packed, ready).
- Optionally assign delivery (product decision).

**Typical restrictions**

- No global/platform settings.
- No destructive actions on critical data where product forbids it (exact list = API contract).
- Vendor onboarding optional restriction for MVP.

---

### 3. Delivery Agent

**Purpose:** Execute deliveries; primary UX on mobile.

**Typical capabilities**

- View assigned orders; update statuses (e.g. picked, out for delivery, delivered).
- Contact customer (per app flows).

**Admin:** Operational visibility / roster management as product defines—not full catalog access.

---

### 4. Customer

**Purpose:** Shop and track orders; **not** an admin dashboard role.

**Typical capabilities**

- Place orders, track orders, view history.

---

## Phase 2 roles (defer until scale)

| Role | Purpose (summary) |
|------|-------------------|
| **Vendor / store owner** | Own catalog slice, own orders, availability, analytics (marketplace). |
| **Support / admin operator** | Orders, cancellations, complaints, customer contact—**no** catalog or pricing edits. |
| **Finance / admin (optional)** | Transactions, payouts, reports. |

---

## Canonical role identifiers

Use **stable string codes** in API and config (not display labels).

**Full target set (longer term):**

```
SUPER_ADMIN
STORE_OPERATOR
VENDOR
DELIVERY_AGENT
SUPPORT_ADMIN
CUSTOMER
```

**MVP implementation priority**

```
SUPER_ADMIN
STORE_OPERATOR
DELIVERY_AGENT
CUSTOMER
```

**Strong MVP simplification (optional):** ship admin with only **SUPER_ADMIN** and **STORE_OPERATOR** first; keep **DELIVERY_AGENT** and **CUSTOMER** on mobile + backend enforcement as they are wired.

---

## Role + permissions model (recommended)

Avoid encoding “can do X” only as role name checks in application code. Prefer **roles that grant a set of permissions**, with optional overrides later.

**Example shape (illustrative):**

```json
{
  "role": "STORE_OPERATOR",
  "permissions": [
    "item.create",
    "item.update",
    "item.view",
    "order.view",
    "order.update_status"
  ]
}
```

**Why**

- Add modules or tweak access without new role explosion.
- Easier auditing and testing (`permission` checks vs stringly role switches).

Exact permission strings and registry are defined in backend implementation docs when FEAT-RBAC-001 is implemented.

---

## Mapping roles to clients

| Role | Mobile app | Admin dashboard (web) |
|------|------------|-------------------------|
| Customer | Yes | No |
| Delivery Agent | Yes | Operational / list views only if product requires |
| Store Operator | No (unless product adds later) | Yes |
| Super Admin | No (unless product adds later) | Yes |
| Vendor (phase 2) | Optional lite | Yes (scoped) |
| Support admin (phase 2) | Unlikely | Yes (scoped) |

---

## UI behavior (admin sidebar — product intent)

- **Super Admin:** Full sidebar (all modules shipped for admin).
- **Store Operator:** Dashboard, catalog, orders, inventory—**no** global settings, **no** vendor onboarding (unless product opens it).
- **Vendor (later):** My items, my orders, earnings (scoped routes).

Implementation lives in `admin-dashboard`; this section is the **product contract** the UI should follow once RBAC is wired to the API.

---

## Real-life mapping (plain language)

| Person | Role code |
|--------|-----------|
| You / platform owner | `SUPER_ADMIN` |
| Shop / warehouse staff | `STORE_OPERATOR` |
| Delivery staff | `DELIVERY_AGENT` |
| End users of the app | `CUSTOMER` |

---

## Acceptance criteria (for when RBAC is implemented)

- [ ] **REQ-001:** API can represent at least `SUPER_ADMIN`, `STORE_OPERATOR`, `DELIVERY_AGENT`, and `CUSTOMER` for a user according to backend rules.
- [ ] **REQ-002:** Authorization checks use **named permissions** (or equivalent) rather than only role name string compares in scattered handlers.
- [ ] **REQ-003:** Admin-facing endpoints reject users without appropriate permissions with a consistent error (e.g. 403 + stable error code).
- [ ] **REQ-004:** Mobile-facing endpoints enforce customer vs agent (and future vendor) rules per product spec.
- [ ] **REQ-005:** Documentation here is updated when the permission registry or role list changes.

---

## Open questions

- Whether **one JWT** carries all roles/permissions or **/auth/me** (or similar) is refetched after login.
- Exact list of **permissions** for `SUPER_ADMIN` vs `STORE_OPERATOR` for MVP.
- Whether **delivery assignment** is allowed for `STORE_OPERATOR` only, `SUPER_ADMIN` only, or both.

---

## Next steps (engineering)

1. Define **permission registry** and default mapping per role (backend ticket).
2. Implement **guards/middleware** on routes by permission.
3. **Admin sidebar:** filter nav items from user permissions (admin-dashboard).

---

## Related

- `PROJECT-SPEC.md` (repository root) — product scope and admin vs mobile split.
