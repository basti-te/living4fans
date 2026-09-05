/**
 * Kundenreferenzen mit Fotostrecke — für die „Das sagen Kunden"-Sektion.
 * Neue Referenz: einfach einen Eintrag ergänzen und die Bilder unter
 * public/media/referenzen/ ablegen (erstes Bild = Hauptbild).
 */
export type Referenz = {
  id: string;
  kunde: string;
  kontext: string;
  /** Kursiv gesetzter Satz — Projektbeschreibung oder (freigegebenes) Zitat. */
  text: string;
  bilder: { src: string; alt: string }[];
};

export const REFERENZEN: Referenz[] = [
  {
    id: "mulica",
    kunde: "Dr. Marcus Mulica",
    kontext: "Praxis für Plastische Chirurgie, Frankfurt am Main",
    text:
      "Ein Highboard mit Glasvitrinen in Graphitschwarz und ein Sideboard in Reinorange für die neue Praxis — von uns geliefert und vor Ort montiert, pünktlich zur Eröffnung am 1. September 2026.",
    bilder: [
      { src: "/media/referenzen/mulica-01.jpg", alt: "Dr. Marcus Mulica mit Daumen hoch vor dem fertig montierten USM Haller Highboard mit Glasvitrinen" },
      { src: "/media/referenzen/mulica-02.jpg", alt: "Fertig montierte Highboard-Wand in Graphitschwarz mit Glasvitrinen in der Praxis" },
      { src: "/media/referenzen/mulica-03.jpg", alt: "Sideboard in Reinorange mit neun Fächern, frontal" },
      { src: "/media/referenzen/mulica-04.jpg", alt: "Alesja Schonhöft montiert eine Klappe am Highboard" },
      { src: "/media/referenzen/mulica-05.jpg", alt: "Montage der Klapptüren am Highboard vor Ort" },
      { src: "/media/referenzen/mulica-06.jpg", alt: "Behandlungsraum mit USM Haller Highboard und Behandlungsstuhl" },
      { src: "/media/referenzen/mulica-07.jpg", alt: "Wandspiegel mit Spiegelung des orangen Sideboards" },
      { src: "/media/referenzen/mulica-08.jpg", alt: "Aufbau des orangen Sideboards vor Ort in der Praxis" },
    ],
  },
];
