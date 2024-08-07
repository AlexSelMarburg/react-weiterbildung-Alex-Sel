import "../css/componenets/VideoMediaCard.css";
import { getShortenedString } from "../helpers/utils.js";
import Button from "./Button.jsx";

export default function VideoMediaCard({ handleOpenVideoModal, file }) {
  const {
    artworkUrl100,
    collectionCensoredName,
    longDescription,
    trackName,
    description = "",
  } = file;

  const largerArtworkUrl = artworkUrl100?.replace("100x100bb", "600x600bb");
  const title = trackName || collectionCensoredName;
  const descriptionText = getShortenedString(
    longDescription || description,
    90
  );

  return (
    <div className="video-media-card">
      <img src={largerArtworkUrl} alt="" />
      <div className="info-overlay">
        <div className="info">
          <h3>{getShortenedString(title, 24)}</h3>
          <p
            className="description"
            dangerouslySetInnerHTML={{ __html: descriptionText }}
          ></p>
        </div>
        <div className="actions">
          <Button text="trailer" onClick={() => handleOpenVideoModal(file)} />
        </div>
      </div>
    </div>
  );
}
