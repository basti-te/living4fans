export default function Hero() {
  return (
    <section className="hero" aria-label="USM Haller Signatur Enzian in der Orangerie">
      <div className="hero-media">
        <video
          className="hero-video"
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
        <img
          className="hero-still"
          src="/media/hero-enzian.jpg"
          alt=""
          aria-hidden="true"
        />
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
            Aufbereitete Originale — neu beschichtet in Ihrer RAL-Wunschfarbe.
          </p>
        </div>
      </div>
    </section>
  );
}
