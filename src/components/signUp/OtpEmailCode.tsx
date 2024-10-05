import { StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import OTPTextView from "react-native-otp-textinput";
import Colors from "~/constants/Colors";
import ResendCodeTimer from "../ResendCodeTimer";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "react-native-toast-notifications";
import { serviceVerifyEmailAndPhone } from "~/services/auth.service";
import { useLingui } from "@lingui/react";
import { t, Trans } from "@lingui/macro";

type Props = {
  setShowOtpEmail: (value: boolean) => void;
  email: string;
  nextFormStep: () => void;
  showTimerEmail: boolean;
  setShowTimerEmail: (value: boolean) => void;
  handleResend: () => void;
  pinId: string;
  setValue: any;
};

export default function OtpEmailCode({
  setShowOtpEmail,
  email,
  nextFormStep,
  setShowTimerEmail,
  showTimerEmail,
  handleResend,
  pinId,
  setValue,
}: Props) {
  const [otpCode, setOtpCode] = useState("");
  const otpRef = useRef<OTPTextView | any>();
  const toast = useToast();
  const { i18n } = useLingui();

  // ? MUTATION TO GET OPT CODE EMAIL
  const { mutate: handleVerifyCode, isPending: isVerifyingCode } = useMutation({
    mutationFn: () =>
      serviceVerifyEmailAndPhone({
        pinId,
        pin: otpCode,
      }),
    onSuccess: (response: any) => {
      toast.hideAll();
      // Invalidate and refetch
      const { result } = response.data;

      if (result.verified === true) {
        otpRef.current.clear();
        toast.show(t(i18n)`Email verified successfully`, {
          type: "custom_toast_without_title",
          animationDuration: 300,
          normalColor: "success",
        });
        setValue("isEmailVerified", true, {
          shouldValidate: false,
        });
        nextFormStep();
      }
      if (result.verified === "Expired") {
        otpRef.current.clear();
        toast.show(t(i18n)`code has expired, please try again.`, {
          type: "custom_toast_without_title",
          animationDuration: 300,
          normalColor: "warning",
        });
      }
      if (result.attemptsRemaining > 0) {
        const msg = t(i18n)`Wrong code. Attempts Remaining is`;
        toast.show(`${msg} ${result?.attemptsRemaining}`, {
          type: "custom_toast_without_title",
          animationDuration: 300,
          normalColor: "warning",
        });
      }
      // navigation.navigate("OTPScreenEmail");
    },
    onError: (error: any) => {
      toast.hideAll();
      const errorMessage = error?.response?.data?.message;
      toast.show(`${errorMessage}`, {
        type: "custom_toast_without_title",
        animationDuration: 300,
        normalColor: "error",
      });
    },
  });

  return (
    <View>
      <Text className="native:text-2xl font-bold mt-10">
        <Trans>Verify your email</Trans>
      </Text>
      <Text className="native:text-xl mt-2">
        <Trans>Please enter the 6-digits sent to</Trans>
      </Text>
      <Text className="native:text-lg text-info font-bold">{email}</Text>
      <View className="mt-8">
        <OTPTextView
          //   containerStyle={styles.textInputContainer}
          textInputStyle={styles.roundedTextInput}
          inputCount={6}
          inputCellLength={1}
          keyboardType="numeric"
          handleTextChange={setOtpCode}
          ref={otpRef}
          tintColor={Colors.primary}
          secureTextEntry
        />
      </View>
      <View className="flex-row gap-2 mt-4">
        {!isVerifyingCode && (
          <Button
            variant="info"
            className="shadow shadow-foreground/1 w-full mt-5 flex-1"
            onPress={() => setShowOtpEmail(false)}
            size="default"
          >
            <Text className="font-bold">
              <Trans>Back to email</Trans>
            </Text>
          </Button>
        )}
        <Button
          variant="info"
          className="shadow shadow-foreground/1 w-full mt-5 flex-1"
          onPress={handleVerifyCode}
          size="default"
          disabled={otpCode.length < 6 || isVerifyingCode}
        >
          <Text className="font-bold">
            <Trans>Verify</Trans>
          </Text>
        </Button>
      </View>
      <ResendCodeTimer
        showTimer={showTimerEmail}
        setShowTimer={setShowTimerEmail}
        handleResend={handleResend}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    marginTop: 70,
    marginBottom: 20,
  },
  roundedTextInput: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
  },
});
