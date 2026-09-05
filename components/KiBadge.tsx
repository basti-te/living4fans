/**
 * Kennzeichnung KI-generierter/-bearbeiteter Inhalte (Art. 50 EU AI Act) —
 * kleines, halbtransparentes Overlay in der Bildecke.
 */
export default function KiBadge({
  text = "KI-generiert",
  position = "rechts",
}: {
  text?: string;
  position?: "links" | "rechts";
}) {
  return (
    <span className={`ki-badge ki-badge-${position}`} aria-label={`Hinweis: ${text}`}>
      {text}
    </span>
  );
}
