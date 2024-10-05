import { TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { MakePaymentInfoProps } from "~/types";
import { Text } from "../ui/text";
import { Skeleton } from "../ui/skeleton";
import Colors from "~/constants/Colors";

export default function MakePaymentInfo({
  title,
  text,
  style,
  isLoading,
  copyItem,
}: MakePaymentInfoProps) {
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
  // const fetchCopiedText = async () => {
  //   setCopiedText(text);
  // };

  return (
    <View style={[style]} className="mt-2">
      <View className="flex-row justify-between items-center mt-2">
        <View>
          <Text>{title}</Text>
        </View>
        <View>
          {isLoading ? (
            <Skeleton className="w-32 h-6" />
          ) : (
            <View className="flex flex-row gap-3 items-center justify-center">
              {copyItem && (
                <TouchableOpacity
                  accessibilityRole="button"
                  onPress={() => copyToClipboard(text)}
                >
                  {copiedText ? (
                    <Ionicons
                      name="checkmark-done"
                      size={15}
                      color={Colors.green_1}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="content-copy"
                      size={15}
                      color="black"
                    />
                  )}
                </TouchableOpacity>
              )}
              <Text className="text-center">{text}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
