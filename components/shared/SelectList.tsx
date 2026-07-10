"use client";

import styles from "./SelectList.module.css";

interface SelectListProps {
  items: readonly string[];
  selected: string;
  onSelect: (item: string) => void;
  variant?: "desktop" | "mobile";
  ariaLabel: string;
}

export default function SelectList({
  items,
  selected,
  onSelect,
  variant = "desktop",
  ariaLabel,
}: SelectListProps) {
  return (
    <ul
      className={`${styles.list} ${styles[variant]}`}
      role="listbox"
      aria-label={ariaLabel}
    >
      {items.map((item) => {
        const isSelected = item === selected;
        return (
          <li key={item} role="presentation">
            <button
              type="button"
              role="option"
              aria-selected={isSelected}
              className={`${styles.item} ${isSelected ? styles.selected : ""}`}
              onClick={() => onSelect(item)}
            >
              {item}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
