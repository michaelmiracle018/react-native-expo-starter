import { View } from "react-native";
import React from "react";
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
import WarningSign from "../CustomSign/WarningSign";
import { t, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";

type Props = {
  errors: any;
  control: any;
  PrevFormStep: () => void;
  nextFormStep: () => void;
};

export default function PersonalInformation({
  errors,
  control,
  PrevFormStep,
  nextFormStep,
}: Props) {
  const { i18n } = useLingui();

  return (
    <View>
      <View className="flex-row mt-10 items-center gap-0">
        {/* Header  */}
        <Text className="native:text-2xl font-bold text-left ">
          <Trans>Personal Information</Trans>
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
                <Trans>Personal Information</Trans>
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
      <View className="mt-5">
        <BackgroundInput
          trimText={true}
          nativeID="firstName"
          control={control}
          name="firstName"
          label={t(i18n)`First Name`}
          placeholder={t(i18n)`Enter your first name`}
          errors={errors}
          inputErr={errors.firstName?.type === "required"}
          required={t(i18n)`This field is required.`}
        />
        <View className="mt-5">
          <BackgroundInput
            trimText={true}
            nativeID="lastName"
            control={control}
            name="lastName"
            label={t(i18n)`Last Name`}
            placeholder={t(i18n)`Enter your last name`}
            errors={errors}
            inputErr={errors.lastName?.type === "required"}
            required={t(i18n)`This field is required.`}
          />
        </View>
        <View className="mt-5">
          <BackgroundInput
            trimText={true}
            nativeID="otherNames"
            control={control}
            name="otherNames"
            label={t(i18n)`Other Names`}
            placeholder={t(i18n)`Enter your other names`}
            errors={errors}
            inputErr={errors.otherNames?.type === "required"}
            required={false}
          />
        </View>
      </View>
      <View className="mt-5">
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
