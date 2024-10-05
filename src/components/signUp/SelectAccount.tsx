import { Card, CardDescription } from "~/components/ui/card";
import { ChevronRight } from "~/lib/icons/ChevronRight";
import { Text } from "~/components/ui/text";
import { User } from "~/lib/icons/User";
import { BriefcaseBusiness } from "~/lib/icons/BriefcaseBusiness";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Trans } from "@lingui/macro";
type Props = {
  nextFormStep: () => void;
  setValue: any;
  reset: () => void;
};
export default function SelectAccount({
  nextFormStep,
  setValue,
  reset,
}: Props) {
  return (
    <View>
      <Text className="font-bold native:text-2xl mt-10">
        <Trans>Choose an account type</Trans>
      </Text>
      <View className="justify-center flex-1 gap-10 mt-10">
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            reset();
            setValue("accountName", "INDIVIDUAL", {
              shouldValidate: false,
            });
            nextFormStep();
          }}
        >
          <View>
            <Card className="py-5 flex-center flex-row gap-3">
              <User className="text-primary" size={44} />

              <View>
                <CardDescription className="font-bold native:text-xl">
                  <Trans>Personal Account</Trans>
                </CardDescription>
                <CardDescription className="text-base text-[.8rem] font-semibold w-60">
                  <Trans>Trade fx quotes with verified merchants.</Trans>
                </CardDescription>
              </View>
              <ChevronRight className="text-primary" size={34} />
            </Card>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            reset();
            setValue("accountName", "BUSINESS", {
              shouldValidate: false,
            });
            nextFormStep();
          }}
        >
          <View>
            <Card className="py-5 flex-center flex-row gap-3">
              <BriefcaseBusiness className="text-primary" size={44} />
              <View>
                <CardDescription className="font-bold native:text-xl">
                  <Trans>Business Account</Trans>
                </CardDescription>
                <CardDescription className="text-base native:text-[.8rem] font-semibold w-60">
                  <Trans>Create an account to have more access.</Trans>
                </CardDescription>
              </View>
              <ChevronRight className="text-primary" size={34} />
            </Card>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
