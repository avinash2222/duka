import { Router } from "express";
import { requireMobileOtpProofIfConfigured } from "../../middleware/requireMobileOtpProof.js";
import { postCreateMobileUser } from "./mobileUsers.controller.js";
import { parseMobileCreateUserBody } from "./mobileUsers.middleware.js";

export const mobileUsersRouter = Router();

mobileUsersRouter.post(
  "/",
  parseMobileCreateUserBody,
  requireMobileOtpProofIfConfigured,
  postCreateMobileUser,
);
