import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { X } from "~/lib/icons/X";
import { Check } from "~/lib/icons/Check";
import { cn } from "~/lib/utils";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProfileFootercardProps } from "~/types";
export default function ProfileFootercard({
  verified,
  title,
  toolTipMsg,
  toolTipMsgTitle,
}: ProfileFootercardProps) {
  const triggerRef =
    React.useRef<React.ElementRef<typeof TooltipTrigger>>(null);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  const footerItemsStyle = "flex-row justify-between items-center gap-1";

  return (
    <View>
      <Pressable
        className="absolute top-0 right-0 w-16 h-16 active:bg-primary/5"
        onPress={() => {
          // open programmatically
          triggerRef.current?.open();
        }}
      />
      <Tooltip delayDuration={150}>
        <TooltipTrigger ref={triggerRef} asChild>
          <TouchableOpacity>
            <View className={cn(footerItemsStyle)}>
              {!verified ? (
                <X size={18} className="text-destructive" />
              ) : (
                <Check size={18} className="text-success" />
              )}
              <Text className="text-sm">{title}</Text>
            </View>
          </TouchableOpacity>
        </TooltipTrigger>
        <TooltipContent insets={contentInsets}>
          {toolTipMsgTitle && (
            <Text className="native:text-md">{toolTipMsgTitle}</Text>
          )}
          <Text className="native:text-sm">{toolTipMsg}</Text>
        </TooltipContent>
      </Tooltip>
    </View>
  );
}
