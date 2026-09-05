import KiBadge from "./KiBadge";

export default function Hero() {
  return (
    <section
      className="hero"
      aria-label="Living4Fans — aufbereitete USM Haller Klassiker, Signatur Enzian"
    >
      <div className="hero-masthead">
        <span className="eyebrow">Signatur Enzian — Enzianblau RAL 5010</span>
        <h1 className="hero-title">Living4Fans</h1>
        <p className="hero-claim hero-claim-desktop">
          Aufbereitete USM Haller Originale — neu pulverbeschichtet in Ihrer
          RAL-Wunschfarbe.
        </p>
        <p className="hero-claim hero-claim-mobile">
          Aufbereitete USM Haller Originale in Ihrer Wunschfarbe.
        </p>
      </div>
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
        <KiBadge text="KI-generierte Visualisierung" position="links" />
      </div>
    </section>
  );
}
