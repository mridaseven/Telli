"use client";

import { useState } from "react";
import {
  IPHONE_MODELS_MOBILE,
  COLORS,
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

/* Desktop select-page data (labels from "Telli select page.svg"). */
type Cell = { label: string };

const DESKTOP_MODELS: Cell[] = [
  { label: "iPhone 16 Pro Max" },
  { label: "Iphone 16 Pro" },
  { label: "iPhone 16" },
  { label: "iPhone 15 Pro Max" },
  { label: "iPhone 15 Pro" },
  { label: "iPhone 15" },
  { label: "iPhone 14 Pro Max" },
  { label: "iPhone 14 Pro" },
  { label: "iPhone 14" },
  { label: "iPhone 13 Pro Max" },
  { label: "iPhone 13 Pro" },
  { label: "iPhone 13" },
];

const DESKTOP_COLORS: Cell[] = [
  { label: "Spacegrey" },
  { label: "White" },
  { label: "Gold" },
  { label: "Rose" },
  { label: "Dark Blue" },
];

const DESKTOP_CAPS: Cell[] = [
  { label: "128GB" },
  { label: "256GB" },
  { label: "512GB" },
];

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

  const renderDesktopColumn = (
    items: Cell[],
    field: keyof SelectionState,
    colClass: string
  ) => (
    <ul className={`${styles.col} ${colClass}`}>
      {items.map((it) => {
        const isSelected = selection[field] === it.label;
        return (
          <li
            key={it.label}
            className={`${styles.listItem} ${
              isSelected ? styles.listItemSelected : ""
            }`}
            onClick={() => setSelection((s) => ({ ...s, [field]: it.label }))}
          >
            {isSelected && <span className={styles.bar} aria-hidden="true" />}
            <span className={styles.cellText}>{it.label}</span>
          </li>
        );
      })}
    </ul>
  );

  const renderDesktopSelect = () => (
    <>
      <div className={styles.selectWrap}>
        <h2 className={styles.title}>
          Select <span className={styles.titleBold}>iPhone</span>
        </h2>
        <div className={styles.titleUnderline} aria-hidden="true" />
        <div className={styles.columns}>
          {renderDesktopColumn(DESKTOP_MODELS, "model", styles.colModels)}
          {renderDesktopColumn(DESKTOP_COLORS, "color", styles.colColors)}
          {renderDesktopColumn(DESKTOP_CAPS, "capacity", styles.colCaps)}
        </div>
      </div>

      <nav className={styles.nav} aria-label="Selection navigation">
        <button type="button" className={styles.navBtn}>
          <span className={styles.navLabel}>Prev</span>
        </button>
        <span className={styles.navDivider} aria-hidden="true" />
        <button type="button" className={styles.navBtn}>
          <span className={styles.navLabel}>Next</span>
        </button>
      </nav>
    </>
  );

  const renderCheckoutForm = (isMobile: boolean) => {
    const fieldClass = isMobile ? styles.mobileFormField : styles.formField;
    const labelClass = isMobile ? styles.mobileFormLabel : styles.formLabel;
    const inputClass = isMobile ? styles.mobileFormInput : styles.formInput;

    return (
      <>
        <div className={fieldClass}>
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
      {/* Desktop — select iPhone, from Telli select page.svg */}
      <div className={styles.desktop}>{renderDesktopSelect()}</div>

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
