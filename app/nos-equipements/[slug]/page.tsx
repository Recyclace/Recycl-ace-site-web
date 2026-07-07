import { getProduct, products } from "@/lib/products";
import ProductDetail from "@/components/ProductDetail";
import CustomProductDetail from "@/components/CustomProductDetail";

export const dynamicParams = true;
export function generateStaticParams() { return products.map((p) => ({ slug: p.slug })); }

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (product) return <ProductDetail product={product} />;
  return <CustomProductDetail slug={params.slug} />;
}
