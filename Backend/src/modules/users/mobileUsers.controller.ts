import type { RequestHandler } from "express";
import { asyncHandler } from "../../lib/asyncHandler.js";
import { getMobileCreateUserDto } from "./mobileUsers.middleware.js";
import * as userService from "./user.service.js";

/**
 * HTTP adapter: read validated DTO from locals → service → response.
 */
export const postCreateMobileUser: RequestHandler = asyncHandler(async (_req, res) => {
  const dto = getMobileCreateUserDto(res);
  const user = await userService.createMobileUser(dto);
  res.status(201).json({ user });
});
