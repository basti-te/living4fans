import { getSettings } from "@/lib/shop";
import { stripeConfigured } from "@/lib/stripeClient";
import ZahlungenForm from "@/components/admin/ZahlungenForm";

export const dynamic = "force-dynamic";

export default async function AdminZahlungen() {
  const settings = await getSettings();

  return (
    <div>
      <h1 className="heading-lg mb-40">Zahlungsmethoden für Kunden</h1>
      <p className="body-copy mb-40" style={{ maxWidth: "58ch" }}>
        Steuert, wie Kunden im Shop bezahlen können. Stripe zieht das Geld
        sofort ein; bei Vorkasse wird die Bestellung mit Status „offen"
        angelegt und der Kunde erhält Bankverbindung, PayPal-Adresse und
        Bestellnummer als Verwendungszweck. Zahlungseingang bestätigen Sie
        unter „Bestellungen" (Status auf „Bezahlt").
      </p>
      <ZahlungenForm settings={settings} stripeBereit={stripeConfigured()} />
    </div>
  );
}
