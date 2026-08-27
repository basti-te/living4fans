export type Cell = "door" | "flap" | "open" | "drawers" | "drawer" | "panel";

export type Product = {
  slug: string;
  name: string;
  /** Signatur-Name aus der Farbkarte (z. B. „Enzian") */
  signature?: string;
  /** Ort der Signatur-Aufnahme (z. B. „Orangerie") */
  ort?: string;
  /** Kampagnenbild unter /public */
  image?: string;
  category: string;
  categoryLabel: string;
  grid: Cell[][];
  cellW: number;
  cellH: number;
  dimensions: string;
  price: number;
  defaultColor: string;
  wall: "light" | "mid" | "warm";
  teaser: string;
  description: string;
  details: string[];
};

export const CATEGORIES = [
  { id: "sideboards", label: "Sideboards" },
  { id: "highboards", label: "Highboards" },
  { id: "lowboards", label: "Lowboards" },
  { id: "regale", label: "Regale" },
  { id: "container", label: "Container" },
  { id: "tische", label: "Beistelltische" },
] as const;

export const PRODUCTS: Product[] = [
  {
    slug: "haller-sideboard-m",
    name: "Haller Sideboard M",
    signature: "Enzian",
    ort: "Orangerie",
    image: "/media/tile-enzian.jpg",
    category: "sideboards",
    categoryLabel: "Sideboard",
    grid: [
      ["open", "open", "open"],
      ["flap", "flap", "flap"],
    ],
    cellW: 150,
    cellH: 74,
    dimensions: "B 2273 × H 740 × T 373 mm",
    price: 2490,
    defaultColor: "enzianblau",
    wall: "light",
    teaser:
      "Der Klassiker fürs Wohnzimmer: drei offene Fächer, drei Klapptüren, endlos viel Ruhe.",
    description:
      "Das dreireihige Sideboard ist die vielleicht bekannteste Konfiguration des USM Haller Systems. Unsere aufbereiteten Exemplare stammen aus Büroauflösungen und Privathaushalten, werden vollständig zerlegt, gereinigt und mit neuen Kugeln, Rohren und Nivellierfüßen wieder aufgebaut. Alle Tablare und Klapptüren werden neu pulverbeschichtet — in einer klassischen USM-Farbe oder Ihrer RAL-Wunschfarbe.",
    details: [
      "Vollständig zerlegt, gereinigt und neu montiert",
      "Neubeschichtung aller Flächen in Wunschfarbe",
      "Chromrohre und Kugeln poliert oder erneuert",
      "Neue Kunststoffgleiter und Nivellierfüße",
      "3 Klapptüren mit neuen Dämpfern",
    ],
  },
  {
    slug: "haller-lowboard-tv",
    name: "Haller Lowboard",
    signature: "Tanne",
    ort: "Galerie",
    image: "/media/tile-tanne.jpg",
    category: "lowboards",
    categoryLabel: "Lowboard",
    grid: [
      ["flap", "flap", "flap"],
      ["open", "open", "open"],
    ],
    cellW: 150,
    cellH: 74,
    dimensions: "B 2273 × H 740 × T 373 mm",
    price: 2190,
    defaultColor: "usmgruen",
    wall: "mid",
    teaser:
      "Drei Elemente flach über dem Boden — die souveränste Bühne für jedes Wohnzimmer.",
    description:
      "Das langgestreckte Lowboard trägt Fernseher, Verstärker und Plattenspieler, ohne sich in den Vordergrund zu spielen. Ein offenes Fach für Geräte mit Fernbedienung, zwei Klapptüren für alles andere. Wie jedes unserer Möbel wird es komplett demontiert, aufbereitet und in Ihrer Wunschfarbe neu pulverbeschichtet.",
    details: [
      "Kabeldurchlässe auf Wunsch werkzeuglos nachrüstbar",
      "Offenes Gerätefach, IR-durchlässig",
      "Neubeschichtung aller Flächen in Wunschfarbe",
      "Neue Kunststoffgleiter und Nivellierfüße",
      "Belastbarkeit ca. 50 kg pro Element",
    ],
  },
  {
    slug: "haller-highboard-l",
    name: "Haller Highboard L",
    signature: "Rubin",
    ort: "Fabriketage",
    image: "/media/tile-rubin.jpg",
    category: "highboards",
    categoryLabel: "Highboard",
    grid: [
      ["flap", "flap"],
      ["flap", "open"],
      ["flap", "flap"],
      ["flap", "flap"],
      ["door", "door"],
    ],
    cellW: 150,
    cellH: 80,
    dimensions: "B 1523 × H 1829 × T 373 mm",
    price: 3490,
    defaultColor: "rubinrot",
    wall: "light",
    teaser:
      "Stauraum in der Vertikalen: zehn Fächer auf fünf Ebenen, ein offenes Schaufach.",
    description:
      "Das Highboard kombiniert offene Präsentationsfächer mit geschlossenen Ebenen — als Geschirrschrank, Barmöbel oder Aktenschrank gleichermaßen zuhause. Die Auszugstüren der untersten Reihe laufen nach der Aufbereitung wieder wie am ersten Tag.",
    details: [
      "10 Fächer auf 5 Ebenen",
      "Neubeschichtung aller Flächen in Wunschfarbe",
      "Alle Scharniere und Dämpfer erneuert",
      "Chromrohre und Kugeln poliert oder erneuert",
      "Auf Wunsch mit Inneneinteilung",
    ],
  },
  {
    slug: "haller-rollcontainer",
    name: "Haller Rollcontainer",
    signature: "Gold",
    ort: "Atelier",
    image: "/media/tile-gold.jpg",
    category: "container",
    categoryLabel: "Container",
    grid: [
      ["drawer"],
      ["drawer"],
      ["drawers"],
    ],
    cellW: 150,
    cellH: 74,
    dimensions: "B 523 × H 692 × T 523 mm",
    price: 990,
    defaultColor: "goldgelb",
    wall: "mid",
    teaser:
      "Der treueste Mitarbeiter im Homeoffice — auf Rollen, mit drei Auszügen.",
    description:
      "Der klassische Rollcontainer passt unter jeden Schreibtisch und macht auch freistehend eine gute Figur. Zwei flache Auszüge für Stifte und Papier, ein doppelt hoher für Hängeregister. Läuft nach der Aufbereitung auf neuen Doppelrollen.",
    details: [
      "3 Auszüge auf Vollauszugsschienen",
      "Neue lastabhängig gebremste Doppelrollen",
      "Neubeschichtung aller Flächen in Wunschfarbe",
      "Auszugssperre gegen Kippen",
      "Auf Wunsch mit Hängeregisterrahmen",
    ],
  },
  {
    slug: "haller-regal-atelier",
    name: "Haller Regal Atelier",
    signature: "Kreide",
    ort: "Altbau",
    image: "/media/tile-kreide.jpg",
    category: "regale",
    categoryLabel: "Regal",
    grid: [
      ["open", "open"],
      ["open", "open"],
      ["open", "open"],
    ],
    cellW: 150,
    cellH: 82,
    dimensions: "B 1523 × H 1110 × T 373 mm",
    price: 1790,
    defaultColor: "reinweiss",
    wall: "warm",
    teaser:
      "Sechs offene Fächer für Bücher, Vasen und alles, was gesehen werden will.",
    description:
      "Das offene Regal ist die leichteste Konfiguration des Systems: keine Türen, keine Klappen, nur Struktur. Es lebt vom Rhythmus der verchromten Rohre und der Tiefe seiner Fächer — und davon, was Sie hineinstellen.",
    details: [
      "6 offene Fächer",
      "Neubeschichtung aller Flächen in Wunschfarbe",
      "Chromrohre und Kugeln poliert oder erneuert",
      "Zusätzliche Tablare nachrüstbar",
      "Auch als Raumteiler mit Rückwänden erhältlich",
    ],
  },
  {
    slug: "haller-beistelltisch",
    name: "Haller Beistelltisch",
    signature: "Sand",
    ort: "Wintergarten",
    image: "/media/tile-sand.jpg",
    category: "tische",
    categoryLabel: "Beistelltisch",
    grid: [["open"]],
    cellW: 150,
    cellH: 110,
    dimensions: "B 523 × H 568 × T 418 mm",
    price: 490,
    defaultColor: "beige",
    wall: "light",
    teaser:
      "Ein einzelnes Element, unendlich einsetzbar — als Nachttisch, Telefontisch, Podest.",
    description:
      "Die kleinste Einheit des Systems: ein einzelnes offenes Element auf Nivellierfüßen. Neben dem Sofa, am Bett oder im Flur — der Beistelltisch ist der einfachste Weg, mit USM Haller anzufangen. Und in der Wunschfarbe der präziseste.",
    details: [
      "1 offenes Fach",
      "Neubeschichtung aller Flächen in Wunschfarbe",
      "Chromrohre und Kugeln poliert oder erneuert",
      "Neue Nivellierfüße",
      "Auf Wunsch mit Rollen statt Füßen",
    ],
  },
  {
    slug: "haller-sideboard-xl",
    name: "Haller Sideboard XL",
    signature: "Graphit",
    ort: "Loft",
    image: "/media/tile-graphit.jpg",
    category: "sideboards",
    categoryLabel: "Sideboard",
    grid: [
      ["flap", "open", "open", "flap"],
      ["door", "door", "door", "door"],
    ],
    cellW: 140,
    cellH: 72,
    dimensions: "B 3023 × H 740 × T 373 mm",
    price: 3290,
    defaultColor: "graphitschwarz",
    wall: "mid",
    teaser:
      "Vier Elemente Wandlänge: das Statement-Sideboard für große Räume.",
    description:
      "Acht Fächer über drei Meter — für Esszimmer, Empfänge und Konferenzräume, die eine ruhige, präzise Linie brauchen. Die Kombination aus offenen Fächern, Klappen und Türen konfigurieren wir gemeinsam mit Ihnen; jede Anordnung ist möglich.",
    details: [
      "8 Fächer, Konfiguration nach Wunsch",
      "Neubeschichtung aller Flächen in Wunschfarbe",
      "Chromrohre und Kugeln poliert oder erneuert",
      "Lieferung und Aufbau durch unser Team",
      "Auf Wunsch mit Kabelmanagement",
    ],
  },
  {
    slug: "haller-highboard-vitrine",
    name: "Haller Highboard S",
    signature: "Stahl",
    ort: "Maschinenhalle",
    image: "/media/tile-stahl.jpg",
    category: "highboards",
    categoryLabel: "Highboard",
    grid: [
      ["open"],
      ["flap"],
      ["door"],
    ],
    cellW: 150,
    cellH: 96,
    dimensions: "B 773 × H 1110 × T 373 mm",
    price: 1590,
    defaultColor: "stahlblau",
    wall: "warm",
    teaser:
      "Die schmale Säule: drei Ebenen Stauraum auf kleinstem Grundriss.",
    description:
      "Ein Element breit, drei Ebenen hoch: Das schmale Highboard findet in Nischen, Fluren und kleinen Wohnungen Platz, wo größere Konfigurationen scheitern. Oben offen, in der Mitte eine Klappe, unten eine Tür.",
    details: [
      "3 Fächer auf 3 Ebenen",
      "Neubeschichtung aller Flächen in Wunschfarbe",
      "Alle Scharniere und Dämpfer erneuert",
      "Neue Nivellierfüße",
      "Ideal für Nischen ab 80 cm Breite",
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(price: number): string {
  return `${price.toLocaleString("de-DE")} €`;
}
