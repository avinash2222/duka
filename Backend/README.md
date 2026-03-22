# DUKA Backend

**Stack:** Node.js 20+, **TypeScript**, **Express**, **PostgreSQL**, **Prisma**.

Serves the **admin web** (`admin-dashboard/`) and **mobile** app. Business rules, auth, and persistence live here.

## Prerequisites

- Node.js 20+
- A running **PostgreSQL** instance

## Setup

```bash
cd Backend
cp .env.example .env
# Edit .env — set DATABASE_URL and optional flags
npm install
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

- **Health:** `GET http://localhost:4000/health`
- **Mobile user create (customer / agent):** `POST http://localhost:4000/v1/mobile/users` — contract in `../docs/authentication/user-creation.md`

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Watch mode with `tsx` |
| `npm run build` | Compile to `dist/` |
| `npm start` | Run compiled `dist/index.js` |
| `npm run db:generate` | Regenerate Prisma Client |
| `npm run db:migrate` | Create/apply migrations (dev) |
| `npm run db:push` | Push schema without migration files (prototyping) |
| `npm run db:studio` | Prisma Studio |
| `npm run db:seed` | Idempotent seed (default **super admin** `avinashcat.singh@gmail.com`) |

## Source layout (high level)

| Area | Role |
|------|------|
| `src/app.ts` | Helmet, CORS, JSON limit, route mounts, **404**, **central error JSON** |
| `src/routes/v1/` | API version shell — add new routers under `/v1/...` |
| `src/modules/<domain>/` | Feature slice: **routes → middleware → controller → service → repository** |
| `src/middleware/` | Shared middleware (`errorHandler`, `notFoundHandler`, OTP gate, …) |
| `src/lib/` | `asyncHandler`, `ApiError`, Zod helpers, Prisma client |
| `src/config/env.ts` | **Zod-validated** environment (fails fast on invalid config) |

**Request flow (example — mobile user create):**  
`parseMobileCreateUserBody` (Zod, 400) → `requireMobileOtpProofIfConfigured` (403 when enabled) → controller → service → repository (Prisma).

## Documentation

- Feature specs for this workspace: `Backend/docs/features/`
- **Auth & user-creation integration (mobile + admin):** `../docs/authentication/user-creation.md`
- Repo-wide product context: `../PROJECT-SPEC.md`

## Cursor rules

Project-specific AI rules live in `.cursor/rules/`.

---

**Note (Windows):** If you also use a lowercase `backend/` path in tooling, it may resolve to this same folder — keep one canonical path (`Backend/`) in docs and scripts.
