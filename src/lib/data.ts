export const BRAND_NAME = "Telli";

export const IPHONE_MODELS_DESKTOP = [
  "iPhone 16 Pro Max",
  "Iphone 16 Pro",
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

export const IPHONE_MODELS_MOBILE = [
  "iPhone 17 Pro Max",
  "iPhone 17 Pro",
  "iPhone 17",
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

export const COLORS_MOBILE = ["Silver", "Blue", "Orange"] as const;

export const CAPACITIES_DESKTOP = ["128GB", "256GB", "512GB"] as const;

export const CAPACITIES_MOBILE = ["512GB", "256GB", "128GB"] as const;

export type SelectionState = {
  model: string;
  color: string;
  capacity: string;
};

export const DEFAULT_SELECTION_DESKTOP: SelectionState = {
  model: IPHONE_MODELS_DESKTOP[0],
  color: COLORS[0],
  capacity: CAPACITIES_DESKTOP[0],
};

export const DEFAULT_SELECTION_MOBILE: SelectionState = {
  model: IPHONE_MODELS_MOBILE[0],
  color: COLORS_MOBILE[0],
  capacity: CAPACITIES_MOBILE[0],
};
