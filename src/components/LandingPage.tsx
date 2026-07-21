"use client";

import Link from "next/link";
import styles from "./LandingPage.module.css";

/* Exact coordinates from the Phonem homepage SVG (viewBox 1920×1080),
   scaled uniformly by the CSS var --s. */
const sc = (v: number) => `calc(${v}px * var(--s))`;

const BRAND = "Phonem Brand";

export default function LandingPage() {
  return (
    <div className={styles.landing}>
      {/* Desktop */}
      <div className={styles.desktop}>
        <div className={styles.board}>
          <span
            className={styles.brand}
            style={{ left: sc(119.43), top: sc(84.79 - 19) }}
          >
            {BRAND}
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
            style={{ left: sc(170.25), top: sc(395.08 - 43.4 + 60) }}
          >
            As good as new. As simple as it gets.
          </h1>

          <Link
            href="/select"
            className={styles.launch}
            style={{ left: sc(177.02), top: sc(464.65 - 22.3 + 60) }}
          >
            Launch
          </Link>
          <span
            className={styles.launchLine}
            style={{
              left: sc(173.92),
              top: sc(473.08 + 60),
              width: sc(98.22),
              height: sc(3.08),
            }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Mobile — dark page with centered brand + nav (from the PNG) */}
      <div className={styles.mobile}>
        <div className={styles.mobileInner}>
          <p className={styles.mobileBrand}>{BRAND}</p>

          <nav className={styles.mobileNav}>
            <Link href="/select" className={styles.mobileNavItemLaunch}>
              | Launch
            </Link>
            <span className={styles.mobileNavItem}>Helpdesk</span>
            <span className={styles.mobileNavItem}>About us</span>
          </nav>
        </div>
      </div>
    </div>
  );
}
