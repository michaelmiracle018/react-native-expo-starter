import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { RefObject } from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Colors from "~/constants/Colors";
import { storeDataInStorage } from "~/utils/storageData";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedFeather = Animated.createAnimatedComponent(Feather);

type ButtonProps = {
  flatListRef: RefObject<FlatList>;
  flatListIndex: SharedValue<number>;
  dataLength: number;
};

export function OnboardingButton({
  dataLength,
  flatListIndex,
  flatListRef,
}: ButtonProps) {
  const buttonAnimationStyle = useAnimatedStyle(() => {
    const isLastScreen = flatListIndex.value === dataLength - 1;
    return {
      width: isLastScreen ? withSpring(140) : withSpring(60),
      height: 60,
    };
  });

  const arrowAnimationStyle = useAnimatedStyle(() => {
    const isLastScreen = flatListIndex.value === dataLength - 1;
    return {
      opacity: isLastScreen ? withTiming(0) : withTiming(1),
      transform: [
        { translateX: isLastScreen ? withTiming(100) : withTiming(0) },
      ],
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    const isLastScreen = flatListIndex.value === dataLength - 1;
    return {
      opacity: isLastScreen ? withTiming(1) : withTiming(0),
      transform: [
        { translateX: isLastScreen ? withTiming(0) : withTiming(-100) },
      ],
    };
  });

  const handleNextScreen = () => {
    const isLastScreen = flatListIndex.value === dataLength - 1;
    if (isLastScreen) {
      storeDataInStorage("isUserOnboarded", true);
      router.push("/(auth)/login");
    }
    if (!isLastScreen) {
      flatListRef.current?.scrollToIndex({ index: flatListIndex.value + 1 });
    }
  };

  return (
    <AnimatedPressable
      onPress={handleNextScreen}
      style={[styles.container, buttonAnimationStyle]}
    >
      <Animated.Text style={[styles.text, textAnimationStyle]}>
        Get Started
      </Animated.Text>

      <AnimatedFeather
        name="arrow-right"
        size={30}
        color={Colors.textHighlightColor}
        style={[styles.arrow, arrowAnimationStyle]}
      />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundHighlightColor,
    padding: 10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  arrow: {
    position: "absolute",
  },
  text: {
    position: "absolute",
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.textHighlightColor,
  },
});
