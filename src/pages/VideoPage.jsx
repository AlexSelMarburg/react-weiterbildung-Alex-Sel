import { Helmet } from "react-helmet-async";
import "../css/componenets/VideoPage.css";
import SearchForm from "../components/SearchForm.jsx";
import {
  getInitialSearchTerm,
  useSearchParams,
} from "../hooks/useSearchParams.js";
import { useState } from "react";
import { useDebouncedValue } from "../hooks/useDebouncedValue.js";
import { useQuery } from "@tanstack/react-query";
import { fetchITunesDataByMedia } from "../helpers/fetchITunesData.js";
import VideoMediaCard from "../components/VideoMediaCard.jsx";

import Modal from "../components/VideoModal.jsx";

// const typesOfVideMedia = ["movie", "tvShow", "audiobook", "musicVideo"];
const typesOfVideMedia = {
  movie: "Filme",
  tvShow: "Serien",
  audiobook: "Bücher",
  musicVideo: "Musikvideos",
};

export default function Movies() {
  const [searchTerm, setSearchTerm] = useState(getInitialSearchTerm);
  const [mediaType, setMediaType] = useState(typesOfVideMedia[0]);
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 600);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVideoFile, setActiveVideoFile] = useState(null);

  function handleOpenVideoModal(file) {
    setActiveVideoFile(file);
    setIsModalOpen(true);
  }

  function handleCloseVideoModal(e) {
    if (
      e.target === e.currentTarget ||
      e.target.closest("[data-close-modal-btn]")
    ) {
      setActiveVideoFile(null);
      setIsModalOpen(false);
    }
  }

  useSearchParams(debouncedSearchTerm);

  const {
    data: videoFiles = [],
    isPending = true,
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
        <div className="bottom-container">
          {!isPending && !isError && videoFiles.length > 0 && (
            <div className="fetched-data-container">
              <VideoMediaCard
                file={videoFiles?.[0]}
                handleOpenVideoModal={handleOpenVideoModal}
              />
            </div>
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
  const searchTerm = queryKey[1];
  const type = queryKey[2];

  if (searchTerm.length < 2) {
    return [];
  }

  const data = await fetchITunesDataByMedia(searchTerm, type);
  return data;
}
