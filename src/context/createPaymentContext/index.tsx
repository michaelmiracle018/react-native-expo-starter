import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ComboboxOption } from "~/components/ui/combobox";
import { CreatePaymentTypeProps } from "~/types";

// import { useNonReactiveCallback } from "#/lib/hooks/useNonReactiveCallback

const CreatePaymentContext = React.createContext<{
  marketTradingCurrency: ComboboxOption | null;
  marketTargetCurrency: ComboboxOption | null;
  tradingType: string;
}>({
  marketTradingCurrency: null,
  marketTargetCurrency: null,
  tradingType: "Buy",
});

const CreatePaymentControlContext = React.createContext<{
  setMarketTradingCurrency: (value: ComboboxOption | null) => void;
  setMarketTargetCurrency: (value: ComboboxOption | null) => void;
  setTradingType: (value: string) => void;
}>({
  setMarketTradingCurrency: () => {},
  setMarketTargetCurrency: () => {},
  setTradingType: () => {},
});

export function Provider({ children }: React.PropsWithChildren<{}>) {
  const {
    trigger,
    control,
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreatePaymentTypeProps>({
    defaultValues: {
      currency: "",
      paymentType: "",
      accountName: "",
      accountNumber: "",
      bankName: "",
      countryXOFCode: "",
      address: "",
    },
  });
  const currencyInfo = watch("currency");
  const paymentInfo = watch("paymentType");
  const watchBankName = watch("bankName");
  const watchAccountNumber = watch("accountNumber");
  const watchAccountName = watch("accountName");
  const watchCountryXOFCode = watch("countryXOFCode");
  const watchAddress = watch("address");
  const state = React.useMemo(() => ({
    
  }), []);

  const methods = React.useMemo(() => ({}), []);

  return (
    <CreatePaymentContext.Provider value={state}>
      <CreatePaymentControlContext.Provider value={methods}>
        {children}
      </CreatePaymentControlContext.Provider>
    </CreatePaymentContext.Provider>
  );
}

export function useCreatePaymentSelector() {
  return React.useContext(CreatePaymentContext);
}

export function useCreatePaymentSelectorControls() {
  return React.useContext(CreatePaymentControlContext);
}
