import { axiosInstance } from "~/api/axiosInstance";
import { MarketGetAllCurrencypairProps } from "~/types";
import { displayErrorMessage } from "~/utils/displayErrorMessage";

// * FETCH ALL CURRENCY PAIR MARKET
export async function serviceGetAllCurrencyPairMarket({
  tradingType,
  targetCurrency,
  tradingCurrency,
  pageParam,
}: MarketGetAllCurrencypairProps) {
  try {
    const res = await axiosInstance.get(
      `/currency-pairs/all/markets?tradingType=${tradingType}&tradingCurrency=${tradingCurrency}&targetCurrency=${targetCurrency}&page=${pageParam}&limit=${15}`,
    );
    const {
      result: { data, nextPage },
    } = res.data;

    return { data, nextPage };
  } catch (error) {
    displayErrorMessage(error);
  }
}

// GET ALL CURRECNCY PAIRS
export async function serviceGetAllCurrencyPair({
  selectedItem,
  pageParam,
}: any) {
  try {
    let query, urlParams;
    if (selectedItem === "All") {
      query = null;
    } else {
      query = {
        tradingType: selectedItem.toLowerCase(),
      };
      urlParams = new URLSearchParams(query).toString();
    }
    const response = await axiosInstance.get(
      `/currency-pairs?${urlParams}&page=${pageParam}&limit=${15}`,
    );
    const {
      result: { data, nextPage },
    } = response.data;
    return { data, nextPage };
  } catch (error) {
    displayErrorMessage(error);
  }
}

// * CURRENCY-PAIR / EXCHANGE-RATE
export async function serviceCurrencyPairRate({
  tradingCurrency,
  targetCurrency,
  debouncedFirstRate,
}: any) {
  try {
    const response = await axiosInstance.get(
      `/currency-pairs/exchange-rate?tradingCurrency=${tradingCurrency}&targetCurrency=${targetCurrency}&tradingCurrencyRate=${debouncedFirstRate}`,
    );
    const { result } = response.data;
    return result;
  } catch (error) {
    displayErrorMessage(error);
  }
}

// * CREATE CURRENCY-PAIRS
export function serviceCreateCurrencyPair(data: any) {
  return axiosInstance.post("/currency-pairs", data);
}
