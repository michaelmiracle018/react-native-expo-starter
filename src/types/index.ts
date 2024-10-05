import { ViewStyle } from "react-native";

export type SendEmailProp = {
  email: string;
};

export type CurrecncySelector = {
  flag: string;
  currency: string;
  label: string;
  value: string;
};

export type ProfileFootercardProps = {
  verified: boolean;
  title: string;
  toolTipMsg: string;
  toolTipMsgTitle?: string;
};

interface CurrencyProps {
  currency: string;
  label: string;
  value: string;
}

export type MarketOrderInputProps = {
  amount: "";
  firstCurrency: null | CurrencyProps;
  secondCurrency: null | CurrencyProps;
  paymentMethod: any;
};
export interface PropsFromDropDown {
  label: string;
  value: string;
}

export type CreatePaymentTypeProps = {
  currency: string | any;
  paymentType: string | null | any;
  accountName: any;
  accountNumber: any;
  bankName: any;
  countryXOFCode: any;
  address: any;
};

export type AllPaymentDetailsProps = {
  accountName: string;
  accountNumber: string;
  address: string;
  bankBranch: string;
  bankCode: string;
  bankName: string;
  countryCode: string;
  currency: string;
  _id: string;
};

export interface AllPaymentDetailsInterface {
  accountName: string;
  accountNumber: string;
  address: string;
  bankBranch: string;
  bankCode: string;
  bankName: string;
  countryCode: string;
  currency: string;
  _id: string;
}

export interface ChangePasswordProps {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface LanguageProps {
  code2: string;
  name: string;
  type: string;
}

export interface EditQuoteProps {
  firstRate: string;
  secondRate: string;
  firstAmountRange: string;
  secondAmountRange: any;
  amountRangeCurrency: any;
  paymentMethod: any;
}

export interface OrderHistoryFIlterProps {
  id: string;
  title: string;
  select: string;
}

export interface OrderAmountInfoProps {
  currency?: string;
  amount?: number | string;
  title?: string;
  withCurrency?: boolean;
  style?: ViewStyle;
  canCopyText?: boolean;
}

export interface CollectionCedisFormProps {
  accountName: CurrencyProps | null;
  accountNumber: string;
  bankCode: string;
}

export interface MakePaymentInfoProps {
  title?: string;
  text?: string;
  style?: ViewStyle;
  isLoading?: boolean;
  copyItem?: boolean;
}

export interface MakePaymentXOFInfoProps {
  country: CurrencyProps | null;
  accountNumber: string;
  accountName: CurrencyProps | null;
  bankCode: string;
}

export interface MarketGetAllCurrencypairProps {
  tradingType: string;
  tradingCurrency: string | undefined;
  targetCurrency: string | undefined;
  pageParam: number;
}
interface CurrencyPairProps {
  targetCurrency?: string;
  tradingCurrency?: string;
}

interface UserCurrencyPairProps {
  email?: string | undefined;
  firstName?: string;
  lastName?: string;
  _id?: string;
}
interface NumberDecimal {
  $numberDecimal: string | number;
}

interface RateCurrencyPairProps {
  tradingCurrencyRate?: NumberDecimal;
  targetCurrencyRate?: NumberDecimal;
}

interface TradingAmountRangeProps {
  min?: NumberDecimal;
  max?: NumberDecimal;
}

export interface MarketGetAllCurrencypairInfoProps {
  currencyPair: CurrencyPairProps | null;
  user: UserCurrencyPairProps | null;
  rate: RateCurrencyPairProps | null;
  tradingAmountRange: TradingAmountRangeProps;
  amountRangeCurrency: string;
  _id: string;
}

export interface RenderLoaderProps {
  isLoadingPage: boolean;
  isFetchingNextPageInfo: boolean;
  hasNextPageInfo: boolean;
  itemLenght: number | undefined;
}

export interface ChangePasswordInterface {
  oldPassword: string;
  newPassword: string;
}

//QUOTE PROPS
interface QuoteCurrencyProps {
  tradingCurrency: string;
  targetCurrency: string;
}

export interface QuoteProps {
  _id: string;
  currencyPair: QuoteCurrencyProps | null;
  rate: RateCurrencyPairProps | null;
  tradingType: string;
  isActive: boolean;
  paymentDetails: string;
  amountRangeCurrency: string;
  createdAt: string;
  tradingAmountRange: TradingAmountRangeProps;
}

//QUOTE PROPS
