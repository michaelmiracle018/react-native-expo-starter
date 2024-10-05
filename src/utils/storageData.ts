/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "react-native-crypto-js";
import { APP_SECRET_ENCRYPTION } from "../api/common/secretKeys";
import { useCallback, useEffect, useReducer } from "react";
import { Platform } from "react-native";
import { responseToBooleanForObject } from "./checkValueForStorage";

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

export function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> {
  return useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null,
    ): [boolean, T | null] => [false, action],
    initialValue,
  ) as UseStateHook<T>;
}

export const storeDataInStorage = async (key: any, value: any) => {
  try {
    if (value == null) {
      removeDataFromStorage(key);
    } else {
      const jsonValue = JSON.stringify(value);
      let ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify(jsonValue),
        `${APP_SECRET_ENCRYPTION}`,
      ).toString();
      await AsyncStorage.setItem(key, ciphertext);
    }
  } catch (error) {
    // throw error;
  }
};

export const getDataFromStorage = async (key: any) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    let bytes = CryptoJS.AES.decrypt(jsonValue!, `${APP_SECRET_ENCRYPTION}`);
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData != null ? JSON.parse(decryptedData) : null;
  } catch (error) {
    // throw error;
  }
};

export const removeDataFromStorage = async (key: any) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    // throw error;
  }
};

export const clearAllDataFromStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    throw e;
  }
};

export function useStorageState(
  key: string | undefined | null,
): UseStateHook<any> {
  // Public
  const [state, setState] = useAsyncState<any>();

  // Get
  useEffect(() => {
    getDataFromStorage(key).then((value) => {
      const requiredKeys = ["refreshToken", "accessToken"];
      const isUserAuthenticated = responseToBooleanForObject(
        value,
        requiredKeys,
      );
      setState(isUserAuthenticated);
    });
  }, [key]);

  // Set
  const setValue = useCallback(
    (value: string | null) => {
      setState(value);
      storeDataInStorage(key, value);
    },
    [key],
  );

  return [state, setValue];
}
