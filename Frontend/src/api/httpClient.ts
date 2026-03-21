import axios from "axios";
import { apiConfig } from "./config";

const http = axios.create({
  baseURL: apiConfig.baseUrl,
  timeout: apiConfig.timeoutMs,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getData<TResponse>(path: string): Promise<TResponse> {
  const response = await http.get<TResponse>(path);
  return response.data;
}

export async function postData<TResponse, TBody = unknown>(
  path: string,
  body?: TBody,
): Promise<TResponse> {
  const response = await http.post<TResponse>(path, body);
  return response.data;
}

