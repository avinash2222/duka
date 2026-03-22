import { type ZodTypeAny, z } from "zod";
import { zodErrorToApiError } from "./zodToApiError.js";

export function parseBody<T extends ZodTypeAny>(schema: T, body: unknown): z.infer<T> {
  const result = schema.safeParse(body === undefined ? {} : body);
  if (!result.success) {
    throw zodErrorToApiError(result.error);
  }
  return result.data;
}
