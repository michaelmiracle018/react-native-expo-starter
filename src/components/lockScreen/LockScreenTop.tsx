import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

interface LockScreenTopProps {
  validInput: string[];
  currentInput: string[];
  wrongAttempts: number;

  label: string;
  errorMsg: string;

  /* styles */
  containerStyle?: ViewStyle;
  textContainerStyle?: ViewStyle;
  textStyle?: ViewStyle;
  identifierColors: {
    filled: string;
    unfilled: string;
  };
}

const LockScreenTop: React.FC<LockScreenTopProps> = (props) => {
  const renderIdentifiers = React.useMemo(() => {
    let filledColor = props.identifierColors.filled;
    let unfilledColor = props.identifierColors.unfilled;

    return (
      <View style={[styles.identifierWrap]}>
        {props.validInput.map((input, index) => {
          return (
            <View
              key={index}
              style={[
                styles.identifier,
                {
                  backgroundColor:
                    props.currentInput.length > index
                      ? filledColor
                      : unfilledColor,
                },
              ]}
            />
          );
        })}
      </View>
    );
  }, [props.currentInput]);

  const renderError = React.useMemo(() => {
    return (
      <View style={[styles.errorContainer]}>
        <Text style={[styles.errorText]}>{props.errorMsg}</Text>
      </View>
    );
  }, [props.errorMsg]);

  return (
    <View style={[styles.container, props.containerStyle]}>
      {/* user image / logo */}
      <View style={{ flex: 1 }}></View>

      {/* text */}
      <View style={[styles.textContainer, props.textContainerStyle]}>
        <Text style={[styles.text, props.textStyle]}>{props.label}</Text>
      </View>

      {/* conde content */}
      <View style={{ flex: 2 }}>
        {/* identifiers */}
        {renderIdentifiers}

        {/* error */}
        {renderError}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#171717",
  },
  identifierWrap: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  identifier: {
    width: 25,
    height: 25,
    borderRadius: 7.5,
    marginHorizontal: 7.5,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
  },
  errorText: {
    textAlign: "center",
    fontWeight: "500",
    color: "#da5159",
  },
});

export default LockScreenTop;
export { LockScreenTopProps };
