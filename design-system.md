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
- Hero-/Interlude-Medien dürfen dunkel sein; Hero-Text steht in `Gips` auf
  dunklem Bildgrund oder in `Kohle` auf hellem Bildgrund — nie mit Scrim
  oder Verlauf unterlegt.

## 2. Typografie

- Eine Schriftfamilie: Archivo (400/500/700). Keine zweite Familie.
- Display-Ebene: >=150px Desktop (clamp bis ~52px mobil), Versalien,
  letter-spacing -0.045em bis -0.056em, Gewicht 400-500.
- Labels/Eyebrows: 10-12px, Versalien, letter-spacing +0.083em bis +0.1em.
- Fließtext: 17-20px, Zeilenhöhe 1.5, Farbe Umbra, max. ~52ch.
- Keine Zwischengrößen 24-36px. Die Lücke zwischen 20 und 40px bleibt leer.
- Pro Scroll-Abschnitt der Startseite existiert mindestens ein Display-Wort;
  Typografie ist das einzige Dekorationselement des Interfaces.

## 3. Linien, Formen, Buttons

- Trennung ausschließlich durch 1px-Hairlines in Kohle. Nav und Footer sind
  in Hairline-Zellen segmentiert.
- Radius 0 auf allem außer Pills (9999px). Bilder und Kacheln immer eckig.
- Buttons: (a) Pill mit 1px-Rand, Versalien-Label, Hover = Invertierung;
  (b) gefüllter eckiger Kohle-Button, max. einer pro Viewport.
- Keine Icons als Dekoration; nur funktionale Icons (max. 20px, 1px Strich).

## 4. Content-Bildsystem „Farbe trifft Patina"

Jedes Produkt-/Kampagnenbild folgt diesen prüfbaren Regeln:

1. Das Möbel ist das einzige gesättigte Objekt im Bild. Umgebung ist
   entsättigt, warm-gebrochen, patiniert.
2. Umgebungen sind historisch oder industriell: Orangerie/Wintergarten,
   Lost-Place-Galerie, Fabriketage/Loft, Betonhalle, Altbau mit Stuck.
   Nie: weißes Studio, Wohnkatalog-Deko, Neubau.
3. Licht: eine erkennbare gerichtete Lichtquelle (Fensterlicht), eine klare
   Schattenkante. Gleiche warme, leicht entsättigte Gradierung über alle
   Bilder einer Seite.
4. Kamera auf Möbelhöhe, Möbel frontal oder leicht gedreht, frei stehend,
   Boden sichtbar. Keine Menschen, keine Logos, keine Requisiten-Flut
   (max. 2-3 stille Objekte).
5. Auf dem Bild liegt niemals UI: kein Text, kein Badge, kein Preis, kein
   Verlauf. Ausnahme: Hero-Displaytitel und Thumbnail-Leiste im Hero.
6. Produktnamen stehen in Versalien UNTER der Kachel, mit Preis rechts.

## 5. Signatur-Farbkarte (Content, nicht UI)

Kuratiertes Pairing — jede Signaturfarbe hat ihren Ort:

| Signatur | Farbe (Panel) | Ort |
|---|---|---|
| ENZIAN | Enzianblau RAL 5010 | Orangerie / Wintergarten |
| TANNE | USM Grün | Lost-Place-Galerie |
| RUBIN | Rubinrot | Fabriketage, rohes Ziegelwerk |
| GOLD | Goldgelb RAL 1004 | Betonhalle / Werkstatt |
| GRAPHIT | Graphitschwarz | Penthouse-Loft, Abendlicht |
| KREIDE | Reinweiß RAL 9010 | Altbau-Atelier mit Stuck |

## 6. Motion

- Scroll-Reveals: Opazität + max. 30px Translation, 600-900ms, ease-out.
  Nichts animiert unter 400ms.
- Videos: langsame, eindeutige Kamerabewegung in EINE Richtung (Dolly-in,
  Schwenk ODER Lichtwanderung). Keine Schnitte unter 4s, kein Zoom-Gewitter.
- Hintergrundvideos laufen stumm, autoplay, loop, ohne Controls.
- `prefers-reduced-motion` deaktiviert alle Reveals und Autoplay-Videos.

## 7. Verbote

- Kein Schatten, kein Verlauf, keine Rundung außer Pills, keine zweite
  Flächenfarbe, keine Akzentfarbe im UI, kein Text auf Fotografien
  (außer Hero), keine Menschen in Produktbildern, kein weißes Studio.
