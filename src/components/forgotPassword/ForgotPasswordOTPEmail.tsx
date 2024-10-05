import { View } from "react-native";
import React from "react";
import { Text } from "../ui/text";
import { t, Trans } from "@lingui/macro";
import BackgroundInput from "../customInput/BackgroundInput";
import { Button } from "../ui/button";
import ResendCodeTimer from "../ResendCodeTimer";
import { serviceSendEmailResetPasswordCode } from "~/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { SendEmailProp } from "~/types";
import { useToast } from "react-native-toast-notifications";
import { useLingui } from "@lingui/react";

type Props = {
  nextFormStep: () => void;
  PrevFormStep: () => void;
  control: any;
  errors: any;
  email: string;
  showTimer: boolean;
  setShowTimer: (value: boolean) => void;
};

export default function ForgotPasswordOTPEmail({
  nextFormStep,
  PrevFormStep,
  control,
  errors,
  email,
  showTimer,
  setShowTimer,
}: Props) {
  const toast = useToast();
  const { i18n } = useLingui();
  // ? MUTATION TO VERIFY EMAIL
  const { mutate, isPending } = useMutation({
    mutationFn: (value: SendEmailProp) =>
      serviceSendEmailResetPasswordCode(value),
    onSuccess: (response) => {
      toast.hideAll();
      // const { result } = response.data;
      toast.show(t(i18n)`code has been sent to your email`, {
        type: "custom_toast_without_title",
        animationDuration: 300,
        normalColor: "success",
      });
      setShowTimer(true);
      nextFormStep();
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
  const handleSendEmailCode = () => {
    mutate({ email });
  };
  return (
    <View>
      <Text className="native:text-2xl font-bold text-left mt-10">
        <Trans>Enter your code</Trans>
      </Text>
      <Text className="mt-5 text-left native:text-xl">
        <Trans>Please enter the 6 codes sent to</Trans>
      </Text>
      <Text className="text-info text-left mt-2 font-bold">{email}</Text>
      <View className="pt-5">
        <BackgroundInput
          trimText={true}
          nativeID="otp"
          control={control}
          name="token"
          label={t(i18n)`Otp Code`}
          placeholder={t(i18n)`Enter your Otp Code`}
          errors={errors}
          inputErr={errors.token?.type === "required"}
          validate={(value: any) =>
            value.length === 6 || t(i18n)`Please enter the 6 codes`
          }
          required={t(i18n)`This field is required.`}
        />
        <View className="flex-row gap-2">
          <Button
            variant="info"
            className="shadow shadow-foreground/1 w-full mt-5 flex-1"
            onPress={PrevFormStep}
            size="default"
          >
            <Text className="font-bold">
              <Trans>Previous</Trans>
            </Text>
          </Button>
          <Button
            variant="info"
            className="shadow shadow-foreground/1 w-full mt-5 flex-1"
            onPress={nextFormStep}
            size="default"
          >
            <Text className="font-bold">
              <Trans>Next</Trans>
            </Text>
          </Button>
        </View>
      </View>
      <ResendCodeTimer
        showTimer={showTimer}
        setShowTimer={setShowTimer}
        handleResend={handleSendEmailCode}
      />
    </View>
  );
}
