import { z } from "zod";

const E164_PHONE = /^\+[1-9]\d{1,14}$/;

/**
 * Mobile registration body: strict (unknown keys rejected). Phone in E.164.
 */
export const mobileCreateUserBodySchema = z
  .object({
    phone: z
      .string({ required_error: "phone is required" })
      .trim()
      .regex(E164_PHONE, "phone must be in E.164 format (e.g. +919876543210)"),
    name: z
      .union([z.string().max(200), z.null()])
      .optional()
      .transform((v) => {
        if (v === undefined || v === null) return undefined;
        const t = v.trim();
        return t === "" ? undefined : t;
      }),
    intendedRole: z.enum(["CUSTOMER", "DELIVERY_AGENT"]).optional(),
  })
  .strict();

export type MobileCreateUserDto = z.infer<typeof mobileCreateUserBodySchema>;
