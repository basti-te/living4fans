"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import { CATEGORIES, PRODUCTS } from "@/lib/products";

export default function ShopGrid() {
  const router = useRouter();
  const params = useSearchParams();
  const active = params.get("kategorie") ?? "alle";

  const filtered = useMemo(
    () =>
      active === "alle"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === active),
    [active]
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
          {CATEGORIES.map((c) => (
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
            In dieser Kategorie ist aktuell kein Möbel verfügbar. Fragen Sie
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
