import React, { useState } from "react";

const OrderHistoryContext = React.createContext<{
  filterOrderHistory: string | null;
}>({
  filterOrderHistory: null,
});

const OrderHistoryControlContext = React.createContext<{
  setFilterOrderHistory: (value: string | null) => void;
}>({
  setFilterOrderHistory: () => {},
});

export function Provider({ children }: React.PropsWithChildren<{}>) {
  const [filterOrderHistory, setFilterOrderHistory] = useState<string | null>(
    null,
  );
  const state = React.useMemo(
    () => ({
      filterOrderHistory,
    }),
    [filterOrderHistory],
  );

  const methods = React.useMemo(
    () => ({
      setFilterOrderHistory,
    }),
    [setFilterOrderHistory],
  );

  return (
    <OrderHistoryContext.Provider value={state}>
      <OrderHistoryControlContext.Provider value={methods}>
        {children}
      </OrderHistoryControlContext.Provider>
    </OrderHistoryContext.Provider>
  );
}

export function useOrderHistorySelector() {
  return React.useContext(OrderHistoryContext);
}

export function useOrderHistorySelectorControl() {
  return React.useContext(OrderHistoryControlContext);
}
