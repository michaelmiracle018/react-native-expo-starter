import { View } from "react-native";
import BackgroundInput from "../customInput/BackgroundInput";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { useState } from "react";
import OtpEmailCode from "./OtpEmailCode";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "react-native-toast-notifications";
import { serviceSmsOtpEmail } from "~/services/auth.service";
import { SendEmailProp } from "~/types";
import { displayErrorMessage } from "~/utils/displayErrorMessage";
import CircleLoading from "../loader/CircleLoading";
import Colors from "~/constants/Colors";
import { t, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
type Props = {
  nextFormStep: () => void;
  control: any;
  errors: any;
  email: string;
  setError: any;
  PrevFormStep: () => void;
  trigger: any;
  showTimerEmail: boolean;
  setValue: any;
  setShowTimerEmail: (value: boolean) => void;
};
export default function EmailValidate({
  nextFormStep,
  control,
  errors,
  email,
  setError,
  trigger,
  PrevFormStep,
  showTimerEmail,
  setShowTimerEmail,
  setValue,
}: Props) {
  const [showOtpEmail, setShowOtpEmail] = useState(false);
  const [pinId, setPinId] = useState("");
  const toast = useToast();
  const { i18n } = useLingui();

  // ? MUTATION TO VERIFY EMAIL
  const { mutate, isPending } = useMutation({
    mutationFn: (value: SendEmailProp) => serviceSmsOtpEmail(value),
    onSuccess: async (response: any) => {
      // Invalidate and refetch
      const { result } = response.data;
      setPinId(result.pinId);
      toast.hideAll();
      // const { result } = response.data;
      toast.show(t(i18n)`code has been sent to your email`, {
        type: "custom_toast_without_title",
        animationDuration: 300,
        normalColor: "success",
      });
      setShowTimerEmail(true);
      setShowOtpEmail(true);
    },
    onError: (error: any) => {
      displayErrorMessage(error);
      toast.hideAll();
    },
  });

  const goToEmailOtp = async () => {
    const formFilled = await trigger("email");
    if (!formFilled) return;
    mutate({ email });
  };
  return (
    <>
      {!showOtpEmail && (
        <View>
          <Text className="native:text-2xl font-bold text-left mt-10">
            <Trans>Enter your email</Trans>
          </Text>
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
              inputErr={errors.email?.type === "required"}
              required={t(i18n)`This field is required.`}
            />
            <View className="flex-row gap-2">
              {!isPending && (
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
              )}
              <Button
                variant="info"
                className="shadow shadow-foreground/1 w-full mt-5 flex-1"
                onPress={goToEmailOtp}
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
          </View>
        </View>
      )}
      {showOtpEmail && (
        <OtpEmailCode
          setShowOtpEmail={setShowOtpEmail}
          email={email}
          nextFormStep={nextFormStep}
          showTimerEmail={showTimerEmail}
          setShowTimerEmail={setShowTimerEmail}
          handleResend={() => mutate({ email })}
          pinId={pinId}
          setValue={setValue}
        />
      )}
    </>
  );
}
