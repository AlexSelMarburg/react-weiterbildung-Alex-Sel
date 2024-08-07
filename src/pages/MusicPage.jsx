import { Helmet } from "react-helmet-async";
import AudioPlayer from "../components/AudioPlayer.jsx";
import { fetchITunesDataByMedia } from "../helpers/fetchITunesData.js";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MusicTracksContainer from "../components/MusicTracksContainer.jsx";
import "../css/componenets/MusicPage.css";
import SearchForm from "../components/SearchForm.jsx";
import { useDebouncedValue } from "../hooks/useDebouncedValue.js";
import { defaultMusikTracks } from "../data/defaultMusikTracks.js";
import ErrorDisplay from "../components/ErrorDisplay.jsx";
import TrackDataDisplay from "../components/TrackDataDisplay.jsx";
import {
  getInitialSearchTerm,
  useSearchParams,
} from "../hooks/useSearchParams.js";

export default function MusicPage() {
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
    isPending = true,
    isError,
    error,
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
          <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className="content-container">
          {isError && <ErrorDisplay errorMsg={error.message} />}
          {!isError && audioFiles && (
            <>
              <div className="left-container">
                <MusicTracksContainer
                  isPending={isPending}
                  audioFiles={audioFiles}
                  handleIsActiveFile={handleIsActiveFile}
                  activeFileId={activeFileId}
                  isUsingDefaultTracks={audioFiles === defaultMusikTracks}
                />
              </div>
              <div className="right-container">
                <AudioPlayer {...audioFile} isPending={isPending} />
                <TrackDataDisplay isPending={isPending} {...audioFile} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

async function fetchAudio({ queryKey }) {
  const searchTerm = queryKey[1];

  if (searchTerm.length < 2) {
    return defaultMusikTracks;
  }

  const data = await fetchITunesDataByMedia(searchTerm);
  return data;
}
