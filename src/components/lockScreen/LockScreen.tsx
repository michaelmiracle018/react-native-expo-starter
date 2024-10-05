import React, { Dispatch } from "react";
import { View, Text, ViewStyle, Pressable } from "react-native";
import LockScreenTop from "./LockScreenTop";
import LockScreenBottom from "./LockScreenBottom";

const getTime = (timer: number) => {
  function round(value: number, precision: number) {
    let multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  let mins = (timer % 60).toString();
  if (mins.length == 1) {
    mins = `0${mins}`;
  }
  return `${round(timer / 60, 0)}:${mins}`;
};

interface CheckLockInterface {
  initBlockTime?: number;
  initErrorMsg?: string;
  input: string[];
  validInput: string[];

  /* actions */
  onValidInput?: (wrongAttempts: number) => void;

  /* buildInComponents */
  buildInTopComponentOptions?: {
    label: string;
    filledColor?: string;
    unfilledColor?: string;
  };
  buildInBottomComponentOptions?: {
    bottomComponent: {
      label: string;
      onPress: () => void;
    };
  };
  /* custom components */
  customTopComponent?: (currentInput: string[], wrongAttempts: number) => void;
  customBottomComponent?: (
    currentInput: string[],
    setCurrentInput: Dispatch<string[]>,
    wrongAttempts: number,
    blockedInput: boolean,
  ) => void;

  errors: {}; // key attempts vlues {tine: number in secounds, errorMessage: string}

  /* styles */
  containerStyle?: ViewStyle;
}

type LockScreenProps = CheckLockInterface;

// eslint-disable-next-line react/display-name
const LockScreen: React.FC<LockScreenProps> = React.memo((props) => {
  /* check states */
  const [currentInput, setCurrentInput] = React.useState<string[]>([]);
  const [wrongAttempts, setWrongAttempts] = React.useState<number>(0);
  const [blockedInput, setBlockedInput] = React.useState<boolean>(
    !!props.initBlockTime,
  );
  const [blockedTime, setBlockedTime] = React.useState<number>(
    props.initBlockTime ? props.initBlockTime : 0,
  );
  const [blockedErrorMsg, setBlockedErrorMsg] = React.useState<string>(
    props.initErrorMsg ? props.initErrorMsg : "",
  );

  /* blockedTime count */
  React.useEffect(() => {
    const interval = setInterval(() => {
      setBlockedTime((time) => {
        let newTime = Math.max(0, time - 1);
        if (newTime === 0) {
          setBlockedInput(false);
        }
        return newTime; // avoiding negative number rerender
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    if (blockedTime === 0 && blockedErrorMsg === "") {
      return;
    }
    if (blockedTime === 0) {
      setBlockedErrorMsg("");
      return;
    }
    if (wrongAttempts in props.errors) {
      // @ts-ignore
      let errorObj: { errorMessage: string } = props.errors[wrongAttempts];
      setBlockedErrorMsg(
        errorObj.errorMessage.replace(
          "#_BLOCKED_TIME_COUNTDOWN_#",
          getTime(blockedTime),
        ),
      );
    }
  }, [blockedTime]);

  React.useEffect(() => {
    if (currentInput.length === 0) {
      return;
    }

    if (props.validInput.length === currentInput.length) {
      let equals = props.validInput.every(
        (val, index) => val === currentInput[index],
      );
      if (equals) {
        setCurrentInput([]);

        if (props.onValidInput) {
          props.onValidInput(wrongAttempts);
        }

        return;
      }

      setCurrentInput([]);
      let newWrongAttempts = wrongAttempts + 1;
      setWrongAttempts(newWrongAttempts);

      if (newWrongAttempts in props.errors) {
        // @ts-ignore
        let errorObj: { time: number } = props.errors[newWrongAttempts];
        setBlockedInput(true);
        setBlockedTime(errorObj.time);
      } else if (blockedInput) {
        setBlockedInput(false);
      }
    }
  }, [currentInput]);

  const renderTop = React.useMemo(() => {
    if (typeof props.customTopComponent !== "undefined") {
      return props.customTopComponent(currentInput, wrongAttempts);
    }

    return (
      <LockScreenTop
        label={
          props.buildInTopComponentOptions?.label
            ? props.buildInTopComponentOptions?.label
            : ""
        }
        validInput={props.validInput}
        currentInput={currentInput}
        wrongAttempts={wrongAttempts}
        errorMsg={blockedErrorMsg}
        identifierColors={{
          filled: props.buildInTopComponentOptions?.filledColor
            ? props.buildInTopComponentOptions.filledColor
            : "#00A1FC",
          unfilled: props.buildInTopComponentOptions?.unfilledColor
            ? props.buildInTopComponentOptions.unfilledColor
            : "#696767",
        }}
      />
    );
  }, [currentInput, wrongAttempts, blockedErrorMsg]);

  const renderBottom = React.useMemo(() => {
    if (typeof props.customBottomComponent !== "undefined") {
      return props.customBottomComponent(
        props.input,
        setCurrentInput,
        wrongAttempts,
        blockedInput,
      );
    }

    return (
      <LockScreenBottom
        input={props.input}
        setCurrentInput={setCurrentInput}
        wrongAttempts={wrongAttempts}
        blockedInput={blockedInput}
        bottomComponentLabel={
          props.buildInBottomComponentOptions
            ? props.buildInBottomComponentOptions.bottomComponent.label
            : ""
        }
        bottomComponentOnPress={
          props.buildInBottomComponentOptions
            ? props.buildInBottomComponentOptions.bottomComponent.onPress
            : () => {}
        }
      />
    );
  }, [wrongAttempts, blockedInput]);

  return (
    <View style={[{ flex: 1 }, props.containerStyle]}>
      {/* top */}
      {renderTop}

      {/* bottom */}
      {renderBottom}
    </View>
  );
});

export default LockScreen;
export { LockScreenProps, CheckLockInterface };
