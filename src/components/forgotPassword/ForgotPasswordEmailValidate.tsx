import { View } from "react-native";
import React from "react";
import BackgroundInput from "../customInput/BackgroundInput";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import * as EmailValidator from "email-validator";
import CircleLoading from "../loader/CircleLoading";
import { serviceSendEmailResetPasswordCode } from "~/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "react-native-toast-notifications";
import Colors from "~/constants/Colors";
import ResendCodeTimer from "../ResendCodeTimer";
import { SendEmailProp } from "~/types";
import { useLingui } from "@lingui/react";
import { t, Trans } from "@lingui/macro";

type Props = {
  nextFormStep: () => void;
  control: any;
  errors: any;
  email: string;
  setError: any;
};

export default function ForgotPasswordEmailValidate({
  nextFormStep,
  control,
  errors,
  email,
  setError,
}: Props) {
  const toast = useToast();
  const { i18n } = useLingui();

  // ? MUTATION TO VERIFY EMAIL
  const { mutate, isPending } = useMutation({
    mutationFn: (value: SendEmailProp) =>
      serviceSendEmailResetPasswordCode(value),
    onSuccess: (response) => {
      toast.hideAll();
      const { result } = response.data;
      console.log(response);
      toast.show(t(i18n)`code has been sent to your email`, {
        type: "custom_toast_without_title",
        animationDuration: 300,
        normalColor: "success",
      });
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
    if (!email) {
      setError("email", {
        type: "manual",
        message: t(i18n)`This field is required`,
        shouldValidate: true,
      });
      return;
    }
    const isValid = EmailValidator.validate(email);
    if (!isValid) {
      setError("email", {
        type: "manual",
        message: t(i18n)`Please enter a valid email`,
        shouldValidate: true,
      });
      return;
    }
    if (email && isValid) {
      mutate({ email });
    }
  };

  return (
    <View>
      <Text className="native:text-2xl font-bold mt-10">Enter your email</Text>
      <View className="mt-10">
        <BackgroundInput
          trimText={true}
          nativeID="email"
          control={control}
          name="email"
          patterValue={/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/}
          patterMessage={t(i18n)`Please enter a valid email`}
          label={t(i18n)`Email`}
          placeholder={t(i18n)`Enter your email`}
          errors={errors}
          inputErr={errors.email?.type === "manual"}
          required={t(i18n)`This field is required.`}
        />
      </View>

      <Button
        variant="info"
        className="shadow shadow-foreground/1 w-full mt-5"
        onPress={handleSendEmailCode}
        size="default"
        disabled={isPending}
      >
        {isPending ? (
          <CircleLoading color={Colors.textHighlightColor} size={25} />
        ) : (
          <Text className="font-bold">
            <Trans>Next</Trans>
          </Text>
        )}
      </Button>
    </View>
  );
}
