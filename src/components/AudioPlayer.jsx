import { useEffect, useRef, useState } from "react";
import "../css/componenets/AudioPlayer.css";
import { FaVolumeOff, FaPause, FaPlay } from "react-icons/fa";

export default function AudioPlayer({
  artworkUrl100,
  previewUrl,
  isPending = true,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());
  const volumeRef = useRef(0.5);

  useEffect(() => {
    if (previewUrl) {
      setIsPlaying(false);
      audioRef.current.src = previewUrl;
    }

    return () => {
      audioRef.current.pause();
    };
  }, [previewUrl]);

  const handleVolumeChange = (volume) => {
    volumeRef.current = volume;
    audioRef.current.volume = Number(volume);
  };

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const largerArtworkUrl = artworkUrl100?.replace("100x100bb", "600x600bb");

  return (
    <div className={`audio-player ${isPending ? "loading" : ""}`}>
      <div className="wrapper-container">
        {!isPending && previewUrl && (
          <img src={largerArtworkUrl || ""} alt="Album Art" />
        )}
        {!isPending && previewUrl && (
          <div className="actions">
            <button onClick={togglePlay}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
          </div>
        )}
        <div className="volume-setting">
          {!isPending && previewUrl && (
            <>
              <FaVolumeOff className="volume-icon" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                defaultValue={volumeRef.current}
                className="volume-slider"
                onChange={(e) => handleVolumeChange(e.target.value)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
