import { appConfig } from "../../config/appConfig";

export function sanitizeMobileInput(value: string): string {
  return value.replace(/\D/g, "").slice(0, appConfig.auth.mobileDigits);
}

export function isValidMobileNumber(value: string): boolean {
  return value.length === appConfig.auth.mobileDigits;
}

