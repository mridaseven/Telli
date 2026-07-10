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
import UnderlineInput from "@/components/shared/UnderlineInput";
import styles from "./DesktopSelect.module.css";

export default function DesktopSelect() {
  const {
    selection,
    setModel,
    setColor,
    setCapacity,
    checkout,
    setCheckoutField,
    orderSubmitted,
    submitOrder,
    resetOrder,
  } = useStore();

  const [activeColumn, setActiveColumn] = useState<"model" | "color" | "capacity">(
    "model",
  );

  const handlePrev = () => {
    if (activeColumn === "color") setActiveColumn("model");
    else if (activeColumn === "capacity") setActiveColumn("color");
  };

  const handleNext = () => {
    if (activeColumn === "model") setActiveColumn("color");
    else if (activeColumn === "color") setActiveColumn("capacity");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitOrder();
  };

  return (
    <main className={styles.page}>
      <header className={styles.topBar}>
        <Link href="/" className={styles.brand}>
          Phonem Brand
        </Link>
      </header>

      <section className={styles.selectorSection}>
        <div className={styles.sectionHeader}>
          <h1 className={styles.sectionTitle}>
            <span className={styles.titleRegular}>Select </span>
            <span className={styles.titleBold}>iPhone</span>
          </h1>
          <div className={styles.titleUnderline} />
        </div>

        <div className={styles.columns}>
          <div
            className={`${styles.column} ${activeColumn === "model" ? styles.columnActive : ""}`}
          >
            <SelectList
              items={IPHONE_MODELS}
              selected={selection.model}
              onSelect={(item) => setModel(item as typeof selection.model)}
              variant="desktop"
              ariaLabel="Select iPhone model"
            />
          </div>

          <div
            className={`${styles.column} ${activeColumn === "color" ? styles.columnActive : ""}`}
          >
            <SelectList
              items={COLORS}
              selected={selection.color}
              onSelect={(item) => setColor(item as typeof selection.color)}
              variant="desktop"
              ariaLabel="Select color"
            />
          </div>

          <div
            className={`${styles.column} ${activeColumn === "capacity" ? styles.columnActive : ""}`}
          >
            <SelectList
              items={CAPACITIES}
              selected={selection.capacity}
              onSelect={(item) => setCapacity(item as typeof selection.capacity)}
              variant="desktop"
              ariaLabel="Select capacity"
            />
          </div>
        </div>

        <div className={styles.navButtons}>
          <button
            type="button"
            className={styles.navBtn}
            onClick={handlePrev}
            disabled={activeColumn === "model"}
          >
            Prev
            <span className={styles.navUnderline} />
          </button>
          <button
            type="button"
            className={styles.navBtn}
            onClick={handleNext}
            disabled={activeColumn === "capacity"}
          >
            Next
            <span className={styles.navUnderline} />
          </button>
        </div>
      </section>

      <section className={styles.checkoutSection}>
        <h2 className={styles.checkoutTitle}>Checkout</h2>
        <div className={styles.checkoutUnderline} />

        <form className={styles.checkoutForm} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <UnderlineInput
              id="name"
              label="Type in name..."
              value={checkout.name}
              onChange={(v) => setCheckoutField("name", v)}
              variant="desktop"
            />
          </div>

          <div className={styles.formRow}>
            <UnderlineInput
              id="address"
              label="Type in adress..."
              value={checkout.address}
              onChange={(v) => setCheckoutField("address", v)}
              variant="desktop"
            />
            <UnderlineInput
              id="postalCode"
              label="Type in Postalcode..."
              value={checkout.postalCode}
              onChange={(v) => setCheckoutField("postalCode", v)}
              variant="desktop"
            />
            <UnderlineInput
              id="city"
              label="Type in City......"
              value={checkout.city}
              onChange={(v) => setCheckoutField("city", v)}
              variant="desktop"
            />
          </div>

          <div className={styles.formRow}>
            <UnderlineInput
              id="email"
              label="Type in emailadress..."
              value={checkout.email}
              onChange={(v) => setCheckoutField("email", v)}
              type="email"
              variant="desktop"
            />
          </div>

          <button type="submit" className={styles.sendBtn}>
            Send
            <span className={styles.sendUnderline} />
          </button>
        </form>
      </section>

      {orderSubmitted && (
        <div className={styles.confirmation} role="alert">
          <p>Order submitted successfully!</p>
          <p className={styles.confirmationDetail}>
            {selection.model} · {selection.color} · {selection.capacity}
          </p>
          <button type="button" onClick={resetOrder} className={styles.confirmClose}>
            Close
          </button>
        </div>
      )}
    </main>
  );
}
