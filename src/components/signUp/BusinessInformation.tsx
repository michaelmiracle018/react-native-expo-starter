import { View } from "react-native";
import React, { useMemo } from "react";
import { Text } from "../ui/text";
import { CircleAlert } from "~/lib/icons/CircleAlert";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import BackgroundInput from "../customInput/BackgroundInput";
import { Controller } from "react-hook-form";
import InputErrorMessage from "../inputErrorMessage/InputErrorMessage";
import countriesJson from "~/assets/countries/countries.json";
import { businessType, incorporationItems } from "~/shared/sharedData";
import WarningSign from "../CustomSign/WarningSign";
import { t, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import DropDownHeader from "../DropDownHeader";
import ComboSelector from "../ui/DropDownSelector/ComboSelector";
import Colors from "~/constants/Colors";

type Props = {
  errors: any;
  control: any;
  PrevFormStep: () => void;
  nextFormStep: () => void;
  watchBusinessType: any;
};
export default function BusinessInformation({
  errors,
  control,
  PrevFormStep,
  nextFormStep,
  watchBusinessType,
}: Props) {
  const listCountries = useMemo(() => {
    const getFilterItems = countriesJson.filter(
      (item) => item.isActive === true,
    );

    return getFilterItems.map((item) => ({
      label: `${item?.name}`,
      value: item?.name,
    }));
  }, []);
  const { i18n } = useLingui();
  return (
    <View>
      <View className="flex-row mt-10 items-center gap-0">
        {/* Header  */}
        <Text className="native:text-2xl font-bold text-left ">
          <Trans>Business Information</Trans>
        </Text>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost">
              <CircleAlert className="text-destructive" size={20} />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <View className="justify-center items-center mb-2">
                <WarningSign />
              </View>
              <AlertDialogTitle>
                <Trans>Business Information</Trans>
              </AlertDialogTitle>
              <AlertDialogDescription>
                <Trans>
                  Please ensure that the provided information should correspond
                  to your [Passport or ID Card] information.
                </Trans>
              </AlertDialogDescription>
              <AlertDialogDescription>
                <Trans>
                  Information provided will be verified against your KYC/KYB
                  (Know Your Customer/Know Your Business) verification.
                </Trans>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                <Text>
                  <Trans>Ok</Trans>
                </Text>
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {/* Header  */}
      </View>
      <View>
        <View className="bg-transparent/5 p-2 rounded-2xl w-full mt-8 mb-5">
          <Controller
            control={control}
            rules={{
              required: t(i18n)`This field is required.`,
              maxLength: 12,
            }}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <ComboSelector
                  selectedValue={value}
                  onValueChange={(value: string) => {
                    onChange(value);
                  }}
                  canUnSelect={true}
                  label={t(i18n)`Business Type`}
                  options={businessType}
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
                  modalOptionsContainerStyle={{ maxHeight: "88%" }}
                  listHeaderComponent={
                    <DropDownHeader>
                      <Text className="mt-1 mb-4 text-lg font-bold">
                        Select a business type
                      </Text>
                    </DropDownHeader>
                  }
                />
              );
            }}
            name="businessType"
          />
          <InputErrorMessage errors={errors} name="businessType" />
        </View>
      </View>
      <View className="mt-2">
        <BackgroundInput
          trimText={true}
          nativeID="businessName"
          control={control}
          name="businessName"
          label={t(i18n)`Business Name`}
          placeholder="Enter your business name"
          errors={errors}
          inputErr={errors.businessName?.type === "required"}
          required={t(i18n)`This field is required.`}
        />
      </View>
      <View>
        {watchBusinessType === "REGISTERED" && (
          <>
            <View className="bg-transparent/5 p-2 rounded-2xl w-full mt-5 mb-5">
              <Controller
                control={control}
                rules={{
                  required: t(i18n)`This field is required.`,
                  maxLength: 12,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <ComboSelector
                    selectedValue={value}
                    onValueChange={(value: string) => {
                      onChange(value);
                    }}
                    canUnSelect={true}
                    label={t(i18n)`Incorporation Type`}
                    options={incorporationItems}
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
                    modalOptionsContainerStyle={{ maxHeight: "88%" }}
                    listHeaderComponent={
                      <DropDownHeader>
                        <Text className="mt-1 mb-4 text-lg font-bold">
                          Select a business type
                        </Text>
                      </DropDownHeader>
                    }
                  />
                )}
                name="incorporationType"
              />
              <InputErrorMessage errors={errors} name="incorporationType" />
            </View>
            <View className="bg-transparent/5 p-2 rounded-2xl w-full mt-3 mb-5">
              <Controller
                control={control}
                rules={{
                  required: t(i18n)`This field is required.`,
                  maxLength: 12,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <ComboSelector
                    selectedValue={value}
                    onValueChange={(value: string) => {
                      onChange(value);
                    }}
                    canUnSelect={true}
                    label={t(i18n)`Incorporation Country`}
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
                    modalOptionsContainerStyle={{ maxHeight: "88%" }}
                    listHeaderComponent={
                      <DropDownHeader>
                        <Text className="mt-1 mb-4 text-lg font-bold">
                          Select a business type
                        </Text>
                      </DropDownHeader>
                    }
                  />
                )}
                name="incorporationCountry"
              />
              <InputErrorMessage errors={errors} name="incorporationCountry" />
            </View>
            <View className="mt-3">
              <BackgroundInput
                trimText={true}
                nativeID="registrationNumber"
                control={control}
                name="registrationNumber"
                label={t(i18n)`Registration Number`}
                placeholder={t(i18n)`Enter your registration number`}
                errors={errors}
                inputErr={errors.registrationNumber?.type === "required"}
                required={t(i18n)`This field is required.`}
              />
              <View className="mt-5">
                <BackgroundInput
                  trimText={true}
                  nativeID="website"
                  control={control}
                  name="website"
                  label={t(i18n)`Website`}
                  placeholder={t(i18n)`Enter your wevsite`}
                  errors={errors}
                  inputErr={errors.website?.type === "required"}
                  required={false}
                />
              </View>
            </View>
          </>
        )}
      </View>

      <View className="mt-5 mb-10">
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
            size="default"
            onPress={nextFormStep}
          >
            <Text className="font-bold">
              <Trans>Next</Trans>
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
