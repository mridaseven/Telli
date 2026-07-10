export const IPHONE_MODELS = [
  "iPhone 16 Pro Max",
  "iPhone 16 Pro",
  "iPhone 16",
  "iPhone 15 Pro Max",
  "iPhone 15 Pro",
  "iPhone 15",
  "iPhone 14 Pro Max",
  "iPhone 14 Pro",
  "iPhone 14",
  "iPhone 13 Pro Max",
  "iPhone 13 Pro",
  "iPhone 13",
] as const;

export const COLORS = [
  "Spacegrey",
  "White",
  "Gold",
  "Rose",
  "Dark Blue",
] as const;

export const CAPACITIES = ["128GB", "256GB", "512GB"] as const;

export type IPhoneModel = (typeof IPHONE_MODELS)[number];
export type Color = (typeof COLORS)[number];
export type Capacity = (typeof CAPACITIES)[number];

export interface SelectionState {
  model: IPhoneModel;
  color: Color;
  capacity: Capacity;
}

export const DEFAULT_SELECTION: SelectionState = {
  model: "iPhone 16 Pro Max",
  color: "Spacegrey",
  capacity: "128GB",
};

export interface CheckoutFormData {
  name: string;
  address: string;
  postalCode: string;
  city: string;
  email: string;
}

export const EMPTY_CHECKOUT: CheckoutFormData = {
  name: "",
  address: "",
  postalCode: "",
  city: "",
  email: "",
};
