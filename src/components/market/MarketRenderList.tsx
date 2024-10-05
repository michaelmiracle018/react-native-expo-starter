import { TouchableOpacity, View } from "react-native";
import React, { memo, useState } from "react";
import { Separator } from "../ui/separator";
import { H4 } from "../ui/typography";
import { Text } from "../ui/text";
import { useMarketSelector } from "~/context/marketContext";
import { cn } from "~/lib/utils";
import { router } from "expo-router";
import { useLingui } from "@lingui/react";
import { t, Trans } from "@lingui/macro";
import { MarketGetAllCurrencypairInfoProps } from "~/types";
import ModalDisplay from "../ui/modal";
import { Button } from "../ui/button";
import WarningSign from "../CustomSign/WarningSign";
import useFetchUserFromStorage from "~/shared/fetchUserFromStorage";
import { ACCOUNT_TYPE } from "~/api/common/secretKeys";

function MarketRenderList(props: MarketGetAllCurrencypairInfoProps) {
  const [showModal, setShowModal] = useState(false);
  const { storedData } = useFetchUserFromStorage(ACCOUNT_TYPE);

  const {
    currencyPair,
    _id,
    amountRangeCurrency,
    tradingAmountRange,
    rate,
    user,
  } = props;
  const { tradingType } = useMarketSelector();
  const { i18n } = useLingui();
  function extractName(email: string | undefined) {
    // Extracting name using regular expression
    const match = email?.match(/^([^@]+)/);

    if (match) {
      return match[1];
    } else {
      return null; // Return null if no match found
    }
  }
  const handleMakeOrder = () => {
    if (user?._id === storedData?.userID) {
      setShowModal(true);
      return;
    } else {
      router.push({
        pathname: "/(authenticated)/[marketOrderId]",
        params: {
          _id,
          tradingType,
          targetCurrency: currencyPair?.targetCurrency,
          tradingCurrency: currencyPair?.tradingCurrency,
        },
      });
    }
  };
  return (
    <>
      <View className="spacing-1">
        <View className="flex-row justify-between items-end">
          <View>
            <H4>
              {user?.firstName} {user?.lastName}
            </H4>
            <View className="mt-3 flex-row gap-2 items-center">
              <View className="w-5 h-5 rounded-full border border-success flex-center">
                <Text className="text-sm font-bold uppercase">
                  {user?.email?.slice(0, 1)}
                </Text>
              </View>
              <View>
                <Text className="text-sm">{extractName(user?.email)}</Text>
              </View>
            </View>
            <View className="flex-row items-center gap-2 mt-1">
              <Text className="text-md font-bold">
                {currencyPair?.tradingCurrency}
              </Text>
              <Text className="text-xl font-bold">
                {rate?.tradingCurrencyRate?.$numberDecimal}
              </Text>
              <Text className="text-md font-bold">=</Text>
              <Text className="text-md font-bold">
                {currencyPair?.targetCurrency}
              </Text>
              <Text className="text-xl font-bold">
                {rate?.targetCurrencyRate?.$numberDecimal}
              </Text>
            </View>
            <View className="flex-row gap-2 mt-2">
              <Text className="text-md font-regular">
                <Trans>Limit:</Trans>
              </Text>
              <View className="flex-row gap-1">
                <Text className="text-md font-regular">
                  ({tradingAmountRange?.min?.$numberDecimal} {""} - {""}
                  {tradingAmountRange?.max?.$numberDecimal})
                </Text>
              </View>
              <Text className="text-md font-regular">
                {amountRangeCurrency}
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              activeOpacity={1}
              onPress={handleMakeOrder}
              className={cn(
                "bg-primary_2 w-20 flex-center h-10 rounded-md",
                tradingType === "Buy" ? "bg-primary_2" : "bg-success",
              )}
            >
              <Text className="text-white text-lg text-center">
                {tradingType === "Buy" ? t(i18n)`Buy` : t(i18n)`Sell`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Separator className="mt-2" />
      </View>
      <ModalDisplay visible={showModal}>
        <>
          <View className="flex-center mb-8">
            <WarningSign />
          </View>
          <Text className="font-bold text-xl text-center">
            <Trans>You created this Advert</Trans>
          </Text>

          <Text className="mt-5 text-lg text-center">
            <Trans>You can not make an order for an advert you created.</Trans>
          </Text>
          <Button
            variant={"info"}
            className="mt-8"
            onPress={() => setShowModal(false)}
          >
            <Text>
              <Trans>Ok</Trans>
            </Text>
          </Button>
        </>
      </ModalDisplay>
    </>
  );
}

export default memo(MarketRenderList);
