"use client";

import Link from "next/link";
import styles from "./InfoPage.module.css";

type InfoPageProps = {
  title: string;
  body: string[];
};

export default function InfoPage({ title, body }: InfoPageProps) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>
          Phonem Brand
        </Link>
        <nav className={styles.nav} aria-label="Main navigation">
          <Link href="/helpdesk" className={styles.navLink}>
            Helpdesk
          </Link>
          <span className={styles.navDivider} aria-hidden="true">
            |
          </span>
          <Link href="/about" className={styles.navLink}>
            About us
          </Link>
        </nav>
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.underline} aria-hidden="true" />
        <div className={styles.body}>
          {body.map((paragraph, i) => (
            <p key={i} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </main>
    </div>
  );
}
