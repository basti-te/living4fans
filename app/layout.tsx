import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Living4Fans — Aufbereitete USM Haller Möbel in Wunschfarbe",
    template: "%s — Living4Fans",
  },
  description:
    "Living4Fans bereitet originale USM Haller Möbel in Handarbeit auf und pulverbeschichtet sie neu — in jeder RAL-Wunschfarbe. Sideboards, Highboards, Regale und Container — Versand und Lieferung innerhalb Deutschlands.",
};

export const viewport: Viewport = {
  themeColor: "#f6f1eb",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={archivo.variable}>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
