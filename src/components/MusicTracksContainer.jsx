import "../css/componenets/MusicTracksContainer.css";
import MusicTrack from "./MusicTrack.jsx";

export default function MusicTracksContainer({
  audioFiles,
  handleIsActiveFile,
  activeFileId,
}) {
  return (
    <div className="music-tracks-container-wrapper">
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
    </div>
  );
}
