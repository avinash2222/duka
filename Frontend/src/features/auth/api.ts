import { getData } from "@api/httpClient";
import { GET_API_URLS } from "@api/urls";
import { appConfig } from "../../config/appConfig";
import { getDummyUserDetails } from "./dummyUserDetails";
import { UserDetailsApiResponse } from "./types";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function getUserDetailsFromMock(phone: string): Promise<UserDetailsApiResponse> {
  await delay(appConfig.auth.mockUserDetailsDelayMs);
  return getDummyUserDetails(phone);
}

async function getUserDetailsFromApi(phone: string): Promise<UserDetailsApiResponse> {
  const encodedPhone = encodeURIComponent(phone);
  return getData<UserDetailsApiResponse>(`${GET_API_URLS.USER_DETAILS}?phone=${encodedPhone}`);
}

export async function getUserDetails(phone: string): Promise<UserDetailsApiResponse> {
  if (appConfig.auth.useMockUserDetailsApi) {
    return getUserDetailsFromMock(phone);
  }

  return getUserDetailsFromApi(phone);
}
