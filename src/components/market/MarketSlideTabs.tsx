import { View, Text, LayoutChangeEvent, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { cn } from "~/lib/utils";
import { useMarketSelectorControls } from "~/context/marketContext";
import { useLingui } from "@lingui/react";
import { t } from "@lingui/macro";

export enum CustomTabs {
  Tab1,
  Tab2,
}

export type TabButtonType = {
  title: string;
};

export type TabButtonProps = {
  buttons: TabButtonType[];
  selectedTab: number;
  setSelectedTab: (index: number) => void;
};
export default function MarketSlideTabs() {
  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });
  const [selectedTab, setSelectedTab] = useState<CustomTabs>(CustomTabs.Tab1);
  const buttons: TabButtonType[] = [{ title: "Buy" }, { title: "Sell" }];
  const { setTradingType } = useMarketSelectorControls();
  const buttonWidth = dimensions.width / buttons.length;
  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };
  const handlePress = (index: number) => {
    setSelectedTab(index);
  };
  const { i18n } = useLingui();

  const tabPositionX = useSharedValue(0);
  const onTabPress = (index: number) => {
    tabPositionX.value = withTiming(buttonWidth * index, {}, () => {
      runOnJS(handlePress)(index);
    });
  };
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(tabPositionX.value, {
            duration: 10,
            easing: Easing.inOut(Easing.quad),
          }),
        },
      ],
    };
  });
  return (
    <View className="mt-3 mb-3">
      <View className="bg-stone-200 rounded-md justify-center">
        <Animated.View
          className={cn("bg-white absolute rounded-md my-2 mx-1")}
          style={[
            animatedStyle,
            {
              height: dimensions.height - 10,
              width: buttonWidth - 10,
            },
          ]}
        />
        <View style={{ flexDirection: "row" }} onLayout={onTabbarLayout}>
          {buttons.map((button, index) => {
            const color = selectedTab === index ? "#000" : "#000";
            return (
              <TouchableOpacity
                activeOpacity={1}
                key={index}
                style={{ flex: 1, paddingVertical: 10 }}
                onPress={() => {
                  setTradingType(button.title);
                  onTabPress(index);
                }}
              >
                <Text
                  style={{ color: color }}
                  className="self-center font-bold text-lg"
                >
                  {button.title === "Buy" ? t(i18n)`Buy` : t(i18n)`Sell`}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}
