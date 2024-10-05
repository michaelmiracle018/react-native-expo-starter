// api.ts

import axios from "axios";
import {
  applyAuthTokenInterceptor,
  AuthTokenInterceptorConfig,
  AuthTokens,
  TokenRefreshRequest,
} from "./axiosClient";
import { BASE_URL, REFRESH_TOKEN_URL } from "./common/secretKeys";
// import {
//   type AuthTokenInterceptorConfig,
//   type AuthTokens,
//   type TokenRefreshRequest,
//   applyAuthTokenInterceptor,
// } from "react-native-axios-jwt";

// const BASE_URL = "https://api.example.com";

// 1. Create an axios instance that you wish to apply the interceptor to
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// 2. Define token refresh function.
// It is an async function that takes a refresh token and returns a promise
// that resolves in fresh access token and refresh token.
// You can also return only an access token in a case when a refresh token stays the same.
const requestRefresh: TokenRefreshRequest = async (
  refreshToken: string,
): Promise<AuthTokens> => {
  // Important! Do NOT use the axios instance that you supplied to applyAuthTokenInterceptor
  // because this will result in an infinite loop when trying to refresh the token.
  // Use the global axios client or a different instance.
  const response = await axios.get(REFRESH_TOKEN_URL, {
    headers: { "Refresh-Token": refreshToken },
  });
  const { data } = response;

  return {
    accessToken: data?.result?.accessToken,
    refreshToken: data?.result?.refreshToken,
  };
};

const config: AuthTokenInterceptorConfig = {
  requestRefresh,
};

// 3. Add interceptor to your axios instance
applyAuthTokenInterceptor(axiosInstance, config);
