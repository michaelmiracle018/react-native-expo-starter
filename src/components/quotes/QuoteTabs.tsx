import { View } from "react-native";
import React from "react";
import LeftQuoteCurrencySelector from "./LeftQuoteCurrencySelector";
import RightQuoteCurrencySelector from "./RightQuoteCurrencySelector";

export default function QuoteTabs() {
  return (
    <View className="bg-white spacing-1 flex-row justify-between items-center pt-3 pb-3">
      <View>
        <LeftQuoteCurrencySelector />
      </View>
      <View>
        <RightQuoteCurrencySelector />
      </View>
    </View>
  );
}
