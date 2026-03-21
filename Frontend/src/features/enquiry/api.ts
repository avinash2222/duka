import { postData } from "@api/httpClient";
import { POST_API_URLS } from "@api/urls";

type SubmitEnquiryPayload = {
  message: string;
};

type SubmitEnquiryResponse = {
  success: boolean;
};

export async function submitEnquiry(payload: SubmitEnquiryPayload): Promise<void> {
  await postData<SubmitEnquiryResponse, SubmitEnquiryPayload>(
    POST_API_URLS.ENQUIRIES,
    payload,
  );
}

