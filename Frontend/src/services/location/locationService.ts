import * as Location from "expo-location";

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export async function isForegroundLocationPermissionGranted(): Promise<boolean> {
  const permission = await Location.getForegroundPermissionsAsync();
  return permission.status === "granted";
}

/** True when the app may read a current fix: permission granted and device location services are on. */
export async function isGuestLocationAccessSatisfied(): Promise<boolean> {
  const permission = await Location.getForegroundPermissionsAsync();
  if (permission.status !== "granted") {
    return false;
  }
  return await Location.hasServicesEnabledAsync();
}

export async function getCurrentCoordinates(): Promise<Coordinates | null> {
  const permission = await Location.requestForegroundPermissionsAsync();
  if (permission.status !== "granted") {
    return null;
  }

  const position = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
}

