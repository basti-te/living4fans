import Link from "next/link";
import SceneTile from "./SceneTile";
import { getColor } from "@/lib/colors";
import { formatPrice, type Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const color = getColor(product.defaultColor);
  return (
    <Link href={`/shop/${product.slug}`} className="product-card">
      <div className="tile-frame">
        <SceneTile
          grid={product.grid}
          color={color.hex}
          wall={product.wall}
          cellW={product.cellW}
          cellH={product.cellH}
          casters={product.slug === "haller-rollcontainer"}
          scale={product.grid[0].length >= 4 ? 0.85 : product.grid[0].length >= 3 ? 0.8 : 0.55}
        />
      </div>
      <div className="product-card-info">
        <div className="product-card-name">
          <span>{product.name}</span>
          <span className="tabular">{formatPrice(product.price)}</span>
        </div>
        <div className="product-card-meta">
          {product.categoryLabel} · {color.name} · {product.dimensions}
        </div>
      </div>
    </Link>
  );
}
