import { View } from "react-native";
import React from "react";
import { ToastProvider } from "react-native-toast-notifications";
import { cn } from "~/lib/utils";
import Colors from "~/constants/Colors";
import { Text } from "../ui/text";

// export const ToastMessage = Toast;

export default function Toastify({ children }: any) {
  return (
    <ToastProvider
      offset={10}
      // Custom type example
      renderType={{
        custom_toast_with_title: (toast: any) => (
          <View
            className={cn("w-[95%] px-4 py-7")}
            style={{
              width: "95%",
              backgroundColor: Colors.grayDark,
              paddingHorizontal: 15,
              paddingVertical: 10,
              marginVertical: 4,
              borderRadius: 3,
              borderLeftColor:
                toast.normalColor === "success"
                  ? Colors.darkMint
                  : toast.normalColor === "error"
                    ? Colors.danger
                    : Colors.paraColor,
              borderLeftWidth: 10,
              justifyContent: "center",
              paddingLeft: 16,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              {toast.data.title}
            </Text>
            <Text style={{ color: "#fff", marginRight: 5 }}>
              {toast.message}
            </Text>
          </View>
        ),
        custom_toast_without_title: (toast) => (
          <View
            className={cn("w-[95%] px-4 py-7 ")}
            style={{
              width: "95%",
              backgroundColor: Colors.grayDark,
              paddingHorizontal: 15,
              paddingVertical: 20,
              marginVertical: 4,
              borderRadius: 3,
              borderLeftColor:
                toast.normalColor === "success"
                  ? Colors.light_green
                  : toast.normalColor === "error"
                    ? Colors.danger
                    : Colors.paraColor,
              borderLeftWidth: 10,
              justifyContent: "center",
              paddingLeft: 16,
            }}
          >
            <Text
              style={{
                color: "#fff",
                marginRight: 5,
              }}
            >
              {toast.message}
            </Text>
          </View>
        ),
      }}
    >
      {children}
    </ToastProvider>
  );
}
