import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import ProductConfigurator from "@/components/ProductConfigurator";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { PRODUCTS, getProduct } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.teaser,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container">
          <div className="caption meta mb-40" style={{ display: "flex", gap: 10 }}>
            <Link href="/shop">Shop</Link>
            <span>/</span>
            <span>{product.name}</span>
          </div>
          <ProductConfigurator product={product} />
        </div>
      </section>

      <hr className="hairline" />

      <section className="section">
        <div className="container">
          <div className="split">
            <Reveal>
              <div className="split-label">Was wir an diesem Möbel machen</div>
            </Reveal>
            <Reveal delay={100}>
              <ul className="detail-list">
                {product.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Ebenfalls im Atelier</span>
            <h2 className="heading-display mb-68">Weitere Möbel</h2>
          </Reveal>
          <div className="product-grid">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
