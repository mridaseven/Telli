import type { ReactNode } from "react";
import { StoreProvider } from "@/context/StoreContext";
import "@/styles/tokens.css";
import "@/styles/desktop.css";
import "@/styles/mobile.css";
import "./globals.css";

export const metadata = {
  title: "Phonem Brand — iPhone Store",
  description: "As good as new. As simple as it gets.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
