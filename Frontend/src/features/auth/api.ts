import { getData } from "@api/httpClient";
import { GET_API_URLS } from "@api/urls";
import { UserDetailsApiResponse } from "./types";

export async function getUserDetails(phone: string): Promise<UserDetailsApiResponse> {
  const encodedPhone = encodeURIComponent(phone);
  return getData<UserDetailsApiResponse>(`${GET_API_URLS.USER_DETAILS}?phone=${encodedPhone}`);
}
