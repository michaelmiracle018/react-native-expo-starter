import { ScrollView, SafeAreaView, KeyboardAvoidingView } from "react-native";
import React from "react";
import { isAndroid, isIOS } from "~/lib/platform/detection";
import { getStatusBarHeight } from "~/lib/platform/statusBarHeight";

export default function ScreenWrapperWithScrollView({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  const statusBarHeight = getStatusBarHeight(false);

  return (
    <SafeAreaView style={{ paddingTop: statusBarHeight }}>
      <KeyboardAvoidingView behavior={isIOS ? "padding" : "height"}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={isAndroid ? "handled" : "never"}
          {...props}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
