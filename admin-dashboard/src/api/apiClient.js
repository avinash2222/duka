import axiosInstance from '@/auth/interceptor';
import {
  GET_API_URLS,
  POST_API_URLS,
  PUT_API_URLS,
  PATCH_API_URLS,
  DELETE_API_URLS,
} from './apiEndpoints';

const replaceParams = (url, urlParams = {}) => {
  let next = url;
  Object.keys(urlParams).forEach((key) => {
    next = next.replace(`:${key}`, urlParams[key]);
  });
  return next;
};

export const apiGet = (apiName, queryString = '', urlParams = {}, config = {}) => {
  let apiUrl = replaceParams(GET_API_URLS[apiName], urlParams);
  const url = queryString ? `${apiUrl}?${queryString}` : apiUrl;
  return axiosInstance.get(url, config);
};

export const apiPost = (apiName, data = {}, queryString = '', urlParams = {}, config = {}) => {
  let apiUrl = replaceParams(POST_API_URLS[apiName], urlParams);
  const url = queryString ? `${apiUrl}?${queryString}` : apiUrl;
  return axiosInstance.post(url, data, config);
};

export const apiPut = (apiName, data = {}, queryString = '', urlParams = {}) => {
  let apiUrl = replaceParams(PUT_API_URLS[apiName], urlParams);
  const url = queryString ? `${apiUrl}?${queryString}` : apiUrl;
  return axiosInstance.put(url, data);
};

export const apiPatch = (apiName, data = {}, queryString = '', urlParams = {}) => {
  let apiUrl = replaceParams(PATCH_API_URLS[apiName], urlParams);
  const url = queryString ? `${apiUrl}?${queryString}` : apiUrl;
  return axiosInstance.patch(url, data);
};

export const apiDelete = (apiName, data = {}, urlParams = {}) => {
  const apiUrl = replaceParams(DELETE_API_URLS[apiName], urlParams);
  return axiosInstance.delete(apiUrl, { data });
};
