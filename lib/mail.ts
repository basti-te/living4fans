/**
 * Mail-Benachrichtigungen an die Shop-Betreiberin (über Resend).
 * Ohne RESEND_API_KEY werden Benachrichtigungen still übersprungen —
 * der Admin-Bereich „Benachrichtigungen" zeigt den Einrichtungsstatus.
 */

export function mailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function sendeBenachrichtigung(
  an: string,
  betreff: string,
  text: string
): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key || !an.includes("@")) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.MAIL_FROM || "Living4Fans Shop <onboarding@resend.dev>",
        to: [an],
        subject: betreff,
        text,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
