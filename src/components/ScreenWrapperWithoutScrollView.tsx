import { View, SafeAreaView, KeyboardAvoidingView } from "react-native";
import React from "react";
import { isIOS } from "~/lib/platform/detection";

export default function ScreenWrapperWithoutScrollView({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView behavior={isIOS ? "padding" : "height"}>
        <View {...props}>{children}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
