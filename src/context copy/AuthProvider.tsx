import { ReactNode, createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { router, useSegments } from "expo-router";
import { useAppSelector } from "~/reduxStore/hook";
import * as LocalAuthentication from "expo-local-authentication";
import { getDataFromStorage, useAsyncState } from "~/utils/storageData";
import { responseToBooleanForObject } from "~/utils/checkValueForStorage";
import { STORAGE_KEY } from "~/api/common/secretKeys";
import { delayLoad } from "~/utils/delayLoad";

type Props = {
  isUserAuthenticated: boolean;
  isLoadingAuth: boolean;
  isFromAuthentication: boolean;
};

type AuthProvider = {
  isUserAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

function useProtectedRoute() {
  const segments = useSegments();
  const [isLoading, setIsLoading] = useState(false);

  async function checkAuthAndBiometrics() {
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
    const storageKeyRes = await getDataFromStorage(STORAGE_KEY);
    const isUserOnboarded = await getDataFromStorage("isUserOnboarded");
    const requiredKeys = ["refreshToken", "accessToken"];
    const isAuthenticated = responseToBooleanForObject(
      storageKeyRes,
      requiredKeys,
    );
    const inAuthGroup = segments[0] === "(authenticated)";
    if (!isLoading) {
      if (!isAuthenticated && inAuthGroup) {
        if (isUserOnboarded) {
          return router.replace("/(auth)/login");
        } else {
          return router.replace("/");
        }
      }
      if (isAuthenticated && !inAuthGroup) {
        if (!isBiometricAvailable) {
          return router.replace("/(authenticated)/(tabs)/market");
        } else {
          return router.replace("/(authenticated)/lock/lock");
        }
      }
    } else {
      router.push("/loading");
    }
  }
  useEffect(() => {
    checkAuthAndBiometrics();
  }, [segments]);
}

export const AuthContext = createContext<AuthProvider>({
  isUserAuthenticated: false,
  login: () => false,
  logout: () => {},
});

export function useAuth() {
  if (!useContext(AuthContext)) {
    throw new Error("useAuth must be used within a <AuthProvider />");
  }

  return useContext(AuthContext);
}

export default function AuthProviderContext({
  children,
}: {
  children: ReactNode;
}) {
  // const [user, setUser] = useState<boolean>();
  const { isUserAuthenticated, isLoadingAuth } = useAppSelector(
    (state) => state.authStore,
  );
  const [isUserFromLogin, setUserIsFromLogin] = useState(false);
  const login = () => {
    setUserIsFromLogin(true);
  };

  const logout = () => {
    // setUser(null);
  };

  useProtectedRoute();

  return (
    <AuthContext.Provider value={{ isUserAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
