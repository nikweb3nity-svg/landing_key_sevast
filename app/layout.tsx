import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/cookie-consent";
import { metadataConfig } from "@/data/landing";

export const metadata: Metadata = metadataConfig;

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
