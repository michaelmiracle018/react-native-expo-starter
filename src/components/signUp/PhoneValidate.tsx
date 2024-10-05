import React, { useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import { View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "~/lib/utils";
import countriesJson from "~/assets/countries/countries.json";
import InputErrorMessage from "../inputErrorMessage/InputErrorMessage";
import OtpPhoneCode from "./OtpPhoneCode";
import { phone as validatePhone } from "phone";
import { useMutation } from "@tanstack/react-query";
import { serviceSmsOtpPhone } from "~/services/auth.service";
import { useToast } from "react-native-toast-notifications";
import { displayErrorMessage } from "~/utils/displayErrorMessage";
import CircleLoading from "../loader/CircleLoading";
import Colors from "~/constants/Colors";
import { t, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import ComboSelector from "../ui/DropDownSelector/ComboSelector";
import DropDownHeader from "../DropDownHeader";
type watchCountryProps = {
  countryCode: string;
  currency: string;
  flag: string;
  label: string;
  phoneCode: string;
  value: string;
};

type Props = {
  nextFormStep: () => void;
  control: any;
  errors: any;
  setError: any;
  PrevFormStep: () => void;
  watchCountry: watchCountryProps;
  watchPhoneNumber: string;
  trigger: any;
  showTimerPhone: boolean;
  setShowTimerPhone: (vlaue: boolean) => void;
  setValue: any;
};
export default function PhoneValidate({
  nextFormStep,
  control,
  errors,
  setError,
  watchCountry,
  watchPhoneNumber,
  trigger,
  PrevFormStep,
  setShowTimerPhone,
  showTimerPhone,
  setValue,
}: Props) {
  const [showOtpPhone, setShowOtpPhone] = useState(false);
  const [otpPinId, setOtpPinId] = useState("");
  const dialCode = `+${watchCountry?.phoneCode}`;
  const { i18n } = useLingui();

  const { isValid } = validatePhone(`${dialCode}${watchPhoneNumber}`);
  const toast = useToast();
  const listCountries = useMemo(() => {
    const getFilterItems = countriesJson.filter(
      (item) => item.isActive === true,
    );
    return getFilterItems.map((item) => ({
      label: `${item?.name}`,
      value: `${item?.phoneCode}`,
    }));
  }, []);

  // ? MUTATION FOR PHONE VERIFY
  const { mutate, isPending } = useMutation({
    mutationFn: ({ phoneNumber, dialCode }: any) =>
      serviceSmsOtpPhone({ phoneNumber, dialCode }),
    onSuccess: (response: any) => {
      const { result } = response.data;
      toast.show(t(i18n)`code has been sent to your email`, {
        type: "custom_toast_without_title",
        animationDuration: 300,
        normalColor: "success",
      });
      // Invalidate and refetch
      setOtpPinId(result.pinId);
      setShowOtpPhone(true);
    },
    onError: (error: any) => {
      toast.hideAll();
      displayErrorMessage(error);
    },
  });

  const goToPhoneOtp = async () => {
    const formFilled = await trigger(["phoneNumber", "country"]);
    if (!formFilled) return;
    if (!isValid) {
      setError("phoneNumber", {
        type: "manual",
        message: `Enter a valid number`,
      });
      return;
    }
    mutate({ dialCode, phoneNumber: watchPhoneNumber });
  };

  return (
    <>
      {!showOtpPhone && (
        <View>
          <Text className="native:text-2xl font-bold text-left mt-10 ">
            <Trans>Enter your phone number</Trans>
          </Text>
          <View className="bg-transparent/5 p-2 rounded-2xl w-full mb-7">
            <Controller
              control={control}
              rules={{
                required: `This field is required.`,
                maxLength: 12,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <ComboSelector
                  selectedValue={value}
                  onValueChange={(value: string) => {
                    // selectPaymentType(value);
                    onChange(value);
                  }}
                  canUnSelect={true}
                  label={t(i18n)`Country`}
                  options={listCountries}
                  dropdownStyle={{
                    borderColor:
                      errors.phoneNumber?.type === "required"
                        ? "#ef4444"
                        : "#3C50E0",
                    minHeight: 48,
                    maxHeight: 30,
                    // maxWidth: 100,
                    paddingVertical: 8,
                    paddingHorizontal: 10,
                    borderRadius: 6,
                    backgroundColor: Colors.white,
                    marginTop: -10,
                  }}
                  primaryColor={Colors.darkMint}
                  isSearchable
                  modalOptionsContainerStyle={{ maxHeight: "88%" }}
                  listHeaderComponent={
                    <DropDownHeader>
                      <Text className="mt-1 text-lg font-bold">
                        Select a country
                      </Text>
                    </DropDownHeader>
                  }
                />
              )}
              name="country"
            />
          </View>

          <View>
            <View className="bg-transparent/5 p-2 rounded-2xl w-full mb-2">
              <Label
                className={cn("pb-2 native:pb-1 pl-0.5")}
                nativeID={"phone"}
              >
                <Trans>Phone Number</Trans>
              </Label>
              <View className="flex-row gap-2">
                <View className="flex-row native:h-14 web:w-full rounded-md border border-info bg-background">
                  <View className={cn("flex-center px-2")}>
                    <Text
                      className={cn("native:text-md font-bold flex-center")}
                    >
                      {watchCountry ? `+${watchCountry}` : "____"}
                    </Text>
                  </View>
                </View>
                <View className="w-[83%]">
                  <Controller
                    control={control}
                    rules={{
                      required: `This field is required.`,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        placeholder={t(i18n)`Enter your phone number`}
                        keyboardType="numeric"
                        onBlur={onBlur}
                        value={value}
                        onChangeText={(text) => onChange(text.trim())}
                        className={cn({
                          "border-destructive":
                            errors.phoneNumber?.type === "required",
                        })}
                        placeholderClassName="text-center"
                      />
                    )}
                    name="phoneNumber"
                  />
                </View>
              </View>
              <InputErrorMessage errors={errors} name="phoneNumber" />
            </View>
          </View>
          <View className="mt-5">
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
                size="default"
                onPress={goToPhoneOtp}
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
      {showOtpPhone && (
        <OtpPhoneCode
          setShowOtpPhone={setShowOtpPhone}
          watchPhoneNumber={watchPhoneNumber}
          nextFormStep={nextFormStep}
          otpPinId={otpPinId}
          setShowTimerPhone={setShowTimerPhone}
          showTimerPhone={showTimerPhone}
          handleResend={() =>
            mutate({ dialCode, phoneNumber: watchPhoneNumber })
          }
          setValue={setValue}
        />
      )}
    </>
  );
}
