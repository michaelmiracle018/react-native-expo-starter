export const STORAGE_KEY = process.env.EXPO_PUBLIC_APP_SECRET_KEY;
export const APP_SECRET_ENCRYPTION =
  process.env.EXPO_PUBLIC_APP_SECRET_ENCRYPTION;
export const APP_SECRET_ENCRYPTION_1 =
  process.env.EXPO_PUBLIC_APP_SECRET_ENCRYPTION_1;
export const SECRET_RESET_KEY =
  process.env.EXPO_PUBLIC_APP_SECRET_ENCRYPTION_RESET;
export const MERCHANT_TOKEN = process.env.EXPO_PUBLIC_MERCHANT_TOKEN;
export const FLOW_ID = process.env.EXPO_PUBLIC_FLOW_ID;
export const TALK_TOKEN = process.env.EXPO_PUBLIC_TALK_TOKEN;
export const TALK_ID = process.env.EXPO_PUBLIC_TALK_ID;
export const REACT_QUERY_KEY = process.env.EXPO_PUBLIC_REACT_QUERY_KEY;
export const LABELERS_DETAILED_INFO_QUERY_KEY_ROOT =
  process.env.EXPO_PUBLIC_LABELERS_DETAILED_INFO_QUERY_KEY_ROOT;
export const ACCOUNT_TYPE = process.env.EXPO_PUBLIC_ACCOUNT_TYPE;
export const SIGN_UP_STATE_KEY = process.env.EXPO_PUBLIC_SIGN_UP_STATE_KEY;
export const SMS_DETAILS = process.env.EXPO_PUBLIC_SMS_DETAILS;
export const EMAIL_DETAILS_KEY = process.env.EXPO_PUBLIC_EMAIL_DETAILS_KEY;
export const PHONE_DETAILS_KEY = process.env.EXPO_PUBLIC_PHONE_DETAILS_KEY;

// * BASE URL
export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.EXPO_PUBLIC_API_PROD_BASE_URL
    : process.env.EXPO_PUBLIC_API_DEV_BASE_URL;

export const REFRESH_TOKEN_URL = `${BASE_URL}/auth/refresh`;
