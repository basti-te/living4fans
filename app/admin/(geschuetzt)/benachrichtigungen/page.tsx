import { getSettings } from "@/lib/shop";
import { mailConfigured } from "@/lib/mail";
import BenachrichtigungenForm from "@/components/admin/BenachrichtigungenForm";

export const dynamic = "force-dynamic";

export default async function AdminBenachrichtigungen() {
  const settings = await getSettings();
  const bereit = mailConfigured();

  return (
    <div>
      <h1 className="heading-lg mb-40">Mail-Benachrichtigungen</h1>
      <p className="body-copy mb-40" style={{ maxWidth: "58ch" }}>
        Bei neuen Bestellungen und Anfragen über die Website wird automatisch
        eine E-Mail an die hinterlegte Adresse geschickt — mit allen Details
        und Link ins Dashboard.
      </p>

      {!bereit ? (
        <div className="stat-block" style={{ maxWidth: 560, marginBottom: 40, border: "1px solid #8a5a1d", padding: "20px 24px" }}>
          <span className="label" style={{ display: "block", marginBottom: 12, color: "#8a5a1d" }}>
            Mail-Versand noch nicht eingerichtet
          </span>
          <p className="caption meta" style={{ textTransform: "none", letterSpacing: 0, fontSize: 14, lineHeight: 1.6 }}>
            Benachrichtigungen werden erst verschickt, wenn ein Resend-Konto
            verbunden ist: 1. Kostenloses Konto auf resend.com anlegen (100
            Mails/Tag frei). 2. API-Key erzeugen und in Vercel als{" "}
            <code>RESEND_API_KEY</code> hinterlegen. 3. Optional die Domain
            living4fans.de bei Resend verifizieren und{" "}
            <code>MAIL_FROM</code> setzen (z.&nbsp;B. „Living4Fans Shop
            &lt;shop@living4fans.de&gt;") — bis dahin wird über die
            Resend-Testadresse gesendet. Die Einstellungen unten können Sie
            trotzdem schon speichern.
          </p>
        </div>
      ) : null}

      <BenachrichtigungenForm settings={settings} mailBereit={bereit} />
    </div>
  );
}
