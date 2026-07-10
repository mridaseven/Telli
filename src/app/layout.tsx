import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phonem & Telli",
  description: "As good as new. As simple as it gets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
