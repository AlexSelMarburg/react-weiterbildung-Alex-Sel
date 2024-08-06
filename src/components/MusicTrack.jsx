import "../css/componenets/MusicTrack.css";
import { getShortenedString } from "../helpers/utils.js";

export default function MusicTrack({
  artistName,
  artworkUrl100,
  trackCensoredName,
  handleIsActiveFile,
  trackId,
  activeFileId,
}) {
  const imgUrl = artworkUrl100?.replace("100x100bb", "200x200bb");
  let classes = "music-track";
  if (trackId === activeFileId) {
    classes += " active";
  }

  return (
    <div className={classes} onClick={() => handleIsActiveFile(trackId)}>
      <div className="img-container">
        <img src={imgUrl} alt="Album Art" />
      </div>
      <div className="info-container">
        <h3 className="artist">{getShortenedString(artistName, 20)}</h3>
        <p className="track-name">
          {getShortenedString(trackCensoredName, 40)}
        </p>
      </div>
    </div>
  );
}
