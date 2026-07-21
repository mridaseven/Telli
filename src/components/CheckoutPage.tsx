"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./CheckoutPage.module.css";

export default function CheckoutPage() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    postalCode: "",
    city: "",
    email: "",
  });

  const update = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className={styles.page}>
      <div className={styles.stage}>
        <header className={styles.header}>
          <h1 className={styles.title}>Checkout</h1>
          <div className={styles.underline} aria-hidden="true" />
        </header>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.field}>
            <input
              className={styles.input}
              type="text"
              placeholder="Type in name..."
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <input
                className={styles.input}
                type="text"
                placeholder="Type in adress..."
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <input
                className={styles.input}
                type="text"
                placeholder="Type in Postalcode..."
                value={form.postalCode}
                onChange={(e) => update("postalCode", e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <input
                className={styles.input}
                type="text"
                placeholder="Type in City......"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.field}>
            <input
              className={styles.input}
              type="email"
              placeholder="Type in emailadress..."
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>

          <div className={styles.actions}>
            <Link href="/select" className={styles.prev}>
              Prev
            </Link>
            <button type="submit" className={styles.send}>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
