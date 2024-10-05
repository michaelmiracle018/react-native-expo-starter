import { TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { Card } from "../ui/card";
import { Text } from "../ui/text";
import { router } from "expo-router";
import { t, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { QuoteProps } from "~/types";
import FormattedDate from "../FormattedDate";

function RenderQuotesList(props: QuoteProps) {
  const {
    _id,
    tradingType,
    amountRangeCurrency,
    isActive,
    createdAt,
    currencyPair,
    rate,
    tradingAmountRange,
  } = props;
  const { i18n } = useLingui();

  const handleNavigateToSingleItem = () => {
    router.push({
      pathname: "/quotes/[quoteId]",
      params: {
        _id,
      },
    });
  };

  return (
    <View className="spacing-1">
      <Card className="rounded-md px-2 py-5">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center gap-2">
            <Text className="font-semibold text-xl">
              {tradingType === "buy" ? t(i18n)`Buy` : t(i18n)`Sell`}
            </Text>
            <Text className="font-semibold text-xl">
              {currencyPair?.tradingCurrency}
            </Text>
            <Text className="font-normal text-xl">
              {tradingType === "buy" ? t(i18n)`With` : t(i18n)`For`}
            </Text>
            <Text className="font-semibold text-xl">
              {currencyPair?.targetCurrency}
            </Text>
          </View>
          <View className="bg-[rgba(72,189,126,0.8)] h-8 w-20 flex-center rounded-md">
            <Text className="text-white">
              {isActive === true ? t(i18n)`Enabled` : t(i18n)`Disbled`}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center gap-2 mt-2">
          <Text className="font-semibold text-lg">
            {currencyPair?.tradingCurrency}
          </Text>
          <Text className="font-semibold text-lg">
            {rate?.tradingCurrencyRate?.$numberDecimal}
          </Text>
          <Text className="font-semibold text-lg">=</Text>
          <Text className="font-semibold text-lg">
            {currencyPair?.targetCurrency}
          </Text>
          <Text className="font-semibold text-lg">
            {rate?.targetCurrencyRate?.$numberDecimal}
          </Text>
        </View>
        <View className="flex-row items-center justify-between mt-3">
          <Text className="font-nromal text-md">Limit</Text>
          <View className="flex-row items-center gap-2">
            <Text className="font-nromal text-md">
              {tradingAmountRange.min?.$numberDecimal}
            </Text>
            <Text className="font-nromal text-md">-</Text>
            <Text className="font-nromal text-md">
              {tradingAmountRange.max?.$numberDecimal}
            </Text>
            <Text className="font-nromal text-md">{amountRangeCurrency}</Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between gap-2 mt-3">
          <Text className="font-nromal text-md">
            <Trans>Created At</Trans>
          </Text>
          <FormattedDate createdAt={createdAt} />
        </View>
        <View className="justify-end items-end mt-3">
          <TouchableOpacity
            activeOpacity={1}
            className="h-10 w-20 bg-info rounded-md flex-center"
            onPress={handleNavigateToSingleItem}
          >
            <Text className="text-white font-bold">
              <Trans>View</Trans>
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
}

export default memo(RenderQuotesList);
