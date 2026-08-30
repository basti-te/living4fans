import ProduktForm from "@/components/admin/ProduktForm";

export const dynamic = "force-dynamic";

export default function NeuesProdukt() {
  return (
    <div>
      <h1 className="heading-lg mb-40">Neues Möbelstück</h1>
      <ProduktForm />
    </div>
  );
}
