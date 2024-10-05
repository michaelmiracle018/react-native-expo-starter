import { View, TouchableOpacity } from "react-native";
import { useToast } from "react-native-toast-notifications";
// import { router } from "expo-router";
import { storeDataInStorage } from "#/utils/storageData";
import { Text } from "./ui/text";
import { cn } from "#/lib/utils";
import { ChevronRight } from "#/lib/icons/ChevronRight";

type Props = {
  tradingCurrency: string | undefined;
  targetCurrency: string | undefined;
  tradeType: string;
  selectPaymentMethodError: any;
  //   targetCountryCode: string;
  //   tradingCountryCode: string;
};

export default function EmptyCreatePayment({
  tradingCurrency,
  targetCurrency,
  tradeType,
  selectPaymentMethodError,
  //   targetCountryCode,
  //   tradingCountryCode,
}: Props) {
  // const navigation = useNavigation();
  const toast = useToast();

  const handleCreatePayment = () => {
    toast.hideAll();
    if (tradeType === "Sell") {
      if (
        targetCurrency === "GHS" ||
        targetCurrency === "NGN" ||
        targetCurrency === "XOF"
      ) {
        storeDataInStorage("customRoute", {
          routeFrom: "CreateFxQuote",
        });
        // router.push({
        //   pathname: "/createPaymentType",
        //   params: { currencyName: targetCurrency },
        // });
      } else {
        toast.show(`Currency is not available at the moment.`, {
          animationDuration: 300,
          placement: "center",
        });
      }
    }

    if (tradeType === "Buy") {
      if (
        tradingCurrency === "GHS" ||
        tradingCurrency === "NGN" ||
        tradingCurrency === "XOF"
      ) {
        storeDataInStorage("customRoute", {
          routeFrom: "CreateFxQuote",
        });
        // router.push({
        //   pathname: "/createPaymentType",
        //   params: { currencyName: tradingCurrency },
        // });
      } else {
        toast.show(`Currency is not available at the moment.`, {
          animationDuration: 300,
          placement: "center",
        });
      }
    }
  };
  return (
    <View>
      <View>
        <Text className="text-black font-[500] text-lg mb-1">
          Create recipient account
        </Text>

        <TouchableOpacity
          onPress={handleCreatePayment}
          activeOpacity={1}
          className={cn(
            "bg-stone-200 py-4 rounded-[6px] px-3",
            selectPaymentMethodError ? "border-destructive border" : "",
          )}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text className="text-black font-[500] text-lg">
                Create a recipient account
              </Text>
            </View>
            <View>
              <ChevronRight size={25} className="text-black mr-2" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
