"use client";

import Link from "next/link";
import styles from "./MobileHome.module.css";

export default function MobileHome() {
  return (
    <main className={styles.page}>
      <span className={styles.decorTop}>Lorem ipsum</span>

      <div className={styles.phoneFrame}>
        <div className={styles.phoneContent}>
          <span className={styles.decorInside}>Lorem ipsum</span>
          <h1 className={styles.brand}>Phonem</h1>

          <nav className={styles.menu}>
            <Link href="/select" className={styles.menuItem}>
              <span className={styles.menuDivider}>|</span> Launch
            </Link>
            <span className={styles.menuItem}>Helpdesk</span>
            <span className={styles.menuItem}>About us</span>
          </nav>
        </div>
      </div>

      <p className={styles.welcome}>Welcome...</p>
    </main>
  );
}
