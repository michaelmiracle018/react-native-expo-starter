import { View } from "react-native";
import React, { useMemo } from "react";
import MarketSelector from "../dropDownSelector/MarketSelector";
import countriesJson from "~/assets/countries/countries.json";
import {
  useMarketSelector,
  useMarketSelectorControls,
} from "~/context/marketContext";
import { Text } from "../ui/text";
import { t, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import DropDownHeader from "../DropDownHeader";
import Colors from "~/constants/Colors";
import MarketSelect from "../MarketSelect/DropDownSelector/MarketSelect";

export default function RightCurrencySelector() {
  const { marketTargetCurrency, tradingType } = useMarketSelector();
  const { setMarketTargetCurrency } = useMarketSelectorControls();
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
    let data = listCountries.filter((a) => a.value === "GHS");
    const defaultData = data as any;
    const newData = {
      label: `${defaultData[0].label}`,
      value: defaultData[0]?.value,
      flag: defaultData[0].flag,
      id: defaultData[0].id,
    };
    setMarketTargetCurrency(newData);
  }, []);

  return (
    <View className="flex-row gap-1 items-center">
      <Text className="font-normal text-lg ">
        {tradingType === "Buy" ? t(i18n)`With` : t(i18n)`For`}
      </Text>
      <MarketSelect
        selectedValue={marketTargetCurrency}
        onValueChange={(value: any) => {
          setMarketTargetCurrency(value);
        }}
        canUnSelect={false}
        dropdownIconStyle={{ top: 17, right: 8 }}
        options={listCountries}
        dropdownStyle={{
          borderColor: " rgb(231 229 228)",
          minHeight: 40,
          maxHeight: 30,
          // maxWidth: 100,
          width: 95,
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
