import { Router } from "express";
import { mobileUsersRouter } from "../../modules/users/mobileUsers.routes.js";

/**
 * Versioned HTTP surface. Add new routers here (e.g. `/admin/users`, `/mobile/auth`).
 */
export const v1Router = Router();

v1Router.use("/mobile/users", mobileUsersRouter);
