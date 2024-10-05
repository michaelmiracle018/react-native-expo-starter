import React, { useState } from "react";
import { ComboboxOption } from "~/components/ui/combobox";

// import { useNonReactiveCallback } from "#/lib/hooks/useNonReactiveCallback

const MarketContext = React.createContext<{
  marketTradingCurrency: ComboboxOption | null;
  marketTargetCurrency: ComboboxOption | null;
  tradingType: string;
}>({
  marketTradingCurrency: null,
  marketTargetCurrency: null,
  tradingType: "Buy",
});

const MarketControlContext = React.createContext<{
  setMarketTradingCurrency: (value: ComboboxOption | null) => void;
  setMarketTargetCurrency: (value: ComboboxOption | null) => void;
  setTradingType: (value: string) => void;
}>({
  setMarketTradingCurrency: () => {},
  setMarketTargetCurrency: () => {},
  setTradingType: () => {},
});

export function Provider({ children }: React.PropsWithChildren<{}>) {
  const [marketTradingCurrency, setMarketTradingCurrency] =
    useState<ComboboxOption | null>(null);
  const [marketTargetCurrency, setMarketTargetCurrency] =
    useState<ComboboxOption | null>(null);
  const [tradingType, setTradingType] = useState("Buy");
  const state = React.useMemo(
    () => ({
      marketTradingCurrency,
      marketTargetCurrency,
      tradingType,
    }),
    [marketTradingCurrency, marketTargetCurrency, tradingType],
  );

  const methods = React.useMemo(
    () => ({
      setMarketTradingCurrency,
      setMarketTargetCurrency,
      setTradingType,
    }),
    [setMarketTargetCurrency, setMarketTradingCurrency, setTradingType],
  );

  return (
    <MarketContext.Provider value={state}>
      <MarketControlContext.Provider value={methods}>
        {children}
      </MarketControlContext.Provider>
    </MarketContext.Provider>
  );
}

export function useMarketSelector() {
  return React.useContext(MarketContext);
}

export function useMarketSelectorControls() {
  return React.useContext(MarketControlContext);
}
