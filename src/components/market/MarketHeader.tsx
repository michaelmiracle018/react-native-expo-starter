import { View } from "react-native";
import React, { memo } from "react";
import { Text } from "../ui/text";
import { Headset } from "~/lib/icons/Headset";
import { User } from "~/lib/icons/User";
import { Button } from "../ui/button";
import MarketSlideTabs from "./MarketSlideTabs";
import { router } from "expo-router";
import { Trans } from "@lingui/macro";

const MarketHeader = () => {
  const goToProfile = () => {
    router.push("/(authenticated)/profile");
  };
  return (
    <View className="pb-3">
      <View className="bg-primary_1 w-full spacing-1 py-3">
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-2xl font-bold">
            <Trans>Fx Markets</Trans>
          </Text>
          <View className="flex-center flex-row gap-4">
            <Button className="bg-white p-1" size={"icon"}>
              <Headset className="text-primary_1" size={25} />
            </Button>
            <Button
              className="bg-white p-1"
              size={"icon"}
              onPress={goToProfile}
            >
              <User className="text-primary_1" size={25} />
            </Button>
          </View>
        </View>
      </View>
      <View className="spacing-1">
        <MarketSlideTabs />
      </View>
      {/* <Separator className="mt-2" /> */}
    </View>
  );
};

export default memo(MarketHeader);
