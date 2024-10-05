import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "~/constants/Colors";
import CountDown from "new-react-native-countdown-component";
import { Trans } from "@lingui/macro";

type Props = {
  setShowTimer: (value: boolean) => void;
  showTimer: boolean;
  handleResend?: () => void;
};

export default function ResendCodeTimer({
  setShowTimer,
  showTimer,
  handleResend,
}: Props) {
  // * HANDLE TIMER END FUNCTION
  const handleTimerEnd = () => {
    setShowTimer(false);
    // Do something when the timer ends
  };

  return (
    <View>
      {showTimer ? (
        <View className="flex-center flex-row mt-5 gap-2">
          <Text>
            <Trans>can resend code after</Trans>
          </Text>
          <CountDown
            id="timerCount"
            until={90}
            size={12}
            onFinish={handleTimerEnd}
            digitStyle={{
              backgroundColor: "#FFF",
              borderWidth: 1,
              borderColor: Colors.primary,
            }}
            digitTxtStyle={{
              color: Colors.primary,
              fontSize: 15,
            }}
            separatorStyle={{
              color: Colors.primary,
              fontSize: 15,
            }}
            timeToShow={["M", "S"]}
            timeLabels={{ m: null, s: null }}
            showSeparator
          />
        </View>
      ) : (
        <View className="flex-center flex-row mt-5 gap-2">
          <Text>
            <Trans>Didn't receive a code?</Trans>
          </Text>
          <TouchableOpacity onPress={handleResend}>
            <Text className="text-info font-bold">
              <Trans>Resend</Trans>
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
