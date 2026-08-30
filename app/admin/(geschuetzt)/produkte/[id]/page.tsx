import { notFound } from "next/navigation";
import ProduktForm from "@/components/admin/ProduktForm";
import { getProductAdmin } from "@/lib/shop";

export const dynamic = "force-dynamic";

export default async function ProduktBearbeiten({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductAdmin(id);
  if (!product) notFound();

  return (
    <div>
      <h1 className="heading-lg mb-40">{product.name} bearbeiten</h1>
      <ProduktForm product={product} />
    </div>
  );
}
