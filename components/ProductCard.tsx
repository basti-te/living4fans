import Link from "next/link";
import SceneTile from "./SceneTile";
import { getColor } from "@/lib/colors";
import { formatPrice, type Product } from "@/lib/products";

export default function ProductCard({
  product,
}: {
  product: Product & { aufAnfrage?: boolean };
}) {
  const color = getColor(product.defaultColor);
  const title = product.signature ?? product.name;
  const meta = [
    product.categoryLabel,
    product.signature ? color.name : null,
    product.signature ? product.ort : product.dimensions || "Alle Farben",
  ]
    .filter(Boolean)
    .join(" · ");
  const priceLabel = product.aufAnfrage
    ? "Auf Anfrage"
    : formatPrice(product.price);

  return (
    <Link href={`/shop/${product.slug}`} className="product-card">
      <div className="tile-frame">
        {product.image ? (
          <div className="media-tile ratio-45">
            <img
              src={product.image}
              alt={`${product.name} in ${color.name}, aufgenommen: ${product.ort}`}
              loading="lazy"
            />
          </div>
        ) : product.grid.length > 0 ? (
          <SceneTile
            grid={product.grid}
            color={color.hex}
            wall={product.wall}
            cellW={product.cellW}
            cellH={product.cellH}
            casters={product.slug === "haller-rollcontainer"}
            scale={product.grid[0].length >= 4 ? 0.85 : product.grid[0].length >= 3 ? 0.8 : 0.55}
            aspect="4 / 5"
          />
        ) : (
          <div
            className="media-tile ratio-45"
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <span className="label meta">Fotos folgen</span>
          </div>
        )}
      </div>
      <div className="product-card-info">
        <div className="product-card-name">
          <span style={{ textTransform: "uppercase", letterSpacing: "0.02em" }}>
            {title}
          </span>
          <span className="tabular">{priceLabel}</span>
        </div>
        <div className="product-card-meta">
          <span>{meta}</span>
          <span className="product-card-cta">Ansehen →</span>
        </div>
      </div>
    </Link>
  );
}
