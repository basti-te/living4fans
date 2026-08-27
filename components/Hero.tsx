export default function Hero() {
  return (
    <section className="hero" aria-label="USM Haller Signatur Enzian in der Orangerie">
      <div className="hero-media">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/media/hero-enzian.jpg"
          aria-hidden="true"
        >
          <source src="/media/hero-enzian.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-overlay">
        <div className="hero-title-block">
          <span className="eyebrow">Living4Fans — Signatur Enzian</span>
          <h1 className="display-hero hero-title">
            USM
            <br />
            Haller
          </h1>
          <p className="hero-claim">
            Aufbereitete Originale, neu pulverbeschichtet in Ihrer
            RAL&#8209;Wunschfarbe.
          </p>
        </div>
      </div>
    </section>
  );
}
