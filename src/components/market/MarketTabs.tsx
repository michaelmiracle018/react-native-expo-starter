import { TouchableOpacity, View } from "react-native";
import React from "react";
import LeftCurrencySelector from "./LeftCurrencySelector";
import RightCurrencySelector from "./RightCurrencySelector";
import { ArrowLeftRight } from "~/lib/icons/ArrowLeftRight";
import { cn } from "~/lib/utils";
import { Separator } from "../ui/separator";
import {
  useMarketSelector,
  useMarketSelectorControls,
} from "~/context/marketContext";

export default function MarketTabs() {
  const { setMarketTargetCurrency, setMarketTradingCurrency } =
    useMarketSelectorControls();
  const { marketTargetCurrency, marketTradingCurrency, tradingType } =
    useMarketSelector();

  const handleMarketSwapCurrency = () => {
    setMarketTradingCurrency(marketTargetCurrency);
    setMarketTargetCurrency(marketTradingCurrency);
  };
  return (
    <>
      <View className="bg-white spacing-1 flex-row justify-between items-center mt-3 pb-3">
        <View>
          <LeftCurrencySelector />
        </View>
        <View>
          <View className="">
            <TouchableOpacity
              activeOpacity={1}
              className={cn(
                "rounded-full w-12 h-12 flex-center",
                tradingType === "Buy" ? "bg-primary_2" : "bg-success",
              )}
              onPress={handleMarketSwapCurrency}
            >
              <ArrowLeftRight className="text-white text-center" size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <RightCurrencySelector />
        </View>
      </View>
      <Separator />
    </>
  );
}
