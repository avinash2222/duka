import axiosInstance from '@/auth/interceptor';
import { GET_API_URLS, POST_API_URLS } from './apiEndpoints';

/* App HTTP surface: apiGet + apiPost only; register paths in GET_API_URLS / POST_API_URLS. */

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
