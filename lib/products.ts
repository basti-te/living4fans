export type Cell = "door" | "flap" | "open" | "drawers" | "drawer" | "panel";

export type Product = {
  slug: string;
  name: string;
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
    name: "Haller Lowboard TV",
    category: "lowboards",
    categoryLabel: "Lowboard",
    grid: [["flap", "open", "flap", "flap"]],
    cellW: 150,
    cellH: 78,
    dimensions: "B 3023 × H 395 × T 373 mm",
    price: 2190,
    defaultColor: "graphitschwarz",
    wall: "mid",
    teaser:
      "Vier Elemente flach über dem Boden — die souveränste Bühne für jedes Wohnzimmer.",
    description:
      "Das langgestreckte Lowboard trägt Fernseher, Verstärker und Plattenspieler, ohne sich in den Vordergrund zu spielen. Ein offenes Fach für Geräte mit Fernbedienung, drei Klapptüren für alles andere. Wie jedes unserer Möbel wird es komplett demontiert, aufbereitet und in Ihrer Wunschfarbe neu pulverbeschichtet.",
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
    category: "highboards",
    categoryLabel: "Highboard",
    grid: [
      ["open", "open"],
      ["flap", "flap"],
      ["door", "door"],
    ],
    cellW: 150,
    cellH: 96,
    dimensions: "B 1523 × H 1110 × T 373 mm",
    price: 2890,
    defaultColor: "rubinrot",
    wall: "light",
    teaser:
      "Stauraum in der Vertikalen: sechs Fächer auf drei Ebenen, halb offen, halb geschlossen.",
    description:
      "Das Highboard kombiniert offene Präsentationsfächer mit geschlossenen Ebenen — als Geschirrschrank, Barmöbel oder Aktenschrank gleichermaßen zuhause. Die Auszugstüren der untersten Reihe laufen nach der Aufbereitung wieder wie am ersten Tag.",
    details: [
      "6 Fächer auf 3 Ebenen",
      "Neubeschichtung aller Flächen in Wunschfarbe",
      "Alle Scharniere und Dämpfer erneuert",
      "Chromrohre und Kugeln poliert oder erneuert",
      "Auf Wunsch mit Inneneinteilung",
    ],
  },
  {
    slug: "haller-rollcontainer",
    name: "Haller Rollcontainer",
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
    category: "regale",
    categoryLabel: "Regal",
    grid: [
      ["open", "open"],
      ["open", "open"],
      ["open", "open"],
      ["open", "open"],
    ],
    cellW: 150,
    cellH: 82,
    dimensions: "B 1523 × H 1479 × T 373 mm",
    price: 1990,
    defaultColor: "reinweiss",
    wall: "warm",
    teaser:
      "Acht offene Fächer für Bücher, Vasen und alles, was gesehen werden will.",
    description:
      "Das offene Regal ist die leichteste Konfiguration des Systems: keine Türen, keine Klappen, nur Struktur. Es lebt vom Rhythmus der verchromten Rohre und der Tiefe seiner Fächer — und davon, was Sie hineinstellen.",
    details: [
      "8 offene Fächer",
      "Neubeschichtung aller Flächen in Wunschfarbe",
      "Chromrohre und Kugeln poliert oder erneuert",
      "Zusätzliche Tablare nachrüstbar",
      "Auch als Raumteiler mit Rückwänden erhältlich",
    ],
  },
  {
    slug: "haller-beistelltisch",
    name: "Haller Beistelltisch",
    category: "tische",
    categoryLabel: "Beistelltisch",
    grid: [["open"]],
    cellW: 150,
    cellH: 110,
    dimensions: "B 523 × H 568 × T 418 mm",
    price: 490,
    defaultColor: "usmgruen",
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
    category: "sideboards",
    categoryLabel: "Sideboard",
    grid: [
      ["flap", "open", "open", "open", "flap"],
      ["flap", "door", "door", "door", "flap"],
    ],
    cellW: 130,
    cellH: 72,
    dimensions: "B 3773 × H 740 × T 373 mm",
    price: 3790,
    defaultColor: "stahlblau",
    wall: "mid",
    teaser:
      "Fünf Elemente Wandlänge: das Statement-Sideboard für große Räume.",
    description:
      "Zehn Fächer über fast vier Meter — für Esszimmer, Empfänge und Konferenzräume, die eine ruhige, präzise Linie brauchen. Die Kombination aus offenen Fächern, Klappen und Türen konfigurieren wir gemeinsam mit Ihnen; jede Anordnung ist möglich.",
    details: [
      "10 Fächer, Konfiguration nach Wunsch",
      "Neubeschichtung aller Flächen in Wunschfarbe",
      "Chromrohre und Kugeln poliert oder erneuert",
      "Lieferung und Aufbau durch unser Team",
      "Auf Wunsch mit Kabelmanagement",
    ],
  },
  {
    slug: "haller-highboard-vitrine",
    name: "Haller Highboard S",
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
    defaultColor: "beige",
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
