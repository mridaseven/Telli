"use client";

import Link from "next/link";
import { BRAND_NAME } from "@/lib/data";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.landing}>
      <div className={styles.desktop}>
        <header className={styles.header}>
          <span className={styles.brand}>{BRAND_NAME}</span>
          <nav className={styles.nav}>
            <span>Helpdesk</span>
            <span className={styles.navDivider}>|</span>
            <span>About us</span>
          </nav>
        </header>

        <section className={styles.hero}>
          <h1 className={styles.headline}>
            As good as new. As simple as it gets.
          </h1>
          <div className={styles.ctaGroup}>
            <Link href="/select" className={styles.launch}>
              Launch
              <span className={styles.launchUnderline} />
            </Link>
          </div>
        </section>
      </div>

      <div className={styles.mobile}>
        <div className={styles.mobileFrame}>
          <div className={styles.menuButton} aria-hidden="true" />

          <p className={styles.mobileBrand}>{BRAND_NAME}</p>

          <nav className={styles.mobileNav}>
            <Link href="/select" className={styles.mobileNavItemLaunch}>
              | Launch
            </Link>
            <span className={styles.mobileNavItem}>Helpdesk</span>
            <span className={styles.mobileNavItem}>About us</span>
          </nav>

          <p className={styles.mobileWelcome}>Welcome...</p>
        </div>
      </div>
    </div>
  );
}
