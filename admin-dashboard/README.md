# DUKA admin web

Web application for **admin and internal operations**: catalog and configuration, user/role management, order oversight, and other back-office features.

- **Stack:** To be chosen when implementation starts (for example Vite + React or Next.js).
- **API:** Same backend as the mobile app under `Backend/`.

## Folder name (`frontend/` vs `admin-frontend/`)

The product spec refers to this line of business as the **admin `frontend/`**. On **Windows**, you cannot have **`Frontend/`** (mobile) and **`frontend/`** (admin) at the same time because paths are case-insensitive. This repo therefore uses **`admin-frontend/`** until the mobile app folder is renamed to **`mobile/`**. Then run:

`git mv admin-frontend frontend`

(from the repo root) if you want the admin folder to be exactly **`frontend/`**.

The **mobile** app for customers, agents, and vendors lives in **`mobile/`** (rename from `Frontend/` first — see `scripts/rename-frontend-to-mobile.ps1` and `PROJECT-SPEC.md`).
