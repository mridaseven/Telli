"use client";

import Link from "next/link";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.landing}>
      <div className={styles.frame}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/designs/Telli.svg"
          alt="Telli — As good as new. As simple as it gets."
          className={styles.art}
        />
        <Link
          href="/select"
          className={styles.launchHit}
          aria-label="Launch"
        />
      </div>
    </div>
  );
}
