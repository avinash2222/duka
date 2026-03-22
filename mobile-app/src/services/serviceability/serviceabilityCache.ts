import AsyncStorage from "@react-native-async-storage/async-storage";
import type { ServiceabilityResult } from "./serviceabilityService";

const STORAGE_KEY = "@duka/serviceability_snapshot";

/** Cached checks older than this require a fresh location read. */
const SNAPSHOT_MAX_AGE_MS = 24 * 60 * 60 * 1000;

export type ServiceabilitySnapshot = {
  savedAt: number;
  result: ServiceabilityResult;
};

export function isServiceabilitySnapshotStale(savedAt: number): boolean {
  return Date.now() - savedAt > SNAPSHOT_MAX_AGE_MS;
}

export async function loadServiceabilitySnapshot(): Promise<ServiceabilitySnapshot | null> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      typeof (parsed as ServiceabilitySnapshot).savedAt !== "number" ||
      (parsed as ServiceabilitySnapshot).result == null
    ) {
      return null;
    }
    return parsed as ServiceabilitySnapshot;
  } catch {
    return null;
  }
}

export async function persistServiceabilitySnapshot(result: ServiceabilityResult): Promise<void> {
  const snapshot: ServiceabilitySnapshot = {
    savedAt: Date.now(),
    result,
  };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

export async function clearServiceabilityCache(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
