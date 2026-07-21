"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IPHONE_MODELS_MOBILE,
  COLORS_MOBILE,
  CAPACITIES_MOBILE,
  DEFAULT_SELECTION_DESKTOP,
  DEFAULT_SELECTION_MOBILE,
  SelectionState,
} from "@/lib/data";
import styles from "./SelectPage.module.css";

type MobileStep = "model" | "color" | "capacity";

const MOBILE_STEPS: MobileStep[] = ["model", "color", "capacity"];

const STEP_TITLES: Record<MobileStep, { regular: string; bold: string }> = {
  model: { regular: "Select ", bold: "iPhone" },
  color: { regular: "Select ", bold: "Color" },
  capacity: { regular: "Select ", bold: "Capacity" },
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
  const router = useRouter();

  const mobileStepIndex = MOBILE_STEPS.indexOf(mobileStep);

  const goNext = () => {
    if (mobileStepIndex < MOBILE_STEPS.length - 1) {
      setMobileStep(MOBILE_STEPS[mobileStepIndex + 1]);
    } else {
      router.push("/checkout");
    }
  };

  const goPrev = () => {
    if (mobileStepIndex > 0) {
      setMobileStep(MOBILE_STEPS[mobileStepIndex - 1]);
    } else {
      router.push("/");
    }
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
        <a href="/" className={styles.navBtn}>
          <span className={styles.navLabel}>Prev</span>
          <span
            className={`${styles.navUnderline} ${styles.navUnderlinePrev}`}
            aria-hidden="true"
          />
        </a>
        <span className={styles.navDivider} aria-hidden="true" />
        <Link href="/checkout" className={styles.navBtn}>
          <span className={styles.navLabel}>Next</span>
          <span
            className={`${styles.navUnderline} ${styles.navUnderlineNext}`}
            aria-hidden="true"
          />
        </Link>
      </nav>
    </>
  );

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
        <div className={styles.mobileStage}>
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
          {mobileStep === "color" && renderMobileList(COLORS_MOBILE, "color")}
          {mobileStep === "capacity" &&
            renderMobileList(CAPACITIES_MOBILE, "capacity")}
        </div>

        <nav className={styles.mobileNav}>
          <button type="button" onClick={goPrev}>
            Prev
          </button>
          <span className={styles.mobileNavDivider}>|</span>
          <button type="button" onClick={goNext}>
            Next
          </button>
        </nav>
      </div>
    </div>
  );
}
