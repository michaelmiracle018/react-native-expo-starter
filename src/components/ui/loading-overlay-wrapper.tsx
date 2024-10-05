/* eslint-disable react/display-name */
import { Image, Modal, View } from "react-native";
import React from "react";
import { cn } from "#/lib/utils";
import { isIOS } from "#/lib/platform/detection";
import ContentLoader from "../loader/ContentLoader";

const LoadingOverlayWrapper = React.forwardRef<
  React.ElementRef<typeof Modal>,
  React.ComponentPropsWithoutRef<typeof Modal> & {
    isLoading: boolean;
  }
>(
  (
    {
      className,
      children,
      visible,
      isLoading,
      animationType = "fade",
      ...props
    },
    ref,
  ) => {
    return (
      <>
        <>{children}</>
        {isLoading && (
          <Modal
            ref={ref}
            animationType={animationType}
            transparent={true}
            visible={isLoading}
            statusBarTranslucent
            {...props}
          >
            <View
              className={cn(
                "flex-1 justify-center items-center p-2",
                animationType !== "slide" &&
                  "bg-gray-200/70 dark:bg-zinc-900/80",
              )}
            >
              <View
                className={cn(
                  " rounded-2xl p-8  w-[97%] flex-center",
                  className,
                )}
              >
                {isIOS ? (
                  <ContentLoader />
                ) : (
                  <Image
                    source={require("../../assets/images/preloader.gif")}
                    className="w-24 h-24"
                  />
                )}
              </View>
            </View>
          </Modal>
        )}
      </>
    );
  },
);

export default LoadingOverlayWrapper;
