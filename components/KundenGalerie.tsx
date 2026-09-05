const ALLE_BILDER = [
  { src: "/media/kunden/kunde-01.jpg", alt: "Fünf Servierwagen in Beige, Gelb, Oliv, Weiß und Orange im Living4Fans Showroom" },
  { src: "/media/kunden/kunde-02.jpg", alt: "Schwarzes USM Haller Sideboard im Wohnzimmer mit Panton-Stuhl" },
  { src: "/media/kunden/kunde-03.jpg", alt: "Nachtblaues USM Haller Highboard mit bunter USM-Wanduhr" },
  { src: "/media/kunden/kunde-04.jpg", alt: "Wandspiegel-Unikat aus USM Haller Teilen in Orange" },
  { src: "/media/kunden/kunde-05.jpg", alt: "Schwarzer Barwagen als Kaffeestation mit Espressomaschine" },
  { src: "/media/kunden/kunde-06.jpg", alt: "Schwarzes USM Haller Lowboard im Wohnzimmer" },
  { src: "/media/kunden/kunde-07.jpg", alt: "Weißes USM Haller Sideboard im Abendlicht" },
  { src: "/media/kunden/kunde-08.jpg", alt: "Schwarze USM Haller Bürokombination mit Regal" },
  { src: "/media/kunden/kunde-09.jpg", alt: "Beiger USM Haller Servierwagen" },
  { src: "/media/kunden/kunde-10.jpg", alt: "Weißes USM Haller Sideboard mit geöffnetem Auszug" },
  { src: "/media/kunden/kunde-12.jpg", alt: "Oranger USM Haller Barwagen im Esszimmer" },
];

export default function KundenGalerie({ anzahl }: { anzahl?: number }) {
  const bilder = anzahl ? ALLE_BILDER.slice(0, anzahl) : ALLE_BILDER;
  return (
    <div className="kunden-grid">
      {bilder.map((b) => (
        <figure key={b.src} className="kunden-tile">
          <img src={b.src} alt={b.alt} loading="lazy" />
        </figure>
      ))}
    </div>
  );
}
