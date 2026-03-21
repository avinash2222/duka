import { appConfig } from "../../config/appConfig";
import { Coordinates, getCurrentCoordinates } from "../location/locationService";

export type ServiceabilityResult =
  | { status: "allowed"; distanceKm: number }
  | { status: "outside_radius"; distanceKm: number }
  | { status: "permission_denied" }
  | { status: "error" };

function toRadians(value: number): number {
  return (value * Math.PI) / 180;
}

function getDistanceInKm(from: Coordinates, to: Coordinates): number {
  const earthRadiusKm = 6371;
  const latDelta = toRadians(to.latitude - from.latitude);
  const lonDelta = toRadians(to.longitude - from.longitude);

  const a =
    Math.sin(latDelta / 2) * Math.sin(latDelta / 2) +
    Math.cos(toRadians(from.latitude)) *
      Math.cos(toRadians(to.latitude)) *
      Math.sin(lonDelta / 2) *
      Math.sin(lonDelta / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}

export async function checkServiceability(): Promise<ServiceabilityResult> {
  try {
    const userLocation = await getCurrentCoordinates();
    if (!userLocation) {
      return { status: "permission_denied" };
    }

    const hubLocation = appConfig.serviceability.hubLocation;
    const distanceKm = getDistanceInKm(userLocation, hubLocation);
    const roundedDistanceKm = Number(distanceKm.toFixed(2));

    if (distanceKm <= appConfig.serviceability.radiusKm) {
      return { status: "allowed", distanceKm: roundedDistanceKm };
    }

    return { status: "outside_radius", distanceKm: roundedDistanceKm };
  } catch {
    return { status: "error" };
  }
}

