import { View, Image } from "react-native";
import React from "react";
import images from "~/constants/images";
import { H1, H4 } from "./ui/typography";

export default function NoItemFound({ text }: { text: string }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 50,
      }}
    >
      <Image
        source={images.empty_page}
        style={{ width: 70, height: 70, zIndex: 99 }}
      />
      <H4 className="text-foreground text-center">
        {text ? text : "No Item Found"}
      </H4>
    </View>
  );
}
