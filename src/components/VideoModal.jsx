import ReactDOM from "react-dom";
import "../css/componenets/VideoModal.css";
import { getShortenedString } from "../helpers/utils.js";
import { IoCloseCircleSharp } from "react-icons/io5";

export default function Modal({ handleCloseVideoModal, file }) {
  const {
    previewUrl,
    primaryGenreName,
    releaseDate,
    trackTimeMillis,
    longDescription,
    description,
    trackName,
    collectionCensoredName,
  } = file;
  console.log(file);

  const modalRoot = document.getElementById("modal-root");
  const jsx = (
    <div className="modal-backdrop" onClick={(e) => handleCloseVideoModal(e)}>
      <div className="modal">
        <video src={previewUrl} autoPlay controls></video>
        <div className="movie-info">
          <h3>
            {trackName || collectionCensoredName}{" "}
            <span>({new Date(releaseDate).getFullYear()})</span>
          </h3>
          {primaryGenreName && (
            <p>
              <span className="title">Genre:</span>
              <span className="value">{primaryGenreName}</span>
            </p>
          )}

          {trackTimeMillis && (
            <p>
              <span className="title">Dauer:</span>
              <span className="value">
                {Math.floor(trackTimeMillis / 1000 / 60) || 0} Min.
              </span>
            </p>
          )}

          <p className="description">
            {getShortenedString(longDescription, 400) ||
              getShortenedString(description, 400)}
          </p>

          <div className="bottom-container">
            <a
              href={file.trackViewUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              auf Apple TV ansehen
            </a>

            <button
              className="close-modal-btn"
              data-close-modal-btn
              onClick={(e) => handleCloseVideoModal(e)}
            >
              <IoCloseCircleSharp role="button" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(jsx, modalRoot);
}
