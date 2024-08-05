import { Helmet } from "react-helmet-async";
import AudioPlayer from "../components/AudioPlayer.jsx";
import { fetchITunesDataByMedia } from "../helpers/fetchITunesData.js";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MusicTracksContainer from "../components/MusicTracksContainer.jsx";
import "../css/componenets/MusicPage.css";
import FilterForm from "../components/FilterForm.jsx";
import { useDebouncedValue } from "../hooks/useDebouncedValue.js";
import { defaultMusikTracks } from "../data/defaultMusikTracks.js";

export default function Music() {
  const [activeFileId, setActiveFileId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(getInitialSearchTerm);
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 600);

  function handleIsActiveFile(id) {
    if (activeFileId === id) return;
    setActiveFileId(id);
  }

  useSearchParams(debouncedSearchTerm);

  const {
    data: audioFiles = [],
    isError,
    isPending = true,
    isSuccess,
  } = useQuery({
    queryKey: ["term", debouncedSearchTerm],
    queryFn: fetchAudio,
  });

  const audioFile = audioFiles.find((file) => file.trackId === activeFileId);

  useEffect(() => {
    if (audioFiles.length > 0) {
      setActiveFileId(audioFiles[0].trackId);
    }
  }, [audioFiles]);

  return (
    <>
      <Helmet>
        <title>Music</title>
      </Helmet>

      <div id="music-page" className="page">
        <div className="top-container">
          <FilterForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className="content-container">
          {!isError && audioFiles && (
            <>
              <div className="left-container">
                {!isError && (
                  <MusicTracksContainer
                    isPending={isPending}
                    audioFiles={audioFiles}
                    handleIsActiveFile={handleIsActiveFile}
                    activeFileId={activeFileId}
                  />
                )}
              </div>
              <div className="right-container">
                {!isError && (
                  <AudioPlayer {...audioFile} isPending={isPending} />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function getInitialSearchTerm() {
  const url = new URL(window.location.href);
  return url.searchParams.get("search") ?? "";
}

function useSearchParams(debouncedSearchTerm) {
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete("search");

    if (debouncedSearchTerm.length >= 2) {
      url.searchParams.set("search", debouncedSearchTerm);
    }

    window.history.replaceState({}, "", url);
  }, [debouncedSearchTerm]);
}

async function fetchAudio({ queryKey }) {
  const searchTerm = queryKey[1];

  if (searchTerm.length < 2) {
    return defaultMusikTracks;
  }

  const data = await fetchITunesDataByMedia(searchTerm);
  return data;
}
