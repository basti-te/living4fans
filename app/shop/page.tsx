import { Suspense } from "react";
import type { Metadata } from "next";
import ShopGrid from "@/components/ShopGrid";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Aufbereitete USM Haller Sideboards, Highboards, Regale und Container — neu pulverbeschichtet in Ihrer Wunschfarbe.",
};

export default function ShopPage() {
  return (
    <>
      <section className="section" style={{ paddingBottom: 48 }}>
        <div className="container">
          <span className="eyebrow">Shop</span>
          <h1 className="heading-display" style={{ maxWidth: "18ch" }}>
            Aufbereitete Originale
          </h1>
          <p className="body-copy mt-40">
            Jedes Möbelstück wird nach Ihrer Bestellung final konfiguriert und in
            Ihrer Wunschfarbe neu pulverbeschichtet. Die abgebildeten Farben
            sind Vorschläge — Sie entscheiden.
          </p>
        </div>
      </section>
      <Suspense>
        <ShopGrid />
      </Suspense>
    </>
  );
}
