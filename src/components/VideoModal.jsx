import ReactDOM from "react-dom";
import "../css/componenets/VideoModal.css";
import { getShortenedString } from "../helpers/utils.js";

export default function Modal({ handleCloseVideoModal, file }) {
  const {
    previewUrl,
    primaryGenreName,
    releaseDate,
    trackTimeMillis,
    longDescription,
  } = file;
  console.log(file);

  const modalRoot = document.getElementById("modal-root");
  const jsx = (
    <div className="modal-backdrop" onClick={(e) => handleCloseVideoModal(e)}>
      <div className="modal">
        {/* {children} */}

        <video src={previewUrl} autoPlay controls></video>
        <div className="movie-info">
          <h3>
            {file.trackName}{" "}
            <span>({new Date(releaseDate).getFullYear()})</span>
          </h3>
          <p>
            <span className="title">Genre:</span>
            <span className="value">{primaryGenreName}</span>
          </p>

          <p>
            <span className="title">Dauer:</span>
            <span className="value">
              {Math.floor(trackTimeMillis / 1000 / 60) || 0} Min.
            </span>
          </p>

          <p className="description">
            {getShortenedString(longDescription, 400)}
          </p>

          <div className="apple-tv-link">
            <a
              href={file.trackViewUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              auf Apple TV ansehen
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(jsx, modalRoot);
}
