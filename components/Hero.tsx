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
          <span className="eyebrow">
            Aufbereitet &amp; neu pulverbeschichtet
          </span>
          <h1 className="display-hero hero-title">USM Haller</h1>
        </div>
        <div className="hero-caption">
          Signatur Enzian — Enzianblau RAL 5010
          <br />
          Aufgenommen in der Orangerie
        </div>
      </div>
    </section>
  );
}
