import "../css/componenets/MusicTracksContainer.css";
import MusicTrack from "./MusicTrack.jsx";
import { Oval } from "react-loader-spinner";
import SearchResults from "./SearchResults.jsx";

export default function MusicTracksContainer({
  isPending,
  audioFiles,
  handleIsActiveFile,
  activeFileId,
  isUsingDefaultTracks,
}) {
  return (
    <div
      className={`music-tracks-container-wrapper ${isPending ? "loading" : ""}`}
    >
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

      {!isUsingDefaultTracks && !isPending && audioFiles.length > 0 && (
        <SearchResults count={audioFiles.length} />
      )}

      {!isPending && audioFiles.length === 0 && (
        <div className="no-files-found">Keine Tracks gefunden</div>
      )}

      {!isPending && audioFiles.length > 0 && (
        <div className="music-tracks-container">
          {audioFiles.map((audioFile) => (
            <MusicTrack
              key={audioFile.trackId}
              {...audioFile}
              handleIsActiveFile={handleIsActiveFile}
              activeFileId={activeFileId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
