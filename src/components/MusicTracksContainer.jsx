import "../css/componenets/MusicTracksContainer.css";
import MusicTrack from "./MusicTrack.jsx";
import { Oval } from "react-loader-spinner";

export default function MusicTracksContainer({
  isPending,
  audioFiles,
  handleIsActiveFile,
  activeFileId,
}) {
  return (
    // <div className="music-tracks-container-wrapper">
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

      {!isPending && (
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
