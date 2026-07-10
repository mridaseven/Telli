"use client";

import styles from "./UnderlineInput.module.css";

interface UnderlineInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email";
  variant?: "desktop" | "mobile";
}

export default function UnderlineInput({
  id,
  label,
  value,
  onChange,
  type = "text",
  variant = "desktop",
}: UnderlineInputProps) {
  return (
    <div className={`${styles.field} ${styles[variant]}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.input}
        autoComplete="off"
      />
      <div className={styles.underline} />
    </div>
  );
}
