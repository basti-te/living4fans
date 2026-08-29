# design-system.md — Living4Fans

Verbindliche Regeln für Interface und Content. Der System-Kritiker prüft
gerenderte Screenshots ausschließlich gegen dieses Dokument. Jede Regel ist
mit bloßem Auge prüfbar.

## 1. Interface-Farben (Chrome)

| Rolle | Wert | Name |
|---|---|---|
| Grund (einzige Flächenfarbe) | `#EFEBE2` | Gips |
| Tinte (Headlines, UI, Linien) | `#26231D` | Kohle |
| Sekundärtext | `#3B3831` | Umbra |
| Metadaten / Captions | `#5C574C` | Zinn |

- Es existiert genau EINE Flächenfarbe (`Gips`). Keine weißen Karten, keine
  zweite Surface, keine Verläufe, keine Schatten im UI.
- Keine chromatische Akzentfarbe im Interface. Sämtliche Farbigkeit kommt
  aus Fotografien/Videos (den Möbeln selbst).
- Hero-/Interlude-Medien dürfen dunkel sein. Der Hero-Textblock (Eyebrow,
  Markentitel, Claim) steht in `Kohle` auf `Gips` OBERHALB des Mediums,
  nie auf dem Bild — Lesbarkeit hat Vorrang (Kundenvorgabe). Kein Scrim,
  kein Verlauf.

## 2. Typografie

- Eine Schriftfamilie: Archivo (400/500/700). Keine zweite Familie.
- Display-Ebene: >=140px auf großen Desktops (clamp bis ~44px mobil),
  Versalien, letter-spacing -0.045em bis -0.056em, Gewicht 400-500.
- Headline-Ebene: 40-72px für Sektions-Überschriften, Versalien oder
  Satzschrift, Gewicht 500-700.
- Labels/Eyebrows: 10-12px, Versalien, letter-spacing +0.083em bis +0.1em.
- Fließtext: 17-20px, Zeilenhöhe 1.5, Farbe Umbra, max. ~52ch.
- Keine Zwischengrößen 24-36px. Die Lücke zwischen 20 und 40px bleibt leer.
- Deko-Display-Ebene: Jede Hauptsektion der Startseite öffnet mit einem
  einzelnen monumentalen Versal-Wort >=140px (großer Desktop), das über die
  volle Breite läuft und vollständig lesbar bleibt — kein seitlicher
  Anschnitt (Kundenvorgabe). Typografie ist das einzige Dekorationselement
  des Interfaces.

## 3. Linien, Formen, Buttons

- Trennung ausschließlich durch 1px-Hairlines in Kohle. Nav und Footer sind
  in Hairline-Zellen segmentiert.
- Radius 0 auf allem. Bilder, Kacheln und Buttons immer eckig.
- Buttons: (a) Eckpunkt-Rechteck — 1px-Rand, vier kleine Kohle-Punkte in den
  Ecken, Versalien-Label; Hover = Invertierung (Kohle-Füllung, Gips-Text);
  aktive Filter erhalten doppelte Innenlinie, nie eine Dauer-Füllung;
  (b) gefüllter eckiger Kohle-Button, max. einer pro Viewport.
- Keine Icons als Dekoration; nur funktionale Icons (max. 20px, 1px Strich).

## 4. Content-Bildsystem „Farbe trifft Patina"

Jedes Produkt-/Kampagnenbild folgt diesen prüfbaren Regeln:

1. Das Möbel ist das einzige gesättigte Objekt im Bild. Umgebung ist
   entsättigt, warm-gebrochen, patiniert.
2. Umgebungen sind historisch oder industriell: Orangerie/Wintergarten,
   Lost-Place-Galerie, Fabriketage/Loft, Betonhalle, Altbau mit Stuck.
   Nie: weißes Studio, Wohnkatalog-Deko, Neubau.
3. Licht: EIN Lichtsystem über die ganze Seite — Fensterlicht von links,
   eine klare Schattenkante nach rechts, gleiche warme, leicht entsättigte
   Gradierung über alle Bilder. Die Räume wechseln, das Licht nie.
4. Kamera auf Augenhöhe des Möbelstücks (bei niedrigen Stücken wie
   Beistelltischen und Containern ist ein leicht erhöhter Standpunkt
   zulässig), Möbel frontal oder leicht gedreht, frei stehend,
   Boden sichtbar. Keine Menschen, keine Logos, keine Requisiten-Flut auf
   der Bühne (max. 2-3 stille Objekte im Raum). Inhalte IN den Fächern des
   Möbelstücks (Bücher, Keramik) zählen nicht als Bühnen-Requisiten — sie
   zeigen Funktion, solange sie das Möbelstück nicht verdecken.
   Ausnahme Scroll-Film: Im Demontage-/Montage-Film der Startseite dürfen
   Monteure sichtbar sein — dort erzählen Menschen das Handwerk.
5. Auf dem Bild liegt niemals UI: kein Text, kein Badge, kein Preis, kein
   Verlauf — auch im Hero nicht. Der Hero-Textblock steht auf Gips oberhalb
   des Mediums.
6. Produktnamen stehen in Versalien UNTER der Kachel, mit Preis rechts.

## 5. Signatur-Farbkarte (Content, nicht UI)

Kuratiertes Pairing — jede Signaturfarbe hat ihren Ort:

| Signatur | Farbe (Panel) | Ort |
|---|---|---|
| ENZIAN | Enzianblau RAL 5010 | Orangerie |
| TANNE | USM Grün | Galerie |
| RUBIN | Rubinrot | Fabriketage |
| GOLD | Goldgelb RAL 1004 | Atelier |
| GRAPHIT | Graphitschwarz | Loft |
| KREIDE | Reinweiß RAL 9010 | Altbau |
| SAND | Beige USM 13 | Wintergarten |
| STAHL | Stahlblau USM 39 | Maschinenhalle |

## 6. Motion

- Scroll-Reveals: Opazität + max. 30px Translation, 600-900ms, ease-out.
  Nichts animiert unter 400ms.
- Videos: langsame, eindeutige Kamerabewegung in EINE Richtung (Dolly-in,
  Schwenk ODER Lichtwanderung). Keine Schnitte unter 4s, kein Zoom-Gewitter.
- Hintergrundvideos laufen stumm, autoplay, loop, ohne Controls.
- `prefers-reduced-motion` deaktiviert alle Reveals und Autoplay-Videos.

## 7. Verbote

- Kein Schatten, kein Verlauf, keine Rundungen, keine zweite Flächenfarbe,
  keine Akzentfarbe im UI, kein Text auf Fotografien,
  keine Menschen in Produktbildern, kein weißes Studio, kein glühendes
  Werkstatt-Pathos: Prozessbilder zeigen realistische Betriebsgrößen und
  physikalisch glaubwürdige Zustände.
- Markenrecht: „USM" / „USM Haller" niemals als Displaywort, Headline oder
  prominenter Titel — die Bühne gehört der eigenen Marke Living4Fans.
  „USM Haller" nur beschreibend in Fließtext, Claims, Labels und
  Produktnamen (nominative Nutzung).
