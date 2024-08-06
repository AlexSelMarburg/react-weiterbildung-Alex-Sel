import "../css/componenets/TrackDataDisplay.css";
import LinkButton from "./LinkButton.jsx";

export default function TrackDataDisplay({
  isPending = true,
  trackPrice = "k.d.",
  currency,
  primaryGenreName,
  releaseDate = "k.d.",
  trackViewUrl,
}) {
  const classes = "track-data-display " + (isPending ? "pending" : "");

  return (
    <div className={classes}>
      {!isPending && trackViewUrl && (
        <>
          <div className="date">
            <p className="title">Erscheinungsdatum</p>
            <p className="value">
              {new Date(releaseDate).toLocaleDateString("de-DE")}
            </p>
          </div>
          <p className="price">
            <span className="title">Preis: </span>
            <span className="value">
              {trackPrice} {currency}
            </span>
          </p>
          <p className="genre">
            <span className="title">Genre: </span>
            <span className="value">{primaryGenreName}</span>
          </p>

          <LinkButton href={trackViewUrl} text="Zur Kollektion" />
        </>
      )}
    </div>
  );
}
