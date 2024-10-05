import { router } from "expo-router";
import { useContext, createContext, type PropsWithChildren } from "react";
import { STORAGE_KEY } from "~/api/common/secretKeys";
import { responseToBooleanForObject } from "~/utils/checkValueForStorage";
import { getDataFromStorage, useStorageState } from "~/utils/storageData";

const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState(STORAGE_KEY);
  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          // getDataFromStorage(STORAGE_KEY).then((value) => {
          //   const requiredKeys = ["refreshToken", "accessToken"];
          //   const isUserAuthenticated = responseToBooleanForObject(
          //     value,
          //     requiredKeys,
          //   );
          //   if (isUserAuthenticated) {
          //     router.replace("/(authenticated)/(tabs)/market");
          //   } else {
          //     router.replace("/(auth)/login");
          //   }
          // });
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
