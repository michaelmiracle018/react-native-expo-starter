import { TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import * as Clipboard from "expo-clipboard";
import { OrderAmountInfoProps } from "~/types";
import { Text } from "../ui/text";

export default function OrderAmountInfo({
  currency,
  amount,
  title,
  withCurrency,
  style,
  canCopyText = false,
}: OrderAmountInfoProps) {
  const [copiedText, setCopiedText] = useState("");
  const toast = useToast();
  const copyToClipboard = async (data: any) => {
    await Clipboard.setStringAsync(data);
    const text = await Clipboard.getStringAsync();
    if (text) {
      toast.hideAll();
      setCopiedText(text);
      toast.show(`Text copied to clipboard`, {
        animationDuration: 300,
      });
      setTimeout(() => {
        setCopiedText("");
      }, 10000);
    }
  };
  return (
    <View style={[style]} className="mt-2">
      {withCurrency ? (
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-base font-normal">{title}</Text>
          <View className="flex-row gap-2">
            <Text className="text-base font-normal">{amount}</Text>
            <Text className="text-base font-normal">{currency}</Text>
          </View>
        </View>
      ) : canCopyText ? (
        <View className="flex-row justify-between items-cwnter">
          <Text className="text-base font-normal">{title}</Text>
          <TouchableOpacity onPress={() => copyToClipboard(amount)}>
            <Text className="border border-dashed border-gray-200 text-primary_2 text-base font-normal">
              {amount}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex-row justify-between items-cwnter">
          <Text className="text-base font-normal">{title}</Text>
          <Text className="text-base font-normal">{amount}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textStyles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
});
