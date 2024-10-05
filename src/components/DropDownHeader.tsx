import { View } from "react-native";
import { Separator } from "./ui/separator";

export default function DropDownHeader({ children }: any) {
  return (
    <View className="flex-center sticky">
      <View>
        <View className="flex-center">
          <View className="h-1 w-8 bg-black/80 rounded-md" />
        </View>
        {children}
      </View>
    </View>
  );
}
