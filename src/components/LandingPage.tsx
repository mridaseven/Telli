"use client";

import Link from "next/link";
import { BRAND_NAME } from "@/lib/data";
import styles from "./LandingPage.module.css";

/* Exact desktop coordinates from "Telli.svg" (viewBox 1920×1080).
   Everything is scaled uniformly by the CSS var --s. */
const sc = (v: number) => `calc(${v}px * var(--s))`;

export default function LandingPage() {
  return (
    <div className={styles.landing}>
      {/* Desktop — exact reproduction of Telli.svg */}
      <div className={styles.desktop}>
        <div className={styles.board}>
          <span
            className={styles.brand}
            style={{ left: sc(119.43), top: sc(84.79 - 19) }}
          >
            {BRAND_NAME}
          </span>

          <span
            className={styles.navHelp}
            style={{ left: sc(1575.69), top: sc(79.43 - 19) }}
          >
            Helpdesk&nbsp;&nbsp;|
          </span>
          <span
            className={styles.navAbout}
            style={{ left: sc(1709.34), top: sc(80.43 - 19) }}
          >
            About us
          </span>

          <h1
            className={styles.headline}
            style={{ left: sc(170.25), top: sc(395.08 - 43.4) }}
          >
            As good as new. As simple as it gets.
          </h1>

          <Link
            href="/select"
            className={styles.launch}
            style={{ left: sc(177.02), top: sc(464.65 - 22.3) }}
          >
            Launch
          </Link>
          <span
            className={styles.launchLine}
            style={{
              left: sc(173.92),
              top: sc(473.08),
              width: sc(98.22),
              height: sc(3.08),
            }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Mobile */}
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
