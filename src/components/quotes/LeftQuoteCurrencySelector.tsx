import { View } from "react-native";
import React, { useMemo } from "react";
import countriesJson from "~/assets/countries/countries.json";
import {
  useQuoteSelector,
  useQuoteSelectorControls,
} from "~/context/quoteContext";
import { Text } from "../ui/text";
import { useLingui } from "@lingui/react";
import { t, Trans } from "@lingui/macro";
import DropDownHeader from "../DropDownHeader";
import Colors from "~/constants/Colors";
import MarketSelect from "../MarketSelect/DropDownSelector/MarketSelect";

export default function LeftQuoteCurrencySelector() {
  const { quoteTradingCurrency, selectQuoteTradeType } = useQuoteSelector();
  const { setQuoteTradingCurrency } = useQuoteSelectorControls();
  const { i18n } = useLingui();

  const getFilterItems = useMemo(() => {
    return countriesJson.filter((item) => item.isActive === true);
  }, []);

  const listCountries = useMemo(() => {
    return getFilterItems.map((item) => ({
      label: `${item.name} - ${item.currencyShortHand}`,
      value: item?.currencyShortHand,
      flag: item.flagEmoji,
      id: item.phoneCode,
    }));
  }, []);
  React.useEffect(() => {
    let data = listCountries.filter((a) => a.value === "NGN");
    const defaultData = data as any;
    const newData = {
      label: `${defaultData[0].label}`,
      value: defaultData[0]?.value,
      flag: defaultData[0].flag,
      id: defaultData[0].id,
    };
    setQuoteTradingCurrency(newData);
  }, []);
  return (
    <View className="flex-row gap-1 items-center">
      <Text className="font-bold text-lg ">
        {selectQuoteTradeType === "Buy" ? t(i18n)`Buy` : t(i18n)`Sell`}
      </Text>

      <MarketSelect
        selectedValue={quoteTradingCurrency}
        onValueChange={(value: any) => {
          setQuoteTradingCurrency(value);
        }}
        canUnSelect={false}
        dropdownIconStyle={{ top: 17, right: 8 }}
        options={listCountries}
        dropdownStyle={{
          borderColor: " rgb(231 229 228)",
          minHeight: 40,
          maxHeight: 30,
          // maxWidth: 100,
          width: 100,
          paddingVertical: 8,
          paddingHorizontal: 5,
          borderRadius: 6,
          backgroundColor: " rgb(231 229 228)",
          marginTop: 0,
          marginBottom: -20,
        }}
        primaryColor={Colors.darkMint}
        modalOptionsContainerStyle={{ maxHeight: "88%" }}
        listHeaderComponent={
          <DropDownHeader>
            <Text className="mt-1 mb-4 text-lg font-bold">
              <Trans>Select currency</Trans>
            </Text>
          </DropDownHeader>
        }
      />
    </View>
  );
}
