import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import ProductConfigurator from "@/components/ProductConfigurator";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { getShopProduct, getShopProducts, getSettings } from "@/lib/shop";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getShopProduct(slug);
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
  const [product, settings] = await Promise.all([
    getShopProduct(slug),
    getSettings(),
  ]);
  if (!product) notFound();

  const all = await getShopProducts();
  const related = all.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container">
          <div className="caption meta mb-40" style={{ display: "flex", gap: 10 }}>
            <Link href="/shop">Shop</Link>
            <span>/</span>
            <span>{product.name}</span>
          </div>
          <ProductConfigurator product={product} settings={settings} />
        </div>
      </section>

      {product.details.length > 0 ? (
        <>
          <hr className="hairline" />
          <section className="section">
            <div className="container">
              <div className="split">
                <Reveal>
                  <div className="split-label">Was wir an diesem Möbelstück machen</div>
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
        </>
      ) : null}

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
