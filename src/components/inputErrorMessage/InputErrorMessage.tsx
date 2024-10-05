import { View, Text } from "react-native";
import React from "react";
import { ErrorMessage } from "@hookform/error-message";

type Props = {
  errors: any;
  name: string;
};

export default function InputErrorMessage({ errors, name }: Props) {
  return (
    <View>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <Text className="text-destructive">{message}</Text>
        )}
      />
    </View>
  );
}
