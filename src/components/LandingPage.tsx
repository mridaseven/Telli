"use client";

import Link from "next/link";
import { Brand, BRAND_NAMES } from "@/lib/data";
import styles from "./LandingPage.module.css";

type LandingPageProps = {
  brand: Brand;
};

export default function LandingPage({ brand }: LandingPageProps) {
  const brandName = BRAND_NAMES[brand];

  return (
    <div className={styles.landing}>
      {/* Desktop — Phonem.svg / Telli.svg */}
      <div className={styles.desktop}>
        <header className={styles.header}>
          <span className={styles.brand}>{brandName}</span>
          <nav className={styles.nav}>
            <span>Helpdesk</span>
            <span className={styles.navDivider}>|</span>
            <span>About us</span>
            <span>ipsum</span>
          </nav>
        </header>

        <section className={styles.hero}>
          <h1 className={styles.headline}>
            As good as new. As simple as it gets.
          </h1>
          <div className={styles.ctaGroup}>
            <Link href={`/${brand}/select`} className={styles.launch}>
              Launch
              <span className={styles.launchUnderline} />
            </Link>
            <p className={styles.subtitle}>Lorem ipsum</p>
          </div>
        </section>
      </div>

      {/* Mobile — Telli Mobile.svg */}
      <div className={styles.mobile}>
        <p className={styles.mobileTopLabel}>Lorem ipsum</p>

        <div className={styles.mobileFrame}>
          <div className={styles.menuButton} aria-hidden="true" />
          <p className={styles.mobileLorem}>Lorem ipsum</p>

          <p className={styles.mobileBrand}>{brandName}</p>

          <nav className={styles.mobileNav}>
            <Link
              href={`/${brand}/select`}
              className={styles.mobileNavItemLaunch}
            >
              | Launch<span className={styles.ipsum}>ipsum</span>
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
