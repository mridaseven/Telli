"use client";

import { useState } from "react";
import {
  IPHONE_MODELS_DESKTOP,
  IPHONE_MODELS_MOBILE,
  COLORS,
  CAPACITIES_DESKTOP,
  CAPACITIES_MOBILE,
  DEFAULT_SELECTION_DESKTOP,
  DEFAULT_SELECTION_MOBILE,
  SelectionState,
} from "@/lib/data";
import styles from "./SelectPage.module.css";

type MobileStep = "model" | "color" | "capacity" | "checkout";
type DesktopDropdown = "model" | "color" | "capacity" | null;

const MOBILE_STEPS: MobileStep[] = ["model", "color", "capacity", "checkout"];

const STEP_TITLES: Record<MobileStep, { regular: string; bold: string }> = {
  model: { regular: "Select ", bold: "iPhone" },
  color: { regular: "Select ", bold: "Color" },
  capacity: { regular: "Select ", bold: "Capacity" },
  checkout: { regular: "Check", bold: "out" },
};

export default function SelectPage() {
  const [selection, setSelection] = useState<SelectionState>(
    DEFAULT_SELECTION_DESKTOP
  );
  const [mobileSelection, setMobileSelection] = useState<SelectionState>(
    DEFAULT_SELECTION_MOBILE
  );
  const [mobileStep, setMobileStep] = useState<MobileStep>("model");
  const [openDropdown, setOpenDropdown] = useState<DesktopDropdown>(null);
  const [form, setForm] = useState({
    name: "",
    address: "",
    postalCode: "",
    city: "",
    email: "",
  });

  const mobileStepIndex = MOBILE_STEPS.indexOf(mobileStep);

  const goNext = () => {
    if (mobileStepIndex < MOBILE_STEPS.length - 1) {
      setMobileStep(MOBILE_STEPS[mobileStepIndex + 1]);
    }
  };

  const goPrev = () => {
    if (mobileStepIndex > 0) {
      setMobileStep(MOBILE_STEPS[mobileStepIndex - 1]);
    }
  };

  const updateForm = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const renderDesktopChips = () => {
    const chips: {
      key: "model" | "color" | "capacity";
      value: string;
      options: readonly string[];
      field: keyof SelectionState;
      className: string;
    }[] = [
      {
        key: "model",
        value: selection.model,
        options: IPHONE_MODELS_DESKTOP,
        field: "model",
        className: styles.chipModel,
      },
      {
        key: "color",
        value: selection.color,
        options: COLORS,
        field: "color",
        className: styles.chipColor,
      },
      {
        key: "capacity",
        value: selection.capacity,
        options: CAPACITIES_DESKTOP,
        field: "capacity",
        className: styles.chipCapacity,
      },
    ];

    return (
      <div className={styles.chipRow}>
        {chips.map((chip) => (
          <div key={chip.key} className={styles.chipWrapper}>
            <button
              type="button"
              className={`${styles.chip} ${chip.className}`}
              onClick={() =>
                setOpenDropdown((current) =>
                  current === chip.key ? null : chip.key
                )
              }
            >
              {chip.value}
            </button>
            {openDropdown === chip.key && (
              <ul className={styles.chipDropdown}>
                {chip.options.map((option) => (
                  <li
                    key={option}
                    className={`${styles.chipOption} ${
                      selection[chip.field] === option
                        ? styles.chipOptionSelected
                        : ""
                    }`}
                    onClick={() => {
                      setSelection((s) => ({ ...s, [chip.field]: option }));
                      setOpenDropdown(null);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderCheckoutForm = (isMobile: boolean) => {
    const fieldClass = isMobile ? styles.mobileFormField : styles.formField;
    const labelClass = isMobile ? styles.mobileFormLabel : styles.formLabel;
    const inputClass = isMobile ? styles.mobileFormInput : styles.formInput;

    return (
      <>
        <div className={isMobile ? fieldClass : styles.formFieldFull}>
          <label className={labelClass}>Type in name...</label>
          <input
            className={inputClass}
            type="text"
            value={form.name}
            onChange={(e) => updateForm("name", e.target.value)}
          />
        </div>

        <div className={isMobile ? styles.mobileFormRow : styles.formRow}>
          <div className={fieldClass}>
            <label className={labelClass}>Type in adress...</label>
            <input
              className={inputClass}
              type="text"
              value={form.address}
              onChange={(e) => updateForm("address", e.target.value)}
            />
          </div>
          <div
            className={
              isMobile ? fieldClass : `${fieldClass} ${styles.formFieldNarrow}`
            }
          >
            <label className={labelClass}>Type in Postalcode...</label>
            <input
              className={inputClass}
              type="text"
              value={form.postalCode}
              onChange={(e) => updateForm("postalCode", e.target.value)}
            />
          </div>
          <div
            className={
              isMobile ? fieldClass : `${fieldClass} ${styles.formFieldNarrow}`
            }
          >
            <label className={labelClass}>Type in City......</label>
            <input
              className={inputClass}
              type="text"
              value={form.city}
              onChange={(e) => updateForm("city", e.target.value)}
            />
          </div>
        </div>

        <div className={fieldClass}>
          <label className={labelClass}>Type in emailadress...</label>
          <input
            className={inputClass}
            type="email"
            value={form.email}
            onChange={(e) => updateForm("email", e.target.value)}
          />
        </div>

        <button
          type="button"
          className={isMobile ? styles.mobileSend : styles.sendButton}
        >
          Send
        </button>
      </>
    );
  };

  const renderMobileList = (
    items: readonly string[],
    field: keyof SelectionState
  ) => (
    <ul className={styles.mobileList}>
      {items.map((item) => (
        <li
          key={item}
          className={`${styles.mobileListItem} ${
            mobileSelection[field] === item
              ? styles.mobileListItemSelected
              : ""
          }`}
          onClick={() =>
            setMobileSelection((s) => ({ ...s, [field]: item }))
          }
        >
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={styles.page}>
      {/* Desktop */}
      <div className={styles.desktop}>
        {renderDesktopChips()}
      </div>

      {/* Mobile */}
      <div className={styles.mobile}>
        {mobileStep !== "checkout" ? (
          <>
            <header className={styles.mobileHeader}>
              <h2 className={styles.mobileTitle}>
                <span>{STEP_TITLES[mobileStep].regular}</span>
                <span className={styles.mobileTitleBold}>
                  {STEP_TITLES[mobileStep].bold}
                </span>
              </h2>
              <div className={styles.mobileTitleUnderline} />
            </header>

            {mobileStep === "model" &&
              renderMobileList(IPHONE_MODELS_MOBILE, "model")}
            {mobileStep === "color" && renderMobileList(COLORS, "color")}
            {mobileStep === "capacity" &&
              renderMobileList(CAPACITIES_MOBILE, "capacity")}
          </>
        ) : (
          <section className={styles.mobileCheckout}>
            <header className={styles.mobileHeader}>
              <h2 className={styles.mobileTitle}>
                <span>Checkout</span>
              </h2>
              <div className={styles.mobileTitleUnderline} />
            </header>
            {renderCheckoutForm(true)}
          </section>
        )}

        {mobileStep !== "checkout" && (
          <nav className={styles.mobileNav}>
            <button type="button" onClick={goPrev} disabled={mobileStepIndex === 0}>
              Prev
            </button>
            <span className={styles.mobileNavDivider}>|</span>
            <button type="button" onClick={goNext}>
              Next
            </button>
          </nav>
        )}

        {mobileStep === "checkout" && (
          <nav className={styles.mobileNav}>
            <button type="button" onClick={goPrev}>
              Prev
            </button>
          </nav>
        )}

      </div>
    </div>
  );
}
