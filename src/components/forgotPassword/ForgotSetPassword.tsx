import { View } from "react-native";
import React from "react";
import BackgroundInput from "../customInput/BackgroundInput";
import PasswordValidateCheck from "../PasswordValidateCheck/PasswordValidateCheck";
import { Text } from "../ui/text";
import { userForgotPasswordProps } from "~/app/(auth)/forgetPassword";
import { Button } from "../ui/button";
import { UseFormHandleSubmit } from "react-hook-form";
import CircleLoading from "../loader/CircleLoading";
import Colors from "~/constants/Colors";
import { t, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
type Props = {
  nextFormStep: () => void;
  PrevFormStep: () => void;
  control: any;
  errors: any;
  email: string;
  password: string;
  setValidated: (value: boolean) => void;
  onSubmit: (value: userForgotPasswordProps) => void;
  handleSubmit: UseFormHandleSubmit<userForgotPasswordProps, undefined>;
  isLoadingResetPassword: boolean;
};
export default function ForgotSetPassword({
  PrevFormStep,
  control,
  errors,
  password,
  setValidated,
  email,
  onSubmit,
  handleSubmit,
  isLoadingResetPassword,
}: Props) {
  const { i18n } = useLingui();

  return (
    <View>
      <Text className="native:text-2xl font-bold mt-10">
        <Trans>Enter your password</Trans>
      </Text>
      <View className="pt-5">
        <BackgroundInput
          trimText={true}
          nativeID="password"
          control={control}
          name="password"
          label={t(i18n)`Password`}
          placeholder={t(i18n)`Enter your password`}
          errors={errors}
          inputErr={errors.password?.type === "required"}
          secureTextEntry={true}
          required={t(i18n)`This field is required.`}
        />
        {password.length > 0 && (
          <PasswordValidateCheck
            newPassword={password}
            onPasswordValidateChange={(validatedBoolean) =>
              setValidated(validatedBoolean)
            }
            iconStyle={{ width: 17, height: 17 }}
            validationRules={[
              {
                key: "MIN_LENGTH",
                ruleValue: 8,
                label: t(i18n)`Should contain more than 8 characters`,
              },
              {
                key: "UPPERCASE_LETTER",
                label: t(i18n)`Should contain at least one uppercase letter`,
              },
              {
                key: "LOWERCASE_LETTER",
                label: t(i18n)`Should contain at least one lowercase letter`,
              },
              {
                key: "NUMERIC",
                label: t(i18n)`Should contain at least one numeric`,
              },
              {
                key: "SPECIAL_CHARS",
                label: t(i18n)`Should contain at least one special character`,
              },
            ]}
          />
        )}
        <View className="pt-5">
          <BackgroundInput
            trimText={true}
            nativeID="confirmPassword"
            control={control}
            name="confirmPassword"
            label={t(i18n)`Retype Password`}
            placeholder={t(i18n)`Enter your password`}
            errors={errors}
            inputErr={errors.confirmPassword?.type === "required"}
            secureTextEntry={true}
            validate={(value: string) =>
              value === password || t(i18n)`password does not match`
            }
            required={t(i18n)`This field is required.`}
          />
        </View>
        <View className="flex-row gap-2">
          {!isLoadingResetPassword && (
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
            onPress={handleSubmit(onSubmit)}
            size="default"
            disabled={isLoadingResetPassword}
          >
            {isLoadingResetPassword ? (
              <CircleLoading color={Colors.textHighlightColor} size={25} />
            ) : (
              <Text className="font-bold">
                <Trans>Submit</Trans>
              </Text>
            )}
          </Button>
        </View>
      </View>
    </View>
  );
}
