import { StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import OTPTextView from "react-native-otp-textinput";
import Colors from "~/constants/Colors";
import ResendCodeTimer from "../ResendCodeTimer";
import { useToast } from "react-native-toast-notifications";
import { useMutation } from "@tanstack/react-query";
import { serviceVerifyEmailAndPhone } from "~/services/auth.service";
import { displayErrorMessage } from "~/utils/displayErrorMessage";
import CircleLoading from "../loader/CircleLoading";
import { useLingui } from "@lingui/react";
import { t, Trans } from "@lingui/macro";

type Props = {
  setShowOtpPhone: (value: boolean) => void;
  watchPhoneNumber: any;
  nextFormStep: () => void;
  otpPinId: string;
  setShowTimerPhone: (value: boolean) => void;
  showTimerPhone: boolean;
  handleResend: () => void;
  setValue: any;
};

export default function OtpPhoneCode({
  setShowOtpPhone,
  watchPhoneNumber,
  nextFormStep,
  otpPinId,
  setShowTimerPhone,
  showTimerPhone,
  handleResend,
  setValue,
}: Props) {
  const [otpCode, setOtpCode] = useState("");
  const otpRef = useRef<OTPTextView | any>();
  const toast = useToast();
  const { i18n } = useLingui();

  const { mutate: handleVerifyCode, isPending: isVerifyingCode } = useMutation({
    mutationFn: ({ otpPinId }: any) =>
      serviceVerifyEmailAndPhone({
        pinId: otpPinId,
        pin: otpCode,
      }),
    onSuccess: (response: any) => {
      toast.hideAll();
      // Invalidate and refetch
      const { result } = response.data;

      if (result.verified === true) {
        otpRef.current.clear();
        toast.show(t(i18n)`Phone number verified successfully`, {
          type: "custom_toast_without_title",
          animationDuration: 300,
          normalColor: "success",
        });
        setValue("isPhoneNumberVerified", true, {
          shouldValidate: false,
        });
        nextFormStep();
      }
      if (result.verified === "Expired") {
        otpRef.current.clear();
        toast.show(
          t(i18n)`code has expired, please click resend to get a new one`,
          {
            type: "custom_toast_without_title",
            animationDuration: 300,
            normalColor: "warning",
          },
        );
      }

      if (result.attemptsRemaining > 0) {
        const msg = t(i18n)`Wrong code. Attempts Remaining is`;
        toast.show(`${msg} ${result?.attemptsRemaining}`, {
          type: "custom_toast_without_title",
          animationDuration: 300,
          normalColor: "warning",
        });
      }
    },
    onError: (error: any) => {
      toast.hideAll();
      displayErrorMessage(error);
    },
  });

  return (
    <View>
      <Text className="native:text-2xl font-bold mt-10">
        <Trans>Verify your Phone</Trans>
      </Text>
      <Text className="native:text-xl mt-2">
        <Trans>Please enter the 6-digits sent to</Trans>
      </Text>
      <Text className="native:text-lg text-info font-bold">
        {watchPhoneNumber}
      </Text>
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
            onPress={() => setShowOtpPhone(false)}
            size="default"
          >
            <Text className="font-bold">
              <Trans>Back to phone</Trans>
            </Text>
          </Button>
        )}
        <Button
          variant="info"
          className="shadow shadow-foreground/1 w-full mt-5 flex-1"
          onPress={() => handleVerifyCode({ otpPinId })}
          size="default"
          disabled={otpCode.length < 6 || isVerifyingCode}
        >
          {isVerifyingCode ? (
            <CircleLoading color={Colors.textHighlightColor} size={25} />
          ) : (
            <Text className="font-bold">
              <Trans>Verify</Trans>
            </Text>
          )}
        </Button>
      </View>
      <View>
        <ResendCodeTimer
          showTimer={showTimerPhone}
          setShowTimer={setShowTimerPhone}
          handleResend={handleResend}
        />
      </View>
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
