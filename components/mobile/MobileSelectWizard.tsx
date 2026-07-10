"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import {
  CAPACITIES,
  COLORS,
  IPHONE_MODELS,
} from "@/lib/products";
import SelectList from "@/components/shared/SelectList";
import MobileCheckout from "./MobileCheckout";
import styles from "./MobileSelectWizard.module.css";

const STEPS = [
  { key: "model", titleRegular: "Select ", titleBold: "iPhone", items: IPHONE_MODELS },
  { key: "color", titleRegular: "Select ", titleBold: "Color", items: COLORS },
  { key: "capacity", titleRegular: "Select ", titleBold: "Capacity", items: CAPACITIES },
] as const;

type StepKey = (typeof STEPS)[number]["key"];

export default function MobileSelectWizard() {
  const { selection, setModel, setColor, setCapacity } = useStore();
  const [stepIndex, setStepIndex] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);

  const currentStep = STEPS[stepIndex];
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === STEPS.length - 1;

  const getSelected = (key: StepKey) => {
    if (key === "model") return selection.model;
    if (key === "color") return selection.color;
    return selection.capacity;
  };

  const handleSelect = (key: StepKey, item: string) => {
    if (key === "model") setModel(item as typeof selection.model);
    else if (key === "color") setColor(item as typeof selection.color);
    else setCapacity(item as typeof selection.capacity);
  };

  const handlePrev = () => {
    if (showCheckout) {
      setShowCheckout(false);
      return;
    }
    if (!isFirst) setStepIndex((i) => i - 1);
  };

  const handleNext = () => {
    if (isLast) {
      setShowCheckout(true);
      return;
    }
    setStepIndex((i) => i + 1);
  };

  if (showCheckout) {
    return <MobileCheckout onBack={handlePrev} />;
  }

  return (
    <main className={styles.page}>
      <header className={styles.topBar}>
        <Link href="/" className={styles.backLink}>
          ]
        </Link>
      </header>

      <section className={styles.step}>
        <div className={styles.sectionHeader}>
          <h1 className={styles.sectionTitle}>
            <span className={styles.titleRegular}>{currentStep.titleRegular}</span>
            <span className={styles.titleBold}>{currentStep.titleBold}</span>
          </h1>
          <div className={styles.titleUnderline} />
        </div>

        <SelectList
          items={currentStep.items}
          selected={getSelected(currentStep.key)}
          onSelect={(item) => handleSelect(currentStep.key, item)}
          variant="mobile"
          ariaLabel={`${currentStep.titleBold} options`}
        />
      </section>

      <nav className={styles.navButtons}>
        <button
          type="button"
          className={styles.navBtn}
          onClick={handlePrev}
          disabled={isFirst}
        >
          Prev
        </button>
        <span className={styles.navDivider}>|</span>
        <button type="button" className={styles.navBtn} onClick={handleNext}>
          Next
        </button>
        <span className={styles.navLinePrev} />
        <span className={styles.navLineNext} />
      </nav>
    </main>
  );
}
