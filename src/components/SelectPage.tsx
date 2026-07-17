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

  const renderSpacedWords = (text: string) =>
    text.split(" ").map((word, index) => (
      <span key={`${word}-${index}`} className={styles.listWord}>
        {word}
      </span>
    ));

  const renderDesktopColumns = () => (
    <div className={styles.columns}>
      <ul className={`${styles.column} ${styles.columnModels}`}>
        {IPHONE_MODELS_DESKTOP.map((model) => (
          <li
            key={model}
            className={`${styles.listItem} ${
              selection.model === model ? styles.listItemSelected : ""
            }`}
            onClick={() => setSelection((s) => ({ ...s, model }))}
          >
            {renderSpacedWords(model)}
          </li>
        ))}
      </ul>
      <ul className={`${styles.column} ${styles.columnColors}`}>
        {COLORS.map((color) => (
          <li
            key={color}
            className={`${styles.listItem} ${
              selection.color === color ? styles.listItemSelected : ""
            }`}
            onClick={() => setSelection((s) => ({ ...s, color }))}
          >
            {renderSpacedWords(color)}
          </li>
        ))}
      </ul>
      <ul className={`${styles.column} ${styles.columnCapacity}`}>
        {CAPACITIES_DESKTOP.map((capacity) => (
          <li
            key={capacity}
            className={`${styles.listItem} ${
              selection.capacity === capacity ? styles.listItemSelected : ""
            }`}
            onClick={() => setSelection((s) => ({ ...s, capacity }))}
          >
            {renderSpacedWords(capacity)}
          </li>
        ))}
      </ul>
    </div>
  );

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
      <div className={styles.desktop}>
        <header className={styles.selectHeader}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.titleWord}>Select</span>
            <span className={styles.titleWordBold}>iPhone</span>
          </h2>
          <div className={styles.titleUnderline} />
        </header>
        <section className={styles.selectSection}>
          {renderDesktopColumns()}
        </section>
      </div>

      <nav className={styles.desktopNav} aria-label="Selection navigation">
        <button type="button" className={styles.desktopNavPrev}>
          Prev
        </button>
        <span className={styles.desktopNavDivider} aria-hidden="true" />
        <button type="button" className={styles.desktopNavNext}>
          Next
        </button>
      </nav>

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
