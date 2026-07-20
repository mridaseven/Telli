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

/* ── Exact desktop coordinates from "Telli select page.svg" ──
   The whole desktop view is reproduced 1:1 from the artboard
   (viewBox 1853.96 wide). Y values are offset by YOFF so the empty
   space above the title is cropped. Everything is scaled uniformly
   by the CSS var --s so proportions always match the design. */
const YOFF = 1200;
const sc = (v: number) => `calc(${v}px * var(--s))`;

type Cell = { label: string; x: number; y: number };

const DESKTOP_MODELS: Cell[] = [
  { label: "iPhone 16 Pro Max", x: 746.76, y: 1485.78 },
  { label: "Iphone 16 Pro", x: 749, y: 1529.4 },
  { label: "iPhone 16", x: 750, y: 1572.66 },
  { label: "iPhone 15 Pro Max", x: 750.24, y: 1611.72 },
  { label: "iPhone 15 Pro", x: 749.51, y: 1651.82 },
  { label: "iPhone 15", x: 750.75, y: 1691.36 },
  { label: "iPhone 14 Pro Max", x: 751.81, y: 1729 },
  { label: "iPhone 14 Pro", x: 752.57, y: 1769.4 },
  { label: "iPhone 14", x: 752.81, y: 1812.65 },
  { label: "iPhone 13 Pro Max", x: 751.81, y: 1854.1 },
  { label: "iPhone 13 Pro", x: 751.81, y: 1894.82 },
  { label: "iPhone 13", x: 753.47, y: 1934.36 },
];

const DESKTOP_COLORS: Cell[] = [
  { label: "Spacegrey", x: 1029.12, y: 1481.64 },
  { label: "White", x: 1031.36, y: 1525.25 },
  { label: "Gold", x: 1032.36, y: 1568.51 },
  { label: "Rose", x: 1033.12, y: 1616.11 },
  { label: "Dark Blue", x: 1030.22, y: 1661.12 },
];

const DESKTOP_CAPS: Cell[] = [
  { label: "128GB", x: 1231.74, y: 1480.92 },
  { label: "256GB", x: 1233.98, y: 1524.53 },
  { label: "512GB", x: 1234.98, y: 1567.79 },
];

type ColGeo = { box: number; boxW: number; bar: number };
const GEO_MODELS: ColGeo = { box: 733.4, boxW: 230.24, bar: 729.4 };
const GEO_COLORS: ColGeo = { box: 1017.56, boxW: 136.44, bar: 1011.76 };
const GEO_CAPS: ColGeo = { box: 1220.63, boxW: 104.12, bar: 1214.38 };

const BOX_H = 38.31;
const BAR_W = 4;
const BAR_H = 34.17;
const ASCENT = 21.7; // Arial ascent at 24px
const BOX_DY = 25.12; // baseline → highlight-box top
const BAR_DY = 22.98; // baseline → bar top

type DesktopField = {
  key: "name" | "address" | "postalCode" | "city" | "email";
  placeholder: string;
  x: number;
  labelY: number;
  underlineY: number;
  width: number;
};

const DESKTOP_FIELDS: DesktopField[] = [
  { key: "name", placeholder: "Type in name...", x: 555.86, labelY: 2636.46, underlineY: 2652.48, width: 241.88 },
  { key: "address", placeholder: "Type in adress...", x: 559.45, labelY: 2753.24, underlineY: 2769.26, width: 241.88 },
  { key: "postalCode", placeholder: "Type in Postalcode...", x: 893.74, labelY: 2759.52, underlineY: 2775.54, width: 241.88 },
  { key: "city", placeholder: "Type in City......", x: 1201.74, labelY: 2761, underlineY: 2777.02, width: 241.88 },
  { key: "email", placeholder: "Type in emailadress...", x: 563.04, labelY: 2886.47, underlineY: 2902.49, width: 241.88 },
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
    geo: ColGeo
  ) => {
    const selected =
      items.find((i) => selection[field] === i.label) ?? items[0];
    return (
      <>
        <div
          className={styles.hiBox}
          style={{
            left: sc(geo.box),
            top: sc(selected.y - YOFF - BOX_DY),
            width: sc(geo.boxW),
            height: sc(BOX_H),
          }}
        />
        <div
          className={styles.hiBar}
          style={{
            left: sc(geo.bar),
            top: sc(selected.y - YOFF - BAR_DY),
            width: sc(BAR_W),
            height: sc(BAR_H),
          }}
        />
        {items.map((it) => (
          <button
            key={it.label}
            type="button"
            className={styles.cell}
            style={{ left: sc(it.x), top: sc(it.y - YOFF - ASCENT) }}
            onClick={() => setSelection((s) => ({ ...s, [field]: it.label }))}
          >
            {it.label}
          </button>
        ))}
      </>
    );
  };

  const renderDesktopArtboard = () => (
    <div className={styles.artboard}>
      {/* Title */}
      <h2
        className={styles.title}
        style={{ left: sc(966.68), top: sc(1223.96 - YOFF - ASCENT) }}
      >
        Select <span className={styles.titleBold}>iPhone</span>
      </h2>
      <div
        className={styles.line}
        style={{
          left: sc(964.14),
          top: sc(1239.04 - YOFF),
          width: sc(164.68),
          height: sc(2.9),
        }}
      />

      {/* Columns */}
      {renderDesktopColumn(DESKTOP_MODELS, "model", GEO_MODELS)}
      {renderDesktopColumn(DESKTOP_COLORS, "color", GEO_COLORS)}
      {renderDesktopColumn(DESKTOP_CAPS, "capacity", GEO_CAPS)}

      {/* Prev / Next */}
      <button
        type="button"
        className={styles.navBtn}
        style={{ left: sc(1726.75), top: sc(2144.66 - YOFF - ASCENT) }}
      >
        <span className={styles.navLabel}>Prev</span>
      </button>
      <div
        className={styles.line}
        style={{
          left: sc(1725.81),
          top: sc(2149.29 - YOFF),
          width: sc(51.21),
          height: sc(1.76),
        }}
      />
      <div
        className={styles.line}
        style={{
          left: sc(1784.67),
          top: sc(2123.54 - YOFF),
          width: sc(1.37),
          height: sc(31.51),
        }}
      />
      <button
        type="button"
        className={styles.navBtn}
        style={{ left: sc(1794.68), top: sc(2145.63 - YOFF - ASCENT) }}
      >
        <span className={styles.navLabel}>Next</span>
      </button>
      <div
        className={styles.line}
        style={{
          left: sc(1793.69),
          top: sc(2150.05 - YOFF),
          width: sc(60.27),
          height: sc(1.37),
        }}
      />

      {/* Checkout */}
      <h2
        className={styles.title}
        style={{ left: sc(970.32), top: sc(2439.63 - YOFF - ASCENT) }}
      >
        Checkout
      </h2>
      <div
        className={styles.line}
        style={{
          left: sc(914.63),
          top: sc(2455.54 - YOFF),
          width: sc(241.88),
          height: sc(1.95),
        }}
      />
      {DESKTOP_FIELDS.map((f) => (
        <input
          key={f.key}
          className={styles.field}
          type={f.key === "email" ? "email" : "text"}
          placeholder={f.placeholder}
          value={form[f.key]}
          onChange={(e) => updateForm(f.key, e.target.value)}
          style={{
            left: sc(f.x),
            top: sc(f.labelY - YOFF - ASCENT),
            width: sc(f.width),
            height: sc(f.underlineY - f.labelY + ASCENT),
          }}
        />
      ))}

      {/* Send */}
      <button
        type="button"
        className={styles.navBtn}
        style={{ left: sc(1742.52), top: sc(3263.13 - YOFF - ASCENT) }}
      >
        <span className={styles.navLabel}>Send</span>
      </button>
      <div
        className={styles.line}
        style={{
          left: sc(1741.81),
          top: sc(3266.64 - YOFF),
          width: sc(61.53),
          height: sc(1.26),
        }}
      />
    </div>
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
      {/* Desktop — exact reproduction of Telli select page.svg */}
      <div className={styles.desktop}>{renderDesktopArtboard()}</div>

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
