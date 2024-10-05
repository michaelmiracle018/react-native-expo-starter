import { View, ViewStyle } from "react-native";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Text } from "../ui/text";
import { addCommas } from "~/utils/addCommas";
type MarkwrtPaymentInfoProps = {
  calculatedAmountInfo: boolean;
  isLoading: boolean;
  title: string;
  amount: number;
  currency: string;
  containerStyle?: ViewStyle;
};
export default function MarketOrderPaymentInfo({
  calculatedAmountInfo,
  isLoading,
  title,
  amount,
  currency,
  containerStyle,
}: MarkwrtPaymentInfoProps) {
  return (
    <View>
      <View style={containerStyle}>
        <View className="flex-row justify-between items-center mt-2 gap-3">
          <Text className="font-normal w-52">{title}</Text>

          <View>
            {!calculatedAmountInfo ? (
              <>
                {isLoading ? (
                  <Skeleton className="w-32 h-6" />
                ) : (
                  <Text className="font-bold">0.00</Text>
                )}
              </>
            ) : (
              <>
                {isLoading ? (
                  <Skeleton className="w-32 h-6" />
                ) : (
                  <Text className="font-bold">
                    {addCommas(amount)} {currency}
                  </Text>
                )}
              </>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
