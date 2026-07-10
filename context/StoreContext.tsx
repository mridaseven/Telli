"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_SELECTION,
  EMPTY_CHECKOUT,
  type CheckoutFormData,
  type SelectionState,
} from "@/lib/products";

interface StoreContextValue {
  selection: SelectionState;
  setModel: (model: SelectionState["model"]) => void;
  setColor: (color: SelectionState["color"]) => void;
  setCapacity: (capacity: SelectionState["capacity"]) => void;
  checkout: CheckoutFormData;
  setCheckoutField: (field: keyof CheckoutFormData, value: string) => void;
  orderSubmitted: boolean;
  submitOrder: () => boolean;
  resetOrder: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<SelectionState>(DEFAULT_SELECTION);
  const [checkout, setCheckout] = useState<CheckoutFormData>(EMPTY_CHECKOUT);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const setModel = useCallback((model: SelectionState["model"]) => {
    setSelection((prev) => ({ ...prev, model }));
  }, []);

  const setColor = useCallback((color: SelectionState["color"]) => {
    setSelection((prev) => ({ ...prev, color }));
  }, []);

  const setCapacity = useCallback((capacity: SelectionState["capacity"]) => {
    setSelection((prev) => ({ ...prev, capacity }));
  }, []);

  const setCheckoutField = useCallback(
    (field: keyof CheckoutFormData, value: string) => {
      setCheckout((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const submitOrder = useCallback(() => {
    const isValid =
      checkout.name.trim() !== "" &&
      checkout.address.trim() !== "" &&
      checkout.postalCode.trim() !== "" &&
      checkout.city.trim() !== "" &&
      checkout.email.trim() !== "" &&
      checkout.email.includes("@");

    if (isValid) {
      setOrderSubmitted(true);
    }

    return isValid;
  }, [checkout]);

  const resetOrder = useCallback(() => {
    setOrderSubmitted(false);
    setCheckout(EMPTY_CHECKOUT);
  }, []);

  const value = useMemo(
    () => ({
      selection,
      setModel,
      setColor,
      setCapacity,
      checkout,
      setCheckoutField,
      orderSubmitted,
      submitOrder,
      resetOrder,
    }),
    [
      selection,
      setModel,
      setColor,
      setCapacity,
      checkout,
      setCheckoutField,
      orderSubmitted,
      submitOrder,
      resetOrder,
    ],
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
}
