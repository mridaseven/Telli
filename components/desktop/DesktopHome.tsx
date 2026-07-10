"use client";

import Link from "next/link";
import styles from "./DesktopHome.module.css";

export default function DesktopHome() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <span className={styles.brand}>Phonem Brand</span>
        <nav className={styles.nav}>
          <span>Helpdesk</span>
          <span className={styles.navDivider}>|</span>
          <span>About us</span>
        </nav>
      </header>

      <span className={styles.decorTop}>Lor</span>

      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          As good as new. As simple as it gets.
        </h1>
        <div className={styles.heroCta}>
          <p className={styles.heroSubtext}>Lorem ipsum</p>
          <Link href="/select" className={styles.launch}>
            Launch
          </Link>
          <span className={styles.launchUnderline} />
        </div>
      </section>

      <span className={styles.decorMid}>Lorem ipsum</span>
    </main>
  );
}
