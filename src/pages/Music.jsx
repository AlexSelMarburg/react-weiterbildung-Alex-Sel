import { Helmet } from "react-helmet-async";
import AudioPlayer from "../components/AudioPlayer.jsx";
import { fetchITunesDataByMedia } from "../fetchITunesData.js";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MusicTracksContainer from "../components/MusicTracksContainer.jsx";
import "../css/componenets/MusicPage.css";
import FilterForm from "../components/FilterForm.jsx";

export default function Music() {
  const [activeFileId, setActiveFileId] = useState(null);

  function handleIsActiveFile(id) {
    if (activeFileId === id) return;
    setActiveFileId(id);
  }

  const {
    data: audioFiles = [],
    isError,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: ["term", "dubstep"],
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
          <FilterForm />
        </div>
        <div className="content-container">
          <div className="left-container">
            <MusicTracksContainer
              audioFiles={audioFiles}
              handleIsActiveFile={handleIsActiveFile}
              activeFileId={activeFileId}
            />
          </div>
          <div className="right-container">
            <AudioPlayer {...audioFile} />
          </div>
        </div>
      </div>
    </>
  );
}

async function fetchAudio({ queryKey }) {
  const searchTerm = queryKey[1];

  // if (searchTerm.length < 2) {
  //   return defaultMovies;
  // }
  // console.log(searchTerm);

  const data = await fetchITunesDataByMedia(searchTerm);
  // console.log(data);
  return data;
}
