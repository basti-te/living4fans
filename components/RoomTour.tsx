export default function RoomTour() {
  return (
    <section
      className="roomtour"
      aria-label="Rundgang durch ein Haus: vier Räume mit aufbereiteten USM Haller Möbelstücken"
    >
      <div className="roomtour-stage">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/media/roomtour-poster.jpg"
          aria-hidden="true"
        >
          <source src="/media/roomtour.mp4" type="video/mp4" />
        </video>
        <img
          className="roomtour-still"
          src="/media/roomtour-poster.jpg"
          alt=""
          aria-hidden="true"
        />
      </div>
      <div className="seq-caption">
        <span className="label tabular">Rundgang</span>
        <p>
          Sieben Räume, eine Handschrift — vom Küchenblock über Barwagen bis
          zum Lowboard verwandelt sich ein Design in das nächste. Jedes
          Möbelstück ein aufbereitetes Original.
        </p>
      </div>
    </section>
  );
}
