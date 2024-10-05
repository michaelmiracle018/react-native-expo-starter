import { axiosInstance } from "~/api/axiosInstance";
import { displayErrorMessage } from "~/utils/displayErrorMessage";

// * GET SINGLE PAYMENT DETAILS
export async function serviceGetAllPaymentDetails(search: string) {
  try {
    let query, urlParams;
    if (search) {
      query = {
        bankName: search,
        currency: search,
        accountNumber: search,
        country: search,
        paymentType: search,
      };
      urlParams = new URLSearchParams(query).toString();
    }
    const response = await axiosInstance.get(
      `/payment-details/filter/any-matched?${urlParams || ""}`,
    );
    const { result } = response.data;
    if (result) return result;
    return [];
  } catch (error) {
    displayErrorMessage(error);
  }
}

// *  GET ALL PAYMENT DETAILS TO DISPLAY FOR USER TO SELECT
export async function getAllBankData({ currency }: any) {
  try {
    const response = await axiosInstance.get(
      `/payment-details/banks?currency=${currency}`,
    );
    const { result } = response.data;
    if (result) return result;
    return null;
  } catch (error) {
    displayErrorMessage(error);
  }
}

// *  VALIDATE PAYMENT DETAILS SELECTED
export function validatePaymentDetails({
  accountNumber,
  bankCode,
  currency,
}: any) {
  return axiosInstance.get(
    `/payment-details/validate/account?accountNumber=${accountNumber}&bankCode=${bankCode}&currency=${currency}`,
  );
}

// *  POST PAYMENT DETAILS
export function servicePostPaymentDetails(data: any) {
  return axiosInstance.post(`/payment-details`, data);
}

// * DELETE PAYMENT DETAILS
export function serviceDeletePaymentDetails(paymentId: string) {
  return axiosInstance.delete(`/payment-details/${paymentId}`);
}

// * FILTER PAYMENT DETAILS BY TRADE TYPE
export async function serviceFilterPaymentDetails({
  tradeType,
  tradingCurrency,
  targetCurrency,
}: any) {
  try {
    const tradingType = tradeType.toLowerCase();
    const currencyPair = `${tradingCurrency}-${targetCurrency}`;
    const response = await axiosInstance.get(
      `/payment-details/filter/trading-type/${tradingType}/${currencyPair}`,
    );
    const { result } = response.data;
    return result;
  } catch (error) {
    displayErrorMessage(error);
  }
}
