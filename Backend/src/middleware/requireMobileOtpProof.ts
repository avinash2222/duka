import type { RequestHandler } from "express";
import { env } from "../config/env.js";
import { ApiError } from "../lib/apiError.js";

/**
 * When MOBILE_USER_CREATE_REQUIRE_OTP=true, creation requires a non-empty OTP proof header.
 * Actual verification against the phone is TODO until the OTP service exists.
 */
export const requireMobileOtpProofIfConfigured: RequestHandler = (req, _res, next) => {
  if (!env.MOBILE_USER_CREATE_REQUIRE_OTP) {
    next();
    return;
  }

  const proof = req.header("x-otp-verification-id")?.trim();
  if (!proof) {
    next(
      new ApiError(
        403,
        "OTP_VERIFICATION_REQUIRED",
        "Missing or empty x-otp-verification-id header.",
      ),
    );
    return;
  }

  // TODO: validate proof matches body.phone via OTP/session store (see docs/authentication/user-creation.md).
  next();
};
