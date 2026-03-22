import { ApiError } from "../../lib/apiError.js";
import type { RoleCode } from "../../types/roleCode.js";
import { isPrismaUniqueViolation } from "../../lib/prismaErrors.js";
import type { MobileCreateUserDto } from "./mobileUsers.schemas.js";
import * as userRepository from "./user.repository.js";

export type MobileUserView = {
  id: string;
  phone: string | null;
  name: string | null;
  roles: { role: RoleCode }[];
};

function toMobileUserView(row: userRepository.UserWithRoles): MobileUserView {
  return {
    id: row.id,
    phone: row.phone,
    name: row.name,
    roles: row.roles,
  };
}

/**
 * Registers a user from the mobile app (after OTP gate and body validation).
 */
export async function createMobileUser(dto: MobileCreateUserDto): Promise<MobileUserView> {
  const role = (dto.intendedRole ?? "CUSTOMER") as RoleCode;
  const name = dto.name ?? null;

  try {
    const row = await userRepository.createUserWithPhoneAndRole({
      phone: dto.phone,
      name,
      role,
    });
    return toMobileUserView(row);
  } catch (e: unknown) {
    if (isPrismaUniqueViolation(e)) {
      throw new ApiError(409, "PHONE_ALREADY_REGISTERED", "This phone number is already registered.");
    }
    throw e;
  }
}
