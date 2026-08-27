import Link from "next/link";
import SceneTile from "./SceneTile";
import { getColor } from "@/lib/colors";
import { formatPrice, type Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const color = getColor(product.defaultColor);
  const title = product.signature ?? product.name;
  const meta = product.signature
    ? `${product.categoryLabel} · ${color.name} · ${product.ort}`
    : `${product.categoryLabel} · ${color.name} · ${product.dimensions}`;

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
        ) : (
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
        )}
      </div>
      <div className="product-card-info">
        <div className="product-card-name">
          <span style={{ textTransform: "uppercase", letterSpacing: "0.02em" }}>
            {title}
          </span>
          <span className="tabular">{formatPrice(product.price)}</span>
        </div>
        <div className="product-card-meta">{meta}</div>
      </div>
    </Link>
  );
}
