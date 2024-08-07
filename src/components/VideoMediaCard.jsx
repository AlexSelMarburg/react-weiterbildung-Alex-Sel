import "../css/componenets/VideoMediaCard.css";
import { getShortenedString } from "../helpers/utils.js";
import Button from "./Button.jsx";

export default function VideoMediaCard({
  artworkUrl100,
  collectionCensoredName,
  //   shortDescription,
  longDescription,
  trackName,
}) {
  const largerArtworkUrl = artworkUrl100?.replace("100x100bb", "600x600bb");
  const title = trackName || collectionCensoredName;

  return (
    <div className="video-media-card">
      <img src={largerArtworkUrl} alt="" />
      <div className="info-overlay">
        <div className="info">
          <h3>{getShortenedString(title, 15)}</h3>
          <p className="description">
            {getShortenedString(longDescription, 200)}
          </p>
        </div>
        <div className="actions">
          <Button text="more info" />
        </div>
      </div>
    </div>
  );
}
