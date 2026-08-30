"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import type { ShopProduct } from "@/lib/shop";

const CATEGORY_LABELS: Record<string, string> = {
  sideboards: "Sideboards",
  highboards: "Highboards",
  lowboards: "Lowboards",
  regale: "Regale",
  container: "Container",
  tische: "Tische",
  nachttische: "Nachttische",
  servierwagen: "Servierwagen & Bars",
  flur: "Flur & Garderobe",
  kuechen: "Küche & Bad",
  accessoires: "Accessoires",
  individuell: "Individuell",
};

export default function ShopGrid({ products }: { products: ShopProduct[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const active = params.get("kategorie") ?? "alle";

  const categories = useMemo(() => {
    const present = new Set(products.map((p) => p.category));
    return Object.entries(CATEGORY_LABELS)
      .filter(([id]) => present.has(id))
      .map(([id, label]) => ({ id, label }));
  }, [products]);

  const filtered = useMemo(
    () =>
      active === "alle"
        ? products
        : products.filter((p) => p.category === active),
    [active, products]
  );

  const setCategory = (id: string) => {
    router.replace(id === "alle" ? "/shop" : `/shop?kategorie=${id}`, {
      scroll: false,
    });
  };

  return (
    <section style={{ paddingBottom: "var(--section)" }}>
      <div className="container">
        <div className="filter-row mb-68" role="group" aria-label="Kategorie filtern">
          <button
            className={`pill ${active === "alle" ? "is-active" : ""}`}
            onClick={() => setCategory("alle")}
          >
            Alle
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              className={`pill ${active === c.id ? "is-active" : ""}`}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <p className="body-copy">
            In dieser Kategorie ist aktuell kein Möbelstück verfügbar. Fragen Sie
            uns — wir finden das passende Stück für Sie.
          </p>
        ) : (
          <div className="product-grid">
            {filtered.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
