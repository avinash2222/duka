import type { RequestHandler, Response } from "express";
import { parseBody } from "../../lib/validateRequest.js";
import { mobileCreateUserBodySchema, type MobileCreateUserDto } from "./mobileUsers.schemas.js";

export type LocalsWithMobileCreateUser = {
  mobileCreateUserDto: MobileCreateUserDto;
};

/**
 * Validates JSON body before OTP checks so clients get 400 without a valid OTP header.
 */
export const parseMobileCreateUserBody: RequestHandler = (req, res, next) => {
  try {
    const dto = parseBody(mobileCreateUserBodySchema, req.body);
    (res.locals as LocalsWithMobileCreateUser).mobileCreateUserDto = dto;
    next();
  } catch (e) {
    next(e);
  }
};

export function getMobileCreateUserDto(res: Response): MobileCreateUserDto {
  const dto = (res.locals as Partial<LocalsWithMobileCreateUser>).mobileCreateUserDto;
  if (!dto) {
    throw new Error("Missing mobileCreateUserDto on res.locals — ensure parseMobileCreateUserBody ran first.");
  }
  return dto;
}
