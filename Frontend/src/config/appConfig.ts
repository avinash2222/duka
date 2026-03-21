export const appConfig = {
  serviceability: {
    radiusKm: 5,
    // Update these coordinates to your dark store location.
    hubLocation: {
      latitude: 12.983555, // Assuming Bangalore room is the location of the hub for testing purposes
      longitude: 77.765921,
    },
  },
  auth: {
    mobileDigits: 10,
  },
  contact: {
    callToOrderPhone: "9793973080",
  },
} as const;

