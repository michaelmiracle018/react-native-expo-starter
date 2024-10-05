import { View, Text, TouchableOpacity } from "react-native";
import { memo } from "react";
import { Separator } from "../ui/separator";
import { t, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { router } from "expo-router";
import { ChevronRight } from "~/lib/icons/ChevronRight";

function RenderOrderHistoryList() {
  const { i18n } = useLingui();

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => router.push("/orderHistory/collectionStatus")}
    >
      <View className="spacing-1">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center gap-2">
            <Text className="font-semibold text-xl">
              {"Buy" === "Buy" ? t(i18n)`Buy` : t(i18n)`Sell`}
            </Text>
            <Text className="font-semibold text-xl">NGN</Text>
            <Text className="font-normal text-xl">
              {"Buy" === "Buy" ? t(i18n)`With` : t(i18n)`For`}
            </Text>
            <Text className="font-semibold text-xl">GHS</Text>
          </View>
          <View className="flex-row gap-1 items-center">
            <Text className="text-black font-bold">CANCELLED</Text>
            <ChevronRight className="text-info" size={15} />
          </View>
        </View>
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center gap-2 mt-2">
            <Text className="font-normal text-md">XOF</Text>
            <Text className="font-normal text-md">100</Text>
            <Text className="font-normal text-md">=</Text>
            <Text className="font-normal text-md">GHS</Text>
            <Text className="font-normal text-md">2.51</Text>
          </View>
          <View>
            <Text className="font-normal text-md">8,099 GHS</Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between mt-3">
          <Text className="font-nromal text-md">
            <Trans>Created At</Trans>
          </Text>
          <Text className="font-nromal text-md">11/09/1999 6:15:10</Text>
        </View>
        <View className="flex-row items-center justify-between mt-3">
          <Text>Order Number</Text>
          <Text className="font-normal">Ord-37839999900-26662</Text>
        </View>
        <Separator className="mt-2" />
      </View>
    </TouchableOpacity>
  );
}
export default memo(RenderOrderHistoryList);
