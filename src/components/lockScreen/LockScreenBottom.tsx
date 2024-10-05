import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const INPUT_SIZE = 65;

interface LockScreenBottomProps {
  input: string[];
  setCurrentInput: React.Dispatch<(currentInput: string[]) => string[]>;
  wrongAttempts: number;
  blockedInput: boolean;

  bottomComponentLabel: string;
  bottomComponentOnPress: () => void;
}

const LockScreenBottom: React.FC<LockScreenBottomProps> = (props) => {
  const shakeTranslateX = useSharedValue<number>(0);
  const shakeInputRange = [0, 0.5, 1, 1.5, 2, 2.5, 3];
  const shakeOutputRange = [0, -15, 0, -15, 0, 15, 0];

  React.useEffect(() => {
    if (props.wrongAttempts !== 0) {
      triggerShake();
    }
  }, [props.wrongAttempts]);

  const triggerShake = () => {
    shakeTranslateX.value = 0;
    shakeTranslateX.value = withTiming(3, { duration: 600 });
  };

  const rStyleShake = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            shakeTranslateX.value,
            shakeInputRange,
            shakeOutputRange,
          ),
        },
      ],
    };
  });

  const renderInputs = React.useMemo(() => {
    let textColor = props.blockedInput ? "gray" : "black";

    return (
      <Animated.View style={[rStyleShake, styles.inputsContainer]}>
        {props.input.map((input, index) => {
          return (
            <Pressable
              key={index}
              style={[styles.input]}
              onPress={() => {
                if (props.blockedInput) {
                  return;
                }
                props.setCurrentInput((currentInput: string[]) => {
                  return [...currentInput, input];
                });
              }}
            >
              <Text style={{ fontSize: INPUT_SIZE - 30, color: textColor }}>
                {input}
              </Text>
            </Pressable>
          );
        })}
      </Animated.View>
    );
  }, [props.blockedInput]);

  return (
    <View style={[{ height: "50%", alignItems: "center" }]}>
      {/* inputs */}
      {renderInputs}

      {/* bottom action */}
      <Pressable
        onPress={() => {
          props.bottomComponentOnPress();
        }}
      >
        <Text style={{ color: "#00A1FC" }}>{props.bottomComponentLabel}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  inputsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "85%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: INPUT_SIZE,
    height: INPUT_SIZE,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LockScreenBottom;
export { LockScreenBottomProps };
