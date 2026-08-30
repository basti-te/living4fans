import { getSettings } from "@/lib/shop";
import EinstellungenForm from "@/components/admin/EinstellungenForm";

export const dynamic = "force-dynamic";

export default async function AdminEinstellungen() {
  const settings = await getSettings();

  return (
    <div>
      <h1 className="heading-lg mb-40">Versand &amp; Preise</h1>
      <p className="body-copy mb-40" style={{ maxWidth: "58ch" }}>
        Diese Werte steuern die Logistik-Matrix des Shops: Kleine Möbelstücke
        gehen per Paket, mittlere liefern wir im Radius selbst aus, große (und
        alles ab der Schwelle) werden immer per persönlichem Angebot verkauft.
        Einzelne Produkte können die Versandkosten individuell überschreiben.
      </p>
      <EinstellungenForm settings={settings} />
    </div>
  );
}
