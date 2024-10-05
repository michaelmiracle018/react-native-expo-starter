import React, { useMemo, useState } from "react";
import { View, StyleSheet, Animated, TouchableOpacity } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import Colors from "#/constants/Colors";
import { Text } from "./ui/text";

const CheckInternetConnection = ({ children }: any) => {
  const [isConnected, setIsConnected] = useState<any>(true);
  const animation = React.useRef(new Animated.Value(0)).current;

  React.useMemo(() => {
    Animated.timing(animation, {
      toValue: isConnected ? 1 : 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [animation, isConnected]);

  const reConnect = () => {
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected);
    });
  };

  useMemo(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        setIsConnected(state.isConnected);
      } else {
        reConnect();
        setIsConnected(state.isConnected);
      }
    });
    // unsubscribe
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <>{children}</>
      {!isConnected && (
        <View
          style={[
            {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 99,
            },
          ]}
        >
          <View
            style={[
              ,
              {
                backgroundColor: Colors.grayDark,
                height: 120,
                width: "90%",
                borderRadius: 8,
              },
            ]}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 10,
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginBottom: 5,
                }}
                className="text-white"
              >
                Connection Error
              </Text>
              <Text style={{ color: "#fff", fontSize: 12 }}>
                Oops! Looks like your device is not connected to the Internet.
              </Text>

              <TouchableOpacity
                onPress={reConnect}
                activeOpacity={1}
                style={{
                  marginTop: 10,
                  backgroundColor: "#fff",
                  borderRadius: 2,
                  width: 80,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                  Retry
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    opacity: 0.3,
  },
});

export default CheckInternetConnection;
