import React, { useState } from "react";
import { ComboboxOption } from "~/components/ui/combobox";

const QuoteContext = React.createContext<{
  selectQuoteFilter: string;
  selectQuoteTradeType: string;
  quoteTradingCurrency: ComboboxOption | null;
  quoteTargetCurrency: ComboboxOption | null;
}>({
  selectQuoteFilter: "All",
  selectQuoteTradeType: "",
  quoteTradingCurrency: null,
  quoteTargetCurrency: null,
});

const QuotreControlContext = React.createContext<{
  setSelectQuoteFilter: (value: string) => void;
  setSelectQuoteTradeType: (value: string) => void;
  setQuoteTradingCurrency: (value: ComboboxOption | null) => void;
  setQuoteTargetCurrency: (value: ComboboxOption | null) => void;
}>({
  setSelectQuoteFilter: () => {},
  setSelectQuoteTradeType: () => {},
  setQuoteTradingCurrency: () => {},
  setQuoteTargetCurrency: () => {},
});

export function Provider({ children }: React.PropsWithChildren<{}>) {
  const [selectQuoteFilter, setSelectQuoteFilter] = useState("All");
  const [selectQuoteTradeType, setSelectQuoteTradeType] = useState("");
  const [quoteTradingCurrency, setQuoteTradingCurrency] =
    useState<ComboboxOption | null>(null);
  const [quoteTargetCurrency, setQuoteTargetCurrency] =
    useState<ComboboxOption | null>(null);
  const state = React.useMemo(
    () => ({
      selectQuoteFilter,
      selectQuoteTradeType,
      quoteTradingCurrency,
      quoteTargetCurrency,
    }),
    [
      selectQuoteFilter,
      selectQuoteTradeType,
      quoteTradingCurrency,
      quoteTargetCurrency,
    ],
  );

  const methods = React.useMemo(
    () => ({
      setSelectQuoteFilter,
      setSelectQuoteTradeType,
      setQuoteTradingCurrency,
      setQuoteTargetCurrency,
    }),
    [
      setSelectQuoteFilter,
      setSelectQuoteTradeType,
      setQuoteTradingCurrency,
      setQuoteTargetCurrency,
    ],
  );

  return (
    <QuoteContext.Provider value={state}>
      <QuotreControlContext.Provider value={methods}>
        {children}
      </QuotreControlContext.Provider>
    </QuoteContext.Provider>
  );
}

export function useQuoteSelector() {
  return React.useContext(QuoteContext);
}

export function useQuoteSelectorControls() {
  return React.useContext(QuotreControlContext);
}
