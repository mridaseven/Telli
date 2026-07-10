"use client";

import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import UnderlineInput from "@/components/shared/UnderlineInput";
import styles from "./MobileCheckout.module.css";

interface MobileCheckoutProps {
  onBack: () => void;
}

export default function MobileCheckout({ onBack }: MobileCheckoutProps) {
  const {
    selection,
    checkout,
    setCheckoutField,
    orderSubmitted,
    submitOrder,
    resetOrder,
  } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitOrder();
  };

  return (
    <main className={styles.page}>
      <header className={styles.topBar}>
        <button type="button" onClick={onBack} className={styles.backLink}>
          ]
        </button>
        <Link href="/" className={styles.brand}>
          Phonem
        </Link>
      </header>

      <section className={styles.checkoutSection}>
        <h1 className={styles.checkoutTitle}>Checkout</h1>
        <div className={styles.checkoutUnderline} />

        <p className={styles.selectionSummary}>
          {selection.model} · {selection.color} · {selection.capacity}
        </p>

        <form className={styles.checkoutForm} onSubmit={handleSubmit}>
          <UnderlineInput
            id="mobile-name"
            label="Type in name..."
            value={checkout.name}
            onChange={(v) => setCheckoutField("name", v)}
            variant="mobile"
          />
          <UnderlineInput
            id="mobile-address"
            label="Type in adress..."
            value={checkout.address}
            onChange={(v) => setCheckoutField("address", v)}
            variant="mobile"
          />
          <UnderlineInput
            id="mobile-postal"
            label="Type in Postalcode..."
            value={checkout.postalCode}
            onChange={(v) => setCheckoutField("postalCode", v)}
            variant="mobile"
          />
          <UnderlineInput
            id="mobile-city"
            label="Type in City......"
            value={checkout.city}
            onChange={(v) => setCheckoutField("city", v)}
            variant="mobile"
          />
          <UnderlineInput
            id="mobile-email"
            label="Type in emailadress..."
            value={checkout.email}
            onChange={(v) => setCheckoutField("email", v)}
            type="email"
            variant="mobile"
          />

          <button type="submit" className={styles.sendBtn}>
            Send
            <span className={styles.sendUnderline} />
          </button>
        </form>
      </section>

      {orderSubmitted && (
        <div className={styles.confirmation} role="alert">
          <p>Order submitted successfully!</p>
          <button type="button" onClick={resetOrder} className={styles.confirmClose}>
            Close
          </button>
        </div>
      )}
    </main>
  );
}
