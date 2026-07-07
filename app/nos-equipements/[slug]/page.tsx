import type { Metadata } from "next";
import { getProduct, products } from "@/lib/products";
import ProductDetail from "@/components/ProductDetail";
import CustomProductDetail from "@/components/CustomProductDetail";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.recyclace.com";
export const dynamicParams = true;
export function generateStaticParams() { return products.map((p) => ({ slug: p.slug })); }

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProduct(params.slug);
  if (!p) return { title: "Équipement" };
  return {
    title: p.name.fr,
    description: p.description.fr.slice(0, 300),
    alternates: { canonical: `/nos-equipements/${p.slug}` },
    openGraph: { title: `${p.name.fr} — Recycl'ace`, description: p.description.fr.slice(0, 300), images: [p.colors[0].images[0]] },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) return <CustomProductDetail slug={params.slug} />;
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Product",
    name: product.name.fr, description: product.description.fr,
    image: product.colors[0].images.map((i) => (i.startsWith("http") ? i : `${base}${i}`)),
    brand: { "@type": "Brand", name: "Recycl'ace" },
    offers: { "@type": "Offer", priceCurrency: "EUR", price: product.price.toFixed(2), availability: "https://schema.org/InStock", url: `${base}/nos-equipements/${product.slug}` },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetail product={product} />
    </>
  );
}
