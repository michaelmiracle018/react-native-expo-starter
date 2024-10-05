import { View, Text, LayoutChangeEvent, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { cn } from "~/lib/utils";
import { useQuoteSelectorControls } from "~/context/quoteContext";

export enum CustomTabs {
  Tab1,
  Tab2,
  Tab3,
}

export type TabButtonType = {
  title: string;
};

export type TabButtonProps = {
  buttons: TabButtonType[];
  selectedTab: number;
  setSelectedTab: (index: number) => void;
};
export default function CreateQuoteSlideTabs() {
  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });
  const [selectedTab, setSelectedTab] = useState<CustomTabs>(0);
  const buttons: TabButtonType[] = [
    { title: "Buy Currency" },
    { title: "Sell Currency" },
  ];
  const { setSelectQuoteTradeType } = useQuoteSelectorControls();
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

  const tabPositionX = useSharedValue(0);
  const onTabPress = (index: number) => {
    tabPositionX.value = withTiming(buttonWidth * index, {}, () => {
      runOnJS(handlePress)(index);
    });
  };
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  return (
    <View className="mt-3 mb-3">
      <View className="bg-info rounded-none justify-center">
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
            const color = selectedTab === index ? "#000" : "#fff";
            return (
              <TouchableOpacity
                activeOpacity={1}
                key={index}
                style={{ flex: 1, paddingVertical: 10 }}
                onPress={() => {
                  if (button.title === "Sell Currency") {
                    setSelectQuoteTradeType("Sell");
                  } else {
                    setSelectQuoteTradeType("Buy");
                  }
                  onTabPress(index);
                }}
              >
                <Text
                  style={{ color: color }}
                  className="self-center font-bold text-lg"
                >
                  {button.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}
