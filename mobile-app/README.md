# DUKA mobile app

React Native (Expo) app for **customers**, **delivery agents**, and **vendors**. Admin and back-office UI live in **`admin-frontend/`** (rename to **`frontend/`** after this folder becomes **`mobile/`** — see below).

**Rename this folder to `mobile/`:** Close Expo/Metro and editors using this path, then from the repo root run:

`powershell -ExecutionPolicy Bypass -File scripts/rename-frontend-to-mobile.ps1`

(or `git mv Frontend mobile`). After that, you can rename **`admin-frontend/`** → **`frontend/`** if you want the admin app at `frontend/`.

Before coding a new feature, create or update its docs in:

`docs/features/<feature-slug>/`
