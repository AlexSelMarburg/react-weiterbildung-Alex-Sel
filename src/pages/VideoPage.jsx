import { Helmet } from "react-helmet-async";
import "../css/componenets/VideoPage.css";
import SearchForm from "../components/SearchForm.jsx";
import {
  getInitialSearchTerm,
  getInitialType,
  useSearchParams,
} from "../hooks/useSearchParams.js";
import { useState } from "react";
import { useDebouncedValue } from "../hooks/useDebouncedValue.js";
import { useQuery } from "@tanstack/react-query";
import { fetchITunesDataByMedia } from "../helpers/fetchITunesData.js";
import VideoMediaCard from "../components/VideoMediaCard.jsx";
import Modal from "../components/VideoModal.jsx";
import ErrorDisplay from "../components/ErrorDisplay.jsx";
import { Oval } from "react-loader-spinner";

// Define media types with their display names
const typesOfVideMedia = {
  movie: "Filme",
  tvShow: "Serien",
  musicVideo: "Musikvideos",
  audiobook: "Hörbücher",
};

export default function Movies() {
  const [searchTerm, setSearchTerm] = useState(getInitialSearchTerm);
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 600);
  const [mediaType, setMediaType] = useState(getInitialType);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVideoFile, setActiveVideoFile] = useState(null);

  const handleOpenVideoModal = (file) => {
    setActiveVideoFile(file);
    setIsModalOpen(true);
  };

  const handleCloseVideoModal = (e) => {
    if (
      e.target === e.currentTarget ||
      e.target.closest("[data-close-modal-btn]")
    ) {
      setActiveVideoFile(null);
      setIsModalOpen(false);
    }
  };

  useSearchParams(debouncedSearchTerm, mediaType);

  const {
    data: videoFiles = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["term", debouncedSearchTerm, mediaType],
    queryFn: fetchVideo,
  });

  return (
    <>
      <Helmet>
        <title>Movies</title>
      </Helmet>

      <div id="videos-page" className="page">
        <div className="top-container">
          <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <select
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value)}
          >
            {Object.entries(typesOfVideMedia).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className={`bottom-container ${isPending ? "loading" : ""}`}>
          {isError && <ErrorDisplay errorMsg={error.message} />}

          {isPending && (
            <Oval
              visible={true}
              height="60"
              width="60"
              color="#000"
              strokeWidth={5}
              ariaLabel="oval-loading"
            />
          )}

          {!isPending && !isError && (
            <>
              {debouncedSearchTerm.length < 2 && (
                <div className="no-results">
                  <p>Bitte Suchbegriff eingeben</p>
                </div>
              )}

              {videoFiles.length === 0 && debouncedSearchTerm.length >= 2 && (
                <div className="no-results">
                  <p>Keine Ergebnisse gefunden...</p>
                </div>
              )}

              {videoFiles.length > 0 && (
                <div className="fetched-data-container">
                  {videoFiles.map((file) => (
                    <VideoMediaCard
                      key={file.trackId || file.collectionId}
                      file={file}
                      handleOpenVideoModal={handleOpenVideoModal}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {isModalOpen && (
        <Modal
          handleCloseVideoModal={handleCloseVideoModal}
          isOpen={isModalOpen}
          file={activeVideoFile}
        >
          <h2>Hallo Modal</h2>
        </Modal>
      )}
    </>
  );
}

async function fetchVideo({ queryKey }) {
  const [, searchTerm, type] = queryKey;

  if (searchTerm.length < 2) {
    return [];
  }

  const data = await fetchITunesDataByMedia(searchTerm, type);
  return data;
}
